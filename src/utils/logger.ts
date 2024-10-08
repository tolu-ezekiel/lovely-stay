import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'error',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

export default logger;
