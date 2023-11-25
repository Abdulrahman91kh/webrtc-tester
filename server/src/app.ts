import express from 'express';
import DotEnv from 'dotenv';
import connectSocket from './sockets';
import redis from './config/redis';
import path from 'path';
import fs from 'fs/promises'

DotEnv.config();
const app = express();

app.use("/", express.static(path.join(__dirname, "./public/")));

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

// app.use((req, res, error) => {
// 	console.log(error);
// }); 

redis.connect().catch(err => console.error('REDIS connection error', err));
redis.DEL('cameras');

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is up and running on port ${process.env.PORT}`);
	connectSocket(server);
});