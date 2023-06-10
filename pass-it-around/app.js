const express = require('express');
const app = express();
const port = 3000;

let bottleCount = 99; 

// Home page route
app.get('/', (req, res) => {
  res.send(`
    <h1>${bottleCount} Bottles of beer on the wall</h1>
    <a href="/${bottleCount - 1}">Take one down, pass it around</a>
  `);
});

// Number of bottles route
app.get('/:number_of_bottles', (req, res) => {
  const numberOfBottles = parseInt(req.params.number_of_bottles);

  if (numberOfBottles === 0) {
    res.send(`
      <h1>No more bottles of beer on the wall</h1>
      <a href="/">Start over</a>
    `);
  } else {
    res.send(`
      <h1>${numberOfBottles} Bottles of beer on the wall</h1>
      <a href="/${numberOfBottles - 1}">Take one down, pass it around</a>
      <br>
      <a href="/">Start over</a>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});