import { Request, Response } from 'express';

/**
 *
 * @param req
 * @param res
 * @returns
 */
const rot13 = (req: Request, res: Response) => {
	try {
		const { message } = req.query;

		const str = (message as string).split('"')[1];

		const response = solution(str.toUpperCase());

		return res.status(200).json({
			response,
		});
	} catch (error) {
		return res.status(400).json({
			error: { message: error.message },
		});
	}
};

/**
 *
 * @param str
 */
const solution = (str: string): string => {
	try {
		const asciiNumberOfA = 65 as number;
		const asciiNumberOfN = 77 as number; // mid point
		const asciiNumberOfZ = 90 as number;

		let answer = '' as string;

		for (let i = 0; i < str.length; i++) {
			const asciiNumber = str.charCodeAt(i);

			if (asciiNumber >= asciiNumberOfA && asciiNumber <= asciiNumberOfN) {
				answer += String.fromCharCode(asciiNumber + 13);
			} else if (asciiNumber >= asciiNumberOfN + 1 && asciiNumber <= asciiNumberOfZ) {
				answer += String.fromCharCode(asciiNumber - 13);
			} else {
				answer += str[i];
			}
		}

		return answer;
	} catch (error) {
		throw new Error(error.message);
	}
};

// a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z

// export file as an object using the default keyword
export default { rot13 };
