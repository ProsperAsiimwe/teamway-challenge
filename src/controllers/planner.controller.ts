import { writeFile, readFileSync } from 'fs';
import { Request, Response } from 'express';
import { default as workers } from '../json/workers.json';
import { default as shifts } from '../json/shifts.json';
import { PlannerDto } from '../dto/planner.dto';
import { trim } from 'lodash';
import moment from 'moment';

/**
 *
 * @param req
 * @param res
 * @returns
 */
const planner = (req: Request, res: Response) => {
	try {
		const data = req.body as PlannerDto;

		const workersData = workers;
		const shiftsData = shifts;

		const allocationsPath = `${process.cwd()}/src/json/allocations.json`;

		const today = moment().startOf('day').toString();

		const findWorker = workersData.find((worker) => worker.worker_number === trim(data.worker_number));
		const findShift = shiftsData.find((shift) => shift.shift_name === trim(data.shift));

		if (!findWorker) {
			throw new Error(`Worker with worker_number ${data.worker_number} doesn't exist.`);
		}

		if (!findShift) {
			throw new Error(`Please select from a 24 hour shift timetable of 0-8, 8-16, 16-24`);
		}

		const jsonFileContent = readJsonFile(allocationsPath);

		const findAllocation = jsonFileContent.find(
			(allocation) => allocation.today === today && allocation.worker_number === findWorker.worker_number,
		);

		if (findAllocation) {
			throw new Error(`Worker ${findWorker.worker_number} already has a shift allocated for today.`);
		}

		jsonFileContent.push({
			today: `${today}`,
			worker_number: `${findWorker.worker_number}`,
			shift: `${findShift.shift_name}`,
		});

		const jsonContentToSave = JSON.stringify(jsonFileContent);

		writeFile(allocationsPath, jsonContentToSave, 'utf-8', (err) => {
			if (err) {
				console.log(err);
				throw new Error(`An error occurred while writing JSON Object to File.`);
			}
		});

		return res.status(200).json({
			success: { message: `Worker added to today's shift allocations successfully.` },
		});
	} catch (error) {
		return res.status(400).json({
			error: { message: error.message },
		});
	}
};

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

export default { planner };
