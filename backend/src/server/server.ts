import { createServer } from "node:http";
import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { decreaseBot, getBotCount, increaseBot } from "../module/bot";
import { addOrder, getOrders } from "../module/order";

const api = express();
const server = createServer(api);

const orderGroup = express.Router();
const botGroup = express.Router();

api.use(express.json());
api.use(cors());

orderGroup
	.route("/")
	.get((_, res) => {
		const orders = getOrders();
		res.send({ success: true, data: { orders } });
	})
	.post(async (req, res) => {
		const isVip = req.body.is_vip;
		const order = await addOrder(isVip);
		res.send({ success: true, data: { order } });
	});

botGroup
	.get("/count", (_, res) => {
		const count = getBotCount();
		res.send({ success: true, data: { count } });
	})
	.post("/increase-bot", (_, res) => {
		increaseBot();
		res.send({ success: true });
	})
	.post("/decrease-bot", (_, res) => {
		decreaseBot();
		res.send({ success: true });
	});

const errorHandler: ErrorRequestHandler = (_, __, res, ___) => {
	res.send({ success: false, message: "Something went wrong" });
};

api.use("/orders", orderGroup);
api.use("/bots", botGroup);

api.use(errorHandler);

export default server;
