import express, { Application } from 'express';
import cors from 'cors';
import bp from 'body-parser';
import plannerRoutes from '../routes/planner.route';

function createServer() {
	const app: Application = express();

	app.use(cors());

	// These methods will parse the incoming requests and extract the body.
	app.use(bp.json());
	app.use(bp.urlencoded({ extended: true }));

	/** Routes */

	app.use('/planner', plannerRoutes);

	return app;
}

export default createServer;
