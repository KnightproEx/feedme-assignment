import { Queue, Worker } from "bullmq";
import {
	BOT_COOK_JOB_NAME,
	BOT_INTERVAL_IN_SEC,
	BOT_QUEUE_NAME,
} from "../config/bot";
import { sleep } from "../util/async";
import { redisConnection } from "../util/queue";
import {
	OrderStatus,
	getOrderByBotId,
	getOrders,
	updateOrderById,
} from "./order";

const botQueue = new Queue(BOT_QUEUE_NAME, { connection: redisConnection });

const workers: Worker[] = [];

export const addCookJob = async () => {
	await botQueue.add(BOT_COOK_JOB_NAME, undefined);
};

const cookOrder = async (botId: string) => {
	const orders = getOrders().filter((e) => !e.bot);
	if (orders.length) {
		updateOrderById(orders[0].id, OrderStatus.PREPARING, botId);
		await sleep(BOT_INTERVAL_IN_SEC * 1000);
	}
};

export const getBotCount = () => {
	return workers.length;
};

export const increaseBot = async () => {
	const botId = Math.random().toString(36).slice(2);
	const worker = new Worker(
		BOT_QUEUE_NAME,
		async (job) => {
			if (job.name === BOT_COOK_JOB_NAME) {
				await cookOrder(botId);
			}
		},
		{ connection: redisConnection, name: botId },
	);

	worker
		.on("active", (job) => {
			const order = getOrderByBotId(botId);
			if (job.name === BOT_COOK_JOB_NAME && order) {
				updateOrderById(order.id, OrderStatus.PREPARING, botId);
			}
		})
		.on("progress", (job) => {
			const order = getOrderByBotId(botId);
			if (job.name === BOT_COOK_JOB_NAME && order) {
				updateOrderById(order.id, OrderStatus.PREPARING, botId);
			}
		})
		.on("completed", (job) => {
			const order = getOrderByBotId(botId);
			if (job.name === BOT_COOK_JOB_NAME && order) {
				updateOrderById(order.id, OrderStatus.COMPLETED);
			}
		})
		.on("closed", async () => {
			const index = workers.indexOf(worker);
			if (index >= 0) workers.splice(index, 1);

			const order = getOrderByBotId(botId);
			if (!order) return;

			updateOrderById(order.id, OrderStatus.PENDING);
			await botQueue.add(BOT_COOK_JOB_NAME, undefined);
		});

	workers.push(worker);
};

export const decreaseBot = async () => {
	if (workers.length === 0) return;

	const worker = workers[workers.length - 1];
	await worker.close(worker.isRunning());
};
