import api from "@/util/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DataResponse, ErrorResponse } from "./type";

type DecreaseBotResponse = { bot: string };

const mutationFn = async () => {
	const { data } =
		await api.post<DataResponse<DecreaseBotResponse>>("/bots/decrease-bot");
	return data.success;
};

export const useDecreaseBot = () => {
	const queryClient = useQueryClient();
	return useMutation<boolean, ErrorResponse>({
		mutationFn,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["bots"] });
		},
		// onError: (e) => toast.error(e.message),
	});
};
