const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const PORT = 8000;
const bodyParser = require('body-parser');
let db = new sqlite3.Database('scores.sqlite');

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

app.get('/scores', (req, res) => {
  db = new sqlite3.Database('scores.sqlite');
  // let data = [];
  db.all(
    'SELECT name, score FROM scores ORDER BY score DESC LIMIT 20',
    (err, rows) => {
      res.send(rows);
      db.close();
    }
  );
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});

app.post('/scores', (req, res) => {
  db = new sqlite3.Database('scores.sqlite');
  if (req.body.score === '') {
    res.status(500).send({error: 'No score to input!'});
  } else {
    let post = db.prepare('INSERT INTO scores VALUES (?, ?)');
    post.run(req.body.name, req.body.score, err => {
      res.json({success: "Updated successfully", status: 200, score: { id: this.lastID, name: req.body.name, score: req.body.score}});
      post.finalize();
      db.close();
    });
  }
});
