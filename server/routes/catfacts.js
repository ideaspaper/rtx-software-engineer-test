'use strict';

import { Router } from 'express';
import CatFactsController from './../controllers/catFactsController.js';

const router = Router();

router.get('/', CatFactsController.findAll);
router.get('/fromSource', CatFactsController.fetchListFromAPI);

export default router;
