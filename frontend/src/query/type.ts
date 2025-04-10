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
	COMPLETED = 1,
}

export type Order = {
	id: number;
	isVip: boolean;
	status: OrderStatus;
};
