export interface ApiResponse {
	success: boolean;
}

export interface DataResponse<T> extends ApiResponse {
	data: T;
}

export interface ErrorResponse extends ApiResponse {
	message: string;
	error: unknown;
}

export enum OrderStatus {
	PENDING = 0,
	PREPARING = 1,
	COMPLETED = 2,
}

export type Order = {
	id: number;
	isVip: boolean;
	status: OrderStatus;
};
