import httpProxy from "http-proxy";

httpProxy.createServer({ target: "wss://ourworldofpixels.com", ws: true }).listen(process.env.PORT);