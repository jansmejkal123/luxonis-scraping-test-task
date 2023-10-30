import {CronJob} from "cron";
import {CatData, Scraper} from "../types";
import {updateData} from "../utils/db";


const startScheduledScraping = (domain: string, port: number, scrapeFn: Scraper<CatData>) => {
   return new CronJob('0 */10 * * * *', async () => {
        console.log(`Scraping (${new Date().toLocaleTimeString()})`);
        const data = await scrapeFn(domain, port);
        await updateData(data)
    }, ()=> {console.log('scraping complete');

   }, true, 'Europe/Prague');
}
export default startScheduledScraping;
