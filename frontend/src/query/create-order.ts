import api from "@/util/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DataResponse, ErrorResponse } from "./type";

type CreateOrderResponse = { order: string };

const mutationFn = async (isVip: boolean) => {
	const { data } = await api.post<DataResponse<CreateOrderResponse>>(
		"/orders",
		{ is_vip: isVip },
	);
	return data.success;
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation<boolean, ErrorResponse, { isVip: boolean }>({
		mutationFn: (data) => mutationFn(data.isVip),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
		// onError: (e) => toast.error(e.message),
	});
};
