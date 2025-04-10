export const sleep = (interval: number) =>
	new Promise((r) => setTimeout(r, interval));
