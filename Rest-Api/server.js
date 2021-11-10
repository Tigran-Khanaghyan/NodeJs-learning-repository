const http = require("http");

const persons = require("./data/persons");

const server = http.createServer((req, res) => {
  if (req.url === "/api/persons" && req.method === 'GET') {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  }
  else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message: 'Error 404: Page not found!'}));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
