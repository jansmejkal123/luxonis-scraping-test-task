import express, {Response} from 'express';
import dotenv from 'dotenv';
import cron from "./cron";

dotenv.config();

const port = 3000;
const app = express();

const SCRAPED_DOMAIN = process.env.SCRAPED_DOMAIN!;
const SCRAPED_PATH = process.env.SCRAPED_PATH || ``;
const SCRAPED_PORT = process.env.SCRAPED_PORT ? parseInt(process.env.SCRAPED_PORT!) : undefined;

cron.start(SCRAPED_DOMAIN, SCRAPED_PATH, SCRAPED_PORT,process.env.WAIT_FOR_SCHEDULED_SCRAPING==='false');
console.log('debug: process.env.WAIT_FOR_SCHEDULED_SCRAPING', typeof process.env.WAIT_FOR_SCHEDULED_SCRAPING)
app.get('/', (req, res: Response<string>) => {
  res.send('CRON SERVER IS UP');
});

app.post('/stop', (req, res: Response<string>) => {
    cron.stop();
  res.send('CRON STOPPED');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
