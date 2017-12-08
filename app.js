const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const format = require('pg-format');
const PGUSER = 'kylechen';
const PGDATABASE = 'taptap';
const PORT = 8000;
const bodyParser = require('body-parser');

const config = {
  user: PGUSER,
  connectionString: process.env.DATABASE_URL,
  database: PGDATABASE,
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

app.use(express.static('frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});


app.get('/scores', (req, res) => {
  const scoresQuery = format('SELECT * FROM scores ORDER BY score DESC LIMIT 15');
  return pool.connect().then(theclient => {
    theclient.query(scoresQuery, (errors, results) => {
      if (errors) {
        console.log(errors);
      }
      res.send(results.rows);
    });
  });
});

app.post('/scores', (req, res) => {
  const { name, score } = req.body;
  const data = [name, score];
  const postQuery = format("INSERT INTO scores VALUES (%L)", data);
  return pool.connect().then(theClient => {
    theClient.query(postQuery, (errors, results) => {
      if (errors) {
        console.log(errors);
      }
      res.send(results);
    });
  });
});
