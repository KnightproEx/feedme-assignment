import { io } from "../server/socket";
import { addCookJob } from "./bot";

enum OrderStatus {
	PENDING = 0,
	COMPLETED = 1,
}

type Order = {
	id: number;
	isVip: boolean;
	status: OrderStatus;
};

const orders: Order[] = [];

export const getOrders = () => orders;

export const addOrder = async (isVip = false) => {
	const orderId = orders.length + 1;
	const order: Order = {
		id: orderId,
		isVip,
		status: OrderStatus.PENDING,
	};

	orders.push(order);
	await addCookJob(orderId, isVip);

	return order;
};

export const completeOrderById = (orderId: number) => {
	const order = orders.find((e) => e.id === orderId);
	if (!order) return;

	order.status = OrderStatus.COMPLETED;
	io.send(order);

	return order;
};
