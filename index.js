const sqlite3 = require('sqlite3');
const http = require('node:http');
const url = require('node:url');
const path = require('node:path');

const db = new sqlite3.Database('database.sqlite');

http.createServer((req, res) => {
  const {pathname} = url.parse(req.url);
  if (pathname === '/posts') {
    if (req.method === 'GET'){
        
        db.all('SELECT * FROM posts', 
            (err, rows) => {
                if (err) {
                    res.writeHead(500);
                    console.error(err);
                    res.end();
                    return;
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(rows));
                }
            });
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const {title, content} = JSON.parse(body);
            db.exec(`INSERT INTO posts (title, content) VALUES ("${title}", "${content}")`);
            res.writeHead(201);
            res.end();
        });
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(8080);
