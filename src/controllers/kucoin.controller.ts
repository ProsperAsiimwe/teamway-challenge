import { Request, Response } from 'express';
import axios from 'axios';
import crypto from 'crypto';

/**
 *
 * @param req
 * @param res
 * @returns
 */
const kucoin = async (req: Request, res: Response) => {
	try {
		const { TOKEN } = req.params;

		const api_key = '629c820741a5330001d17df1' as string;
		const api_secret = 'd42e7824-bf58-428e-9fbd-b04b98e1045a' as string;
		const api_passphrase = 'jasfgj54asd' as string;
		const url = 'https://openapi-sandbox.kucoin.com/api/v1/accounts' as string;
		const now = new Date().getTime() as number;
		const str_to_sign = (now.toString() + 'GET' + '/api/v1/accounts') as string;
		const signature = crypto.createHmac('sha256', api_secret).update(str_to_sign).digest('base64');
		const passphrase = crypto.createHmac('sha256', api_secret).update(api_passphrase).digest('base64');

		const headers = {
			'KC-API-SIGN': signature,
			'KC-API-TIMESTAMP': now.toString(),
			'KC-API-KEY': api_key,
			'KC-API-PASSPHRASE': passphrase,
			'KC-API-KEY-VERSION': 2,
			'Content-Type': 'application/json',
		};

		const response = await solution(headers, url, TOKEN.toString());

		return res.status(200).json({
			...response,
		});
	} catch (error) {
		return res.status(400).json({
			error: error.message,
		});
	}
};

/**
 *
 * @param headers
 * @param url
 * @param token
 * @returns
 */
const solution = async (headers: any, url: string, token: string): Promise<any> => {
	try {
		const array = await axios({
			method: 'get',
			url: url,
			headers: headers,
		})
			.then(function (res) {
				// handle success
				if (res.data.data.length > 0) {
					const mapped = res.data.data.map((object) => ({
						currency: object.currency,
						balance: object.balance,
						type: object.type,
					}));

					return mapped;
				}
			})
			.catch(function (err) {
				// handle error
				throw new Error(err);
			});

		const filtered = array.filter((value) => value.currency.toUpperCase() === token.toUpperCase());

		if (filtered.length > 0) {
			const balances = filtered,
				result = balances.reduce(function (r, a) {
					r[a.type] = r[a.type] || [];
					r[a.type] = { balance: a.balance };

					return r;
				}, Object.create(null));

			return result;
		} else {
			throw new Error(`There is no balance for token ${token}`);
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

export default { kucoin };
