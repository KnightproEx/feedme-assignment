import { Button } from "@/components/ui/button";
import { queryClient } from "@/query/client";
import { useCreateOrder } from "@/query/create-order";
import { useDecreaseBot } from "@/query/decrease-bot";
import { useGetBots } from "@/query/get-bot-count";
import { useIncreaseBot } from "@/query/increase-bot";
import { socket } from "@/util/socket";
import { useEffect } from "react";
import CompletedCard from "./CompletedCard";
import PendingCard from "./PendingCard";

const App = () => {
	const { data } = useGetBots();
	const { mutate: createOrder } = useCreateOrder();
	const { mutate: increaseBot } = useIncreaseBot();
	const { mutate: decreaseBot } = useDecreaseBot();

	useEffect(() => {
		function onMessage() {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		}

		socket.on("message", onMessage);

		return () => {
			socket.off("message", onMessage);
		};
	}, []);

	return (
		<div className="p-4">
			<div className="flex space-x-2 pb-2">
				<PendingCard />
				<CompletedCard />
			</div>

			<p className="py-2">Number of bots: {data ?? 0}</p>

			<div className="space-x-1 py-2">
				<Button onClick={() => createOrder({ isVip: false })}>Add Order</Button>

				<Button onClick={() => createOrder({ isVip: true })}>
					Add VIP Order
				</Button>

				<Button onClick={() => increaseBot()}>Increase Bot</Button>

				<Button onClick={() => decreaseBot()}>Decrease Bot</Button>
			</div>
		</div>
	);
};

export default App;
