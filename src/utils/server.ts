import express, { Application } from 'express';
import cors from 'cors';
import bp from 'body-parser';
import rot13Routes from '../routes/rot13.route';
import kucoinRoutes from '../routes/kucoin.route';
import etheriumRoutes from '../routes/ethereum.route';
import plannerRoutes from '../routes/planner.route';

function createServer() {
	const app: Application = express();

	app.use(cors());

	// These methods will parse the incoming requests and extract the body.
	app.use(bp.json());
	app.use(bp.urlencoded({ extended: true }));

	/** Routes */
	app.use('/rot13', rot13Routes);

	app.use('/kucoin', kucoinRoutes);

	app.use('/ethereum', etheriumRoutes);

	app.use('/planner', plannerRoutes);

	return app;
}

export default createServer;
