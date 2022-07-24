import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({
	port: process.env.PORT
});

wss.on("connection", ws => {
	const target = new WebSocket("wss://ourworldofpixels.com");

	ws.on("message", data => {
		target.send(data);
	});

	ws.on("close", () => {
		target.close();
	});

	target.onmessage = data => {
		ws.send(data);
	};

	target.onclose = () => {
		ws.close();
	};
});