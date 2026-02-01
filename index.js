const express = require("express");
const mysql = require("mysql2");

const app = express();

const connection = mysql.createConnection({
  host: "mysql",
  user: "fullcycleusername",
  password: "fullcyclepassword",
  database: "fullcycle"
});

connection.query(`
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
  )
`);

app.get("/", (req, res) => {
  const name = `Pessoa ${Math.floor(Math.random() * 1000)}`;

  connection.query(
    "INSERT INTO people(name) VALUES(?)",
    [name]
  );

  connection.query("SELECT name FROM people", (err, results) => {
    let names = results.map(r => `<li>${r.name}</li>`).join("");

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${names}
      </ul>
    `);
  });
});

app.listen(3000, () => {
  console.log("Node rodando na porta 3000");
});
