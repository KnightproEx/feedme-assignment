import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetOrders } from "@/query/get-orders";
import { OrderStatus } from "@/query/type";

const CompletedCard = () => {
	const { data } = useGetOrders();

	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Completed Orders</CardTitle>
				<CardDescription>Order is ready</CardDescription>
			</CardHeader>
			<CardContent>
				{data
					?.filter((e) => e.status === OrderStatus.COMPLETED)
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

export default CompletedCard;
