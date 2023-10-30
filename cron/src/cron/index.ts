import startScheduledScraping from "./scrapeCron";
import {CronJob} from "cron";
import scrapeCats from "../scrapers/scrapeCats";
import {updateData} from "../utils/db";

let cronJob: CronJob<() => void> | null

export default {
    start: async (domain: string,path: string = '/', port?:number, immediateScraping: boolean = true): Promise<void> => {
        cronJob = startScheduledScraping(scrapeCats, domain, path, port);
        console.log(`[server]: Cron scrape job ${cronJob.running ? 'is running' : 'is not running!'}`);
       if (immediateScraping) {
           const data = await scrapeCats(domain, path, port);
           await updateData(data);
       }

    },
    stop: (): void => {
        if (!cronJob) {
            console.warn('[server]: No cron job to stop! Returning...');
            return;
        }
        cronJob.stop();
        cronJob = null;
    }
};
