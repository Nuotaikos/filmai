const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const md5 = require('js-md5');
const uuid = require('uuid');
app.use(express.json({ limit: '10mb' }));
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

const doAuth = function (req, res, next) { //admin rout
  if (0 === req.url.indexOf('/admin')) {
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== 'admin') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
    next(); //viesa dalis
  } else { // frontui
    const sql = `
    SELECT
    name, role
    FROM users
    WHERE session = ?
`;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== 'user') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  }
}

// AUTH
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
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

// <<<<<<<<<<<<< Movies>>>>>>>>>>>>>>>>>>>

// Movies create
app.post("/admin/movies", (req, res) => {
  const sql = `
  INSERT INTO movies
  (title, price, rates, rate_sum, cats_id, photo )
  VALUES (?, ?, rates + 1, ?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.price, req.body.rates, req.body.cat, req.body.photo], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, new Movie was created', type: 'success' } });
  });
});



//READ MOVIES
app.get("/admin/movies", (req, res) => {
  const sql = `
SELECT m.id, price, m.title, m.rates, m.rate_sum, c.title AS cat, photo
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

// Front
// READ MOVIES
// app.get("/movies", (req, res) => {
//   const sql = `
// SELECT m.id, price, m.title, m.rates, m.rate_sum, c.title AS cat, photo
// FROM movies AS m
// LEFT JOIN cats AS c
// ON c.id = m.cats_id
// ORDER BY title 
// `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

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

// Edit movies
// app.put("/admin/movies/:id", (req, res) => {
//   const sql = `
//   UPDATE movies
//   SET title = ?, cats_id = ?, price = ?,  rates + 1, rate_sum = rate_sum + ?, photo = ?
//   WHERE id = ?
//   `;
//   con.query(sql, [req.body.title, req.body.cat, req.body.price, req.body.rates, req.body.photo, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send({ result, msg: { text: 'OK, Movie updated. Now it is as new', type: 'success' } });
//   });
// });
// Edit
app.put("/admin/movies/:id", (req, res) => {
  const sql = `
  UPDATE movies
  SET title = ?, cats_id = ?, price = ?, photo = ?, rates = rates + 1, rate_sum = rate_sum + ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.cat, req.body.price, req.body.photo, req.body.rates, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Movie updated. Now it is as new', type: 'success' } });
  });
});

// app.put("/admin/movies/:movieId", (req, res) => {
//   const sql = `
//   UPDATE movies
//   SET rates = rates + 1, rate_sum = rate_sum + ?
//   WHERE id = ?
// `;
//   con.query(sql, [req.body.rates, req.params.movieId], (err, result) => {
//     if (err) throw err;
//     res.send({ result, msg: { text: 'Tu prabalsavai', type: 'danger' } });
//   });
// });
//delete photos
app.delete("/admin/photos/:id", (req, res) => {
  const sql = `
  UPDATE movies
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, photo gone. Have a nice day.', type: 'success' } });
  });
});


// FRONT

app.get("/movies", (req, res) => {
  let sql;
  let requests;
  console.log(req.query['cat-id']);
  if (!req.query['cat-id'] && !req.query['s']) {
    sql = `
      SELECT com.id AS com_id, com, m.id, c.id AS cid, price, m.title, rates, rate_sum, c.title AS cat, photo
      FROM movies AS m
      LEFT JOIN cats AS c
      ON c.id = m.cats_id
      LEFT JOIN comments AS com
      ON m.id = com.movie_id
      ORDER BY title
      `;
    requests = [];
  } else if (req.query['cat-id']) {
    sql = `
      SELECT com.id AS com_id, com, m.id, c.id AS cid, price, m.title, rates, rate_sum, c.title AS cat, photo
      FROM movies AS m
      LEFT JOIN cats AS c
      ON c.id = m.cats_id
      LEFT JOIN comments AS com
      ON m.id = com.movie_id
      WHERE m.cats_id = ?
      ORDER BY title
      `;
    requests = [req.query['cat-id']];
  } else {
    sql = `
    SELECT com.id AS com_id, com, m.id, c.id AS cid, price, m.title, rates, rate_sum, c.title AS cat, photo
    FROM movies AS m
    LEFT JOIN cats AS c
    ON c.id = m.cats_id
    LEFT JOIN comments AS com
    ON m.id = com.movie_id
    WHERE m.title LIKE ? 
    ORDER BY title
    `;
    requests = ['%' + req.query['s'] + '%'];
  }

  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.get("/cats", (req, res) => {
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

// Comments
app.post("/comments", (req, res) => {
  const sql = `
  INSERT INTO comments
  (com, movie_id)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.com, req.body.movie_id,], (err, result) => {
    if (err) throw err;
    res.send({ result });
  });
});

app.listen(port, () => {
  console.log(`Filmus rodo portas Nr ${port}`);
});
