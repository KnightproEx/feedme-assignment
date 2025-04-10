import { Queue, Worker } from "bullmq";
import {
	BOT_COOK_JOB_NAME,
	BOT_INTERVAL_IN_SEC,
	BOT_QUEUE_NAME,
} from "../config/bot";
import { sleep } from "../util/async";
import { redisConnection } from "../util/queue";
import { completeOrderById } from "./order";

type JobData = { orderId: number };

const botQueue = new Queue<JobData>(BOT_QUEUE_NAME, {
	connection: redisConnection,
});

const workers: Worker<JobData>[] = [];

export const addCookJob = async (orderId: number, isVip: boolean) => {
	await botQueue.add(
		BOT_COOK_JOB_NAME,
		{ orderId },
		{ priority: isVip ? 0 : 1000 },
	);
};

const cookOrderById = async (orderId: number) => {
	await sleep(BOT_INTERVAL_IN_SEC * 1000);
	completeOrderById(orderId);
};

export const getBotCount = () => {
	return workers.length;
};

export const increaseBot = () => {
	const worker = new Worker<JobData>(
		BOT_QUEUE_NAME,
		async (job) => {
			if (job.name === BOT_COOK_JOB_NAME) {
				await cookOrderById(job.data.orderId);
			}
		},
		{ connection: redisConnection },
	);

	workers.push(worker);
};

export const decreaseBot = () => {
	if (workers.length === 0) return;

	workers[0].close();
	workers.splice(0, 1);
};
