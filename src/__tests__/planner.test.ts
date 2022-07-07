import supertest from 'supertest';
import createServer from '../utils/server';
import { writeFile } from 'fs';
import { PlannerDto } from '../dto/planner.dto';
import moment from 'moment';
import jsonHelper from '../helpers/jsonHelper';

const app = createServer();

describe('planner', () => {
	const dto: PlannerDto = {
		worker_number: 586,
		shift: '0-8',
	};

	const today = moment().startOf('day').toString();

	const allocationsPath = `${process.cwd()}/src/json/allocations.json`;

	const jsonFileContent = jsonHelper.readJsonFile(allocationsPath);

	console.log('jsonFileContent', jsonFileContent);

	const index = jsonFileContent.findIndex(
		(item) => item.today === today && parseInt(item.worker_number, 10) === dto.worker_number,
	);

	if (index > -1) {
		jsonFileContent.splice(index, 1);
		const jsonContentToSave = JSON.stringify(jsonFileContent);

		console.log('jsonContentToSave', jsonContentToSave);

		writeFile(allocationsPath, jsonContentToSave, 'utf-8', (err) => {
			if (err) {
				throw new Error(`An error occurred while writing JSON Object to File.`);
			}
		});
	}

	describe(`Get All Worker Shift Allocations`, () => {
		it('should return a status of 200 if all shift allocations are returned', async () => {
			await supertest(app).get(`/planner`).expect(200);
		});
	});

	describe('Add A Worker To Shift Planner', () => {
		it('should throw 422 if body is empty', async () => {
			await supertest(app)
				.post(`/planner`)
				.send({})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(422);
		});

		it('should throw 422 if shift empty', async () => {
			await supertest(app)
				.post(`/planner`)
				.send({ worker_number: 123 })
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(422);
		});

		it('should throw 422 if worker_number empty', async () => {
			await supertest(app)
				.post(`/planner`)
				.send({ shift: '0-8' })
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(422);
		});

		it('should return a status of 200 if worker has been allocated a shift today', async () => {
			await supertest(app)
				.post(`/planner`)
				.send(dto)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});
});
