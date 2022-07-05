import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

/** Validate Request body against the schema
 *
 * @param req Http Request body
 * @param res Http Response
 * @param next
 * @param schema Schema to validate
 * @returns
 */
const JoiValidator = (schema: ObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);

			next();
		} catch (error) {
			console.log('error', error);
			return res.status(422).json({
				error: { message: error.message },
			});
		}
	};
};

export default JoiValidator;
