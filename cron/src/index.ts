import express, {Response} from 'express';
import dotenv from 'dotenv';
import cron from "./cron";

dotenv.config();

const port = 3000;
const app = express();

const SCRAPED_URL = 'http://localhost:3210';
cron.start(SCRAPED_URL, port, !process.env.WAIT_FOR_SCHEDuLED_SCRAPING);

app.get('/', (req, res: Response<string>) => {
  res.send('CRON SERVER IS UP');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
