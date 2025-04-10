import api from "@/util/api";
import { useQuery } from "@tanstack/react-query";
import type { DataResponse, Order } from "./type";

type GetOrderResponse = { orders: Order[] };

const queryFn = async () => {
	const { data } = await api.get<DataResponse<GetOrderResponse>>("/orders");
	return data.data;
};

export const useGetOrders = () => {
	return useQuery({
		queryFn,
		queryKey: ["orders"],
		select: (data) => data.orders,
	});
};
