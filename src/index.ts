import { Request, Response } from 'express';
import createServer from './utils/server';

const app = createServer();

const port = 8000 as number;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World.');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
