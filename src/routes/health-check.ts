import express, { Request, Response } from 'express';
import { db } from '../db/index';
import logger from '../utils/logger';

const router = express.Router();

/**
 * GET /health-check
 * @tag Health
 * @summary Health check.
 * @description Check if the API server is available and running properly.
 * @response 200 - OK
 * @responseContent {Health} 200.application/json
 */
router.get('/', async (_req: Request, res: Response) => {
  logger.info('Running Health check...');
  try {
    await db.one('SELECT 1');
    res.status(200).json({ status: 'ready' });
  } catch (error: any) {
    logger.error(error);
    res
      .status(500)
      .json({ status: 'not ready', error: `${error.code} - ${error.message}` });
  }
});

export = router;
