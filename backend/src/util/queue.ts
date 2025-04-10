import IORedis from "ioredis";

export const redisConnection = new IORedis("redis://localhost:6379", {
	maxRetriesPerRequest: null,
});
