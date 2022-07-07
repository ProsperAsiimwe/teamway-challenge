import express from 'express';
import controller from '../controllers/planner.controller';
import plannerSchema from '../schemas/planner.schema';
import JoiValidator from '../middleware/joiValidator';

const router = express.Router();

router.post('/', JoiValidator(plannerSchema.scheduleShiftSchema), controller.createPlanner);

router.get('/', controller.getPlannerRecords);

// Export the router
export = router;
