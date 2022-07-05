import express from 'express';
import controller from '../controllers/kucoin.controller';

const router = express.Router();

router.get('/:TOKEN', controller.kucoin);

// Export the router
export = router;
