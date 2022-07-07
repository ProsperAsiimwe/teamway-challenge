import { readFileSync } from 'fs';

/**
 *
 * @param file
 */
const readJsonFile = (file) => {
	try {
		const bufferData = readFileSync(file);
		const stData = bufferData.toString();
		const data = JSON.parse(stData);
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export default { readJsonFile };
