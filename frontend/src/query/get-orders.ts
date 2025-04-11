import api from "@/util/api";
import { useQuery } from "@tanstack/react-query";
import type { DataResponse, Order } from "./type";

type GetOrderResponse = { orders: Order[] };

const queryFn = async (isCompleted: boolean) => {
	const { data } = await api.get<DataResponse<GetOrderResponse>>(
		isCompleted ? "/orders/completed" : "/orders",
	);
	return data.data;
};

export const useGetOrders = (isCompleted = false) => {
	return useQuery({
		queryFn: () => queryFn(isCompleted),
		queryKey: isCompleted ? ["orders", "completed"] : ["orders", "all"],
		select: (data) => data.orders,
	});
};
