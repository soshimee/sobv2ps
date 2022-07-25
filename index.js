// import http from "http";
// import httpProxy from "http-proxy";

// const proxy = httpProxy.createProxy({
// 	target: "wss://ourworldofpixels.com",
// 	ws: true,
// 	secure: false
// });
// const proxyServer = http.createServer((req, res) => {
// 	proxy.web(req, res);
// });
// proxyServer.on("upgrade", (req, socket, head) => {
// 	proxy.ws(req, socket, head);
// });
// proxyServer.listen(31823);

import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 31823 });

wss.on("connection", ws => {
	const remote = new WebSocket("wss://ourworldofpixels.com");

	remote.onmessage = data => {
		ws.send(data.data);
		console.log(data.data);
	};

	remote.onclose = event => {
		ws.close();
		console.log(event);
	};

	ws.onmessage = data => {
		remote.send(data.data);
		console.log(data.data);
	};

	ws.onclose = event => {
		remote.close();
		console.log(event);
	};
});