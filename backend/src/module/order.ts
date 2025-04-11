import { io } from "../server/socket";
import { addCookJob } from "./bot";

export enum OrderStatus {
	PENDING = 0,
	PREPARING = 1,
	COMPLETED = 2,
}

type Order = {
	id: number;
	isVip: boolean;
	status: OrderStatus;
	bot?: string;
};

const orders: Order[] = [];
const completedOrders: Order[] = [];

export const getOrders = (isCompleted = false) =>
	isCompleted ? completedOrders : orders;

export const getOrderByBotId = (botId: string) =>
	orders.find((e) => e.bot === botId);

export const addOrder = async (isVip = false) => {
	const orderId = orders.length + completedOrders.length + 1;
	const order: Order = {
		id: orderId,
		isVip,
		status: OrderStatus.PENDING,
	};

	orders.push(order);
	orders.sort((a, b) => (a.isVip === b.isVip ? 0 : a.isVip ? -1 : 1));
	await addCookJob();

	return order;
};

export const updateOrderById = (
	orderId: number,
	status: OrderStatus,
	botId?: string,
) => {
	const order = orders.find((e) => e.id === orderId);
	if (!order) return;

	const index = orders.indexOf(order);

	order.status = status;
	order.bot = botId;
	io.send(order);

	if (status === OrderStatus.COMPLETED) {
		completedOrders.push(order);
		orders.splice(index, 1);
	}

	return order;
};
