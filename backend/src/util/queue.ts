import IORedis from "ioredis";

const path = process.env.REDIS_CONNECTION ?? "redis://localhost:6379";

export const redisConnection = new IORedis(path, {
	maxRetriesPerRequest: null,
});
