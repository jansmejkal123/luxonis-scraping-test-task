import {CronJob} from "cron";
import {CatData, Scraper} from "../types";
import {updateData} from "../utils/db";


const startScheduledScraping = (scrapeFn: Scraper<CatData>, domain: string, path: string, port?: number) => {
   return new CronJob('0 */10 * * * *', async () => {
        console.log(`Scraping (${new Date().toLocaleTimeString()})`);
        const data = await scrapeFn(domain, path, port);
        await updateData(data)
    }, ()=> {console.log('scraping complete');

   }, true, 'Europe/Prague');
}
export default startScheduledScraping;
