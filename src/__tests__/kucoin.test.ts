import supertest from 'supertest';
import createServer from '../utils/server';

const app = createServer();

describe('kucoin', () => {
	describe('Get kucoin route', () => {
		describe('Given the balance on Kucoin for the given token can be retrieved', () => {
			it('should return a status of 200', async () => {
				await supertest(app).get(`/kucoin/btc`).expect(200);
			});
		});

		describe('Given the balance on Kucoin for the given token cannot be retrieved', () => {
			it('should return a status of 400', async () => {
				await supertest(app).get(`/kucoin/btccccc`).expect(400);
			});
		});
	});
});
