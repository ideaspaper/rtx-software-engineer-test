'use strict'

import { Router } from 'express';
import handler from './handlers/catfactsHandler.js';

const router = Router();

router.get(
  '/fromSource',
  async (req, res, next) => {
    try {
      // Call handler to response with data
    } catch (err) {
      next(err);
    }
  }
)

export default router;