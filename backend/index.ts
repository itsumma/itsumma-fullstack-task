import express, { Express } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';
import routes from './routes/index'

dotenv.config();

const app: Express = express();
const serverPort = process.env.SERVER_PORT;
const poolConfig: PoolConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
};
export const pool = new Pool(poolConfig);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api', routes)

app.listen(serverPort, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${serverPort}`);
});
