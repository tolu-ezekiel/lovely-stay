import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger';

const app: Application = express();

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  logger.info(`\u{1F389} Server is listening on port ${port} \u{1F389}`);
});

export { server, app };
