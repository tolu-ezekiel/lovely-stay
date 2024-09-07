import 'dotenv/config';
import path from 'path';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger';
import healthCheck from './routes/health-check';

const docPath =
  process.env.NODE_ENV === 'development'
    ? '../docs/openapi'
    : '../../docs/openapi';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const apiDocument = require(path.join(__dirname, docPath));

const app: Application = express();

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocument));
app.use('/health-check', healthCheck);

const port: number = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  logger.info(`\u{1F389} Server is listening on port ${port} \u{1F389}`);
});

export { server, app };
