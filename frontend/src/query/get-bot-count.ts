import api from "@/util/api";
import { useQuery } from "@tanstack/react-query";
import type { DataResponse } from "./type";

type GetBotsResponse = { count: number };

const queryFn = async () => {
	const { data } = await api.get<DataResponse<GetBotsResponse>>("/bots/count");
	return data.data;
};

export const useGetBots = () => {
	return useQuery({
		queryFn,
		queryKey: ["bots"],
		select: (data) => data.count,
	});
};
