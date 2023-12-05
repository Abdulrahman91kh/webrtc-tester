import express from 'express';
import DotEnv from 'dotenv';
import connectSocket from './sockets';
import redis from './config/redis';
import path from 'path';

DotEnv.config();
const app = express();

app.use("/", express.static(path.join(__dirname, "./public/")));
app.use("/cameras", express.static(path.join(__dirname, "./public/")));

app.get('/ping', (req, res) => {
	res.status(200).json({
		status: "success",
		message: "pong",
	});
});

app.use((req, res) => {
	console.error("Path not found: ", req.url);
	res.status(404).json({
		status: "error",
		message: "Path Not found",
	});
});

redis.connect().catch(err => console.error('REDIS connection error', err));

const server = app.listen(process.env.PORT || "3001", () => {
	console.log(`Server is up and running on port ${process.env.PORT || "3001"}`);
	connectSocket(server);
});