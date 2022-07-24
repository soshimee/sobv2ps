import httpProxy from "http-proxy";

httpProxy.createServer({ target: "wss://ourworldofpixels.com", ws: true, secure: false }).listen(process.env.PORT);