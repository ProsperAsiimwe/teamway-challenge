import supertest from 'supertest';
import createServer from '../utils/server';
import { writeFile } from 'fs';
import { PlannerDto } from '../dto/planner.dto';

const app = createServer();

describe('planner', () => {
	const dto: PlannerDto = {
		worker_number: 123,
		shift: '0-8',
	};

	const allocationsPath = `${process.cwd()}/src/json/allocations.json`;

	writeFile(allocationsPath, JSON.stringify([]), 'utf-8', (err) => {
		if (err) {
			throw new Error(`An error occurred while writing JSON Object to File.`);
		}
	});

	describe('Add worker to planner route', () => {
		describe('Given the worker_number and the shift', () => {
			it('should return a status of 200 if worker has no shift allocated', async () => {
				await supertest(app)
					.post(`/planner`)
					.send(dto)
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.expect(200);
			});
		});

		// describe('Given the balance on Kucoin for the given token cannot be retrieved', () => {
		// 	it('should return a status of 400', async () => {
		// 		await supertest(app).get(`/kucoin/btccccc`).expect(400);
		// 	});
		// });
	});
});
