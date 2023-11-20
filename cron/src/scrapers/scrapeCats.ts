import puppeteer from "puppeteer";

import type {CatData, Scraper} from "../types";

const scrapeCats: Scraper<CatData> = async (domain, path, port)  => {
    const URL = `http://${domain}${path}${port ? `:${port}` : null}`;
    console.log(`Scraping ${URL}`);
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            '--enable-features=NetworkService'],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    });
    try {
        // Create a page
        const page = await browser.newPage();
        await page.setCookie({
            name: 'per_page',
            value: '100',
            domain: domain
        })
        console.log(`going to ${URL}`)
        // Go to site and wait for FE JS to load
        await page.goto(URL, {
            timeout: 40 * 1000,
            waitUntil: ['networkidle0'],
        });
        // Set cookie to get as much data as possible for one call
        await page.setCookie({
            name: 'per_page',
            value: '100',
            domain: domain
        })
        // Wait for results, this can take a long while
        await page.waitForNetworkIdle({idleTime: 1000, timeout: 40 * 1000})
        // Extract data from page
        const results: CatData[] = await page.$$eval('div.gallery > div.gallery-item', (items: HTMLDivElement[]) => {
            return items.map(item => {
                return {
                    breed: item.querySelector('h2')!.textContent!,
                    record_id: item.querySelector('p.description')!.textContent!,
                    imgURL: item.querySelector('img')!.src!,
                }
            });
        });
        return results;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default scrapeCats
