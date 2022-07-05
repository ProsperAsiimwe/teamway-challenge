import supertest from 'supertest';
import createServer from '../utils/server';

const app = createServer();

describe('ethereum', () => {
	describe('Get ethereum route', () => {
		describe('Given the ethereum balance on the ethereum blockchain for the given address can be retrieved', () => {
			it('should return a status of 200', async () => {
				await supertest(app).get(`/ethereum/0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836`).expect(200);
			});
		});
	});
});
