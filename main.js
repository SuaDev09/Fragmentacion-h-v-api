const express = require("express");
const mysql = require("mysql");

const app = express();
const cors = require("cors");
const port = 3101;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bd_distrubidas",
});

app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a MySQL establecida");
});

app.get("/users/", (req, res) => {
  const query = "SELECT * FROM p2_usuarios";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      res.status(500).json({ error: "Error al obtener datos" });
    } else {
      res.json(results);
    }
  });
});

app.get("/users/:condition", (req, res) => {
  const condition = req.params.condition;
  const query = `SELECT * FROM p2_usuarios ${condition}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      res.status(500).json({ error: "Error al obtener datos" });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
