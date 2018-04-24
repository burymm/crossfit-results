const http = require("http");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/results':
      switch (req.method) {
        case 'GET':
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify([{value: 100, date: '24/04/2018'}, {value: 100, date: '24/04/2018'}]));
          break;
      }
      break;
    default:
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World\n');
      break;
  }

});




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});