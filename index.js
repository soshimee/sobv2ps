import fs from "fs/promises";
import WebSocket, { WebSocketServer } from "ws";
import HttpsProxyAgent from "https-proxy-agent";

const config = JSON.parse(await fs.readFile("config.json"));

const wss = new WebSocketServer({ port: 31823 });

wss.on("connection", ws => {
	const remote = new WebSocket("wss://ourworldofpixels.com", { agent: config.proxy ? new HttpsProxyAgent(config.proxy) : undefined });

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

	remote.onerror = () => {
		console.log("ERROR!");
	}
});