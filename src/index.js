import http from "http";
import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello, World!");
  } else if (request.url.startsWith("/?hello=")) {
    const name = request.url.split("=")[1];

    if (name) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end(`Hello, ${name}.`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.end("Enter a name");
    }
  } else if (request.url === "/users") {
    const filePath = path.join(__dirname, "data/users.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.end();
      } else {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(data);
      }
    });
  } else {
    response.statusCode = 500;
    response.end();
  }
});

server.listen(3003, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:3003`);
});
