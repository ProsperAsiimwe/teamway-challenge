import express from 'express';
import controller from '../controllers/ethereum.controller';

const router = express.Router();

router.get('/:ADDRESS', controller.ethereum);

// Export the router
export = router;
