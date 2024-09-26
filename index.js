const sqlite3 = require('sqlite3');
const express = require('express');

const db = new sqlite3.Database('database.sqlite');

const app = express();

app.use(express.json());

app.get("/posts", (req, res) => {
    db.all('SELECT * FROM posts', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post("/posts", (req, res) => {
    let body = req.body;
    const {title, content} = body;
    db.exec(`INSERT INTO posts (title, content) VALUES ("${title}", "${content}")`);
    res.sendStatus(201);
});

app.listen(8080);
