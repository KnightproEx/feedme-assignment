import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetOrders } from "@/query/get-orders";
import { OrderStatus } from "@/query/type";

const PendingCard = () => {
	const { data } = useGetOrders();

	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Pending Orders</CardTitle>
				<CardDescription>Order will be cooked soon</CardDescription>
			</CardHeader>
			<CardContent>
				{data
					?.filter((e) => e.status === OrderStatus.PENDING)
					?.map((e) => (
						<p key={e.id}>
							{e.id}
							{e.isVip && " VIP"}
						</p>
					))}
			</CardContent>
		</Card>
	);
};

export default PendingCard;
