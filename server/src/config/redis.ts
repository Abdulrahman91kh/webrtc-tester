import { createClient } from "redis";

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST || "localhost",
		port: parseInt(process.env.REDIS_PORT as string) || 6379,
	},
});

client.on("error", (err) => {
	console.error(err.message, {
		service: "Redis Service",
		function: "createClient(): Initiating Redis Connection",
	});

	throw new Error(err.message);
});

export default client;
