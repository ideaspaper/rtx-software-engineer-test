'use strict';

import { Router } from 'express';
import errorHandlerMiddleware from './../middlewares/errorHandlerMiddleware.js';

// Import routes
import catfactsRouter from './catfacts.js';

const router = Router({
  caseSensitive: true
});

// Use imported routes in router
router.use('/catfacts', catfactsRouter);
router.use(errorHandlerMiddleware);

export default router;
