const http = require("http");
const { getPersons, createPerson, deletePerson } = require("./controllers/personController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/persons" && req.method === "GET") {
    getPersons(req, res);
  } else if (req.url === "/api/persons" && req.method === "POST") {
    createPerson(req, res);
  } else if (
    req.url.match(/\/api\/persons\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deletePerson(req, res, id);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error 404: Page not found!" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
