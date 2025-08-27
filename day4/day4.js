import http from "http";

const appServer = http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/api/hello") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ reply: "Hello, World!" }));
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "Not Found" }));
  }
});

const portNumber = 3000;
appServer.listen(portNumber, () => {
  console.log(`API is live at http://localhost:${portNumber}`);
});
