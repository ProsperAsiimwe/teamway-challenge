import { Request, Response } from 'express';
import { ethers } from 'ethers';

/**
 *
 * @param req
 * @param res
 * @returns
 */
const ethereum = async (req: Request, res: Response) => {
	try {
		const { ADDRESS } = req.params;

		// Used https://infura.io/ 3rd party service to create a node on the blockchain
		// because my localHost node is not on the blockchain
		const myNodeOnTheBlockchainEndpoint = 'https://mainnet.infura.io/v3/94d6e7a831764fd991d7f49ae2361123' as string;

		const response = await solution(myNodeOnTheBlockchainEndpoint, ADDRESS.toString());

		return res.status(200).json({
			...response,
		});
	} catch (error) {
		return res.status(400).json({
			error: { message: error.message },
		});
	}
};

/**
 *
 * @param node
 * @param address
 * @returns
 */
const solution = async (node: string, address: string): Promise<{ balance: string }> => {
	try {
		const provider = new ethers.providers.JsonRpcProvider(node);

		const balance = await provider.getBalance(address);

		return { balance: ethers.utils.formatEther(balance) };
	} catch (error) {
		throw new Error(error.message);
	}
};

export default { ethereum };
