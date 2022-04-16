'use strict';

import { Router } from 'express';
import CatFactsController from './../controllers/catFactsController.js';

const router = Router();

router.get('/', CatFactsController.findAll);
router.get('/fromSource', CatFactsController.fetchListFromAPI);
router.get('/:id', CatFactsController.findById);
router.put('/:id', CatFactsController.update);
router.delete('/:id', CatFactsController.destroy);

export default router;
