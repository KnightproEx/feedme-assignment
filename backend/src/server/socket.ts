import { Server } from "socket.io";
import server from "./server";

export const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

export default io;
