import express, {  Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = 3000;
const app = express();
console.log(`[server]: Cron server : ${process.env.DATABASE_URL || `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_URL}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`}`);
//adding types for clarity although this is not required since interpolation works fine
app.get('/', (req, res: Response<string>) => {
  res.send('CRON SERVER IS UP');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
