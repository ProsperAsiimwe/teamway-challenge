import express from 'express';
import controller from '../controllers/rot13.controller';

const router = express.Router();

router.get('/', controller.rot13);

// Export the router
export = router;
