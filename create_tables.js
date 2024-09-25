const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('database.sqlite');

db.exec(`CREATE TABLE posts (title TEXT, content TEXT)`, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Table created');
    }
});