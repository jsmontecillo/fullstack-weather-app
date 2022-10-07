const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 1010;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});

app.get('/api/favorites', cors(), async (req, res) => {
  try {
    const { rows: users } = await db.query('SELECT * FROM users');
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

const cities = ["london", "los angeles", "chicago", "new york", "tokyo", "austin", "las vegas", "new orleans", "seattle", "miami", "paris", "dubai", "bangkok", "milan", "hanoi"]
// create the get request
// app.get("/weather/:city", (req,res) => {
//   const city = req.params.city;
//   console.log(city);
//   const apiKey = process.env.REACT_API_KEY;
//   const params = new URLSearchParams({
//       q: city,
//       APPID: apiKey,
//       units: "imperial",
//   });
//   const url = `https://api.openweathermap.org/data/2.5/forecast?${params}`; 
//   console.log(url);
//   fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//        res.send(data);
//    })
//    .catch((err) => {
//        console.log(err);
//    });
// });

app.get("/weather/:favorite", (req,res) => {
  const fave = req.params.favorite;
  const apiKey = process.env.REACT_API_KEY;
  const params = new URLSearchParams({
      q: fave,
      APPID: apiKey,
      units: "imperial",
  });
  const url = `https://api.openweathermap.org/data/2.5/forecast?${params}`; 
  console.log(url);
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
       res.send(data);
   })
   .catch((err) => {
       console.log(err);
   });
});

// create the POST request
// app.post('/api/students', cors(), async (req, res) => {
//   const newUser = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//   };
//   console.log([newUser.firstname, newUser.lastname]);
//   const result = await db.query(
//     'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
//     [newUser.firstname, newUser.lastname],
//   );
//   console.log(result.rows[0]);
//   res.json(result.rows[0]);
// });

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
