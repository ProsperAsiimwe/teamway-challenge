import * as joi from 'joi';
import { PlannerDto } from '../dto/planner.dto';

const scheduleShiftSchema = joi
	.object<PlannerDto>({
		worker_number: joi.number().required(),
		shift: joi.string().max(4).required(),
	})
	.required();

export default { scheduleShiftSchema };
