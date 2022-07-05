import supertest from 'supertest';
import createServer from '../utils/server';

const app = createServer();

describe('rot13', () => {
	describe('Get rot13 route', () => {
		describe('Given the text can be deciphered', () => {
			it('should return a status of 200', async () => {
				await supertest(app)
					.get(`/rot13?message="Pbatenghyngvba, lbh'er ba gur tbbq jnl gb wbva Chyfne NV !"`)
					.expect(200);
			});
		});
	});
});
