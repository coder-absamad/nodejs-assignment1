const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDirectory = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  const filePath = path.join(publicDirectory, req.url);

  if (req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><h1>Read file: <br><br><a href="http://localhost:3000/index.html">Html page</a><br><br><a href="http://localhost:3000/style.css">CSS Page</a><br><br><a href="http://localhost:3000/app.js">Javascript Page</a></h1></body></html>');
    res.end();
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found\n');
      res.end();
      return;
    }

    res.writeHead(200);
    res.write(data);
    res.end();
  });
});

server.listen(3000, () => {
  console.log('File server started on port 3000');
});
