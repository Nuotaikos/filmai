const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "filmai",
});

// CATEGORIES create
app.post("/admin/cats", (req, res) => {
  const sql = `
  INSERT INTO cats
  (title)
  VALUES (?)
  `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, new Cat was created', type: 'success' } });
  });
});

//READ CATEGORIES
app.get("/admin/cats", (req, res) => {
  const sql = `
SELECT * 
FROM cats
ORDER BY title 
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//delete CATEGORIES
app.delete("/admin/cats/:id", (req, res) => {
  const sql = `
  DELETE FROM cats
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
  });
});

// Edit CATEGORIES
app.put("/admin/cats/:id", (req, res) => {
  const sql = `
  UPDATE cats
  SET title = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
  });
});

// Movies create
app.post("/admin/movies", (req, res) => {
  const sql = `
  INSERT INTO movies
  (title, price, rates, cats_id )
  VALUES (?, ?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.price, req.body.rates, req.body.cat], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, new Movie was created', type: 'success' } });
  });
});
//m.rates, m.rate_sum, req.body.rates, req.body.rate_sum,


//READ MOVIES
app.get("/admin/movies", (req, res) => {
  const sql = `
SELECT m.id, price, m.title, m.rates, m.rate_sum, c.title AS cat
FROM movies AS m
LEFT JOIN cats AS c
ON c.id = m.cats_id
ORDER BY title 
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//DELETE MOVIES
app.delete("/admin/movies/:id", (req, res) => {
  const sql = `
  DELETE FROM movies
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Movie gone', type: 'success' } });
  });
});

app.listen(port, () => {
  console.log(`Filmus rodo portas Nr ${port}`);
});
