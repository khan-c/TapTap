const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('scores.sqlite');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS scores");
  db.run("CREATE TABLE IF NOT EXISTS scores (name TEXT, score TEXT)");
  db.run("INSERT INTO scores VALUES ('test', 10)");

  db.close();
});
