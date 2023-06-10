const express = require("express")
const app = express()

app.get("/greeting", (req, res) => {
    res.send("Hello stranger")
})

app.get("/greeting/:name", (req,  res) => {
    const arr = ["Oleh", "Oleh Kravets"]
    const name = req.params.name
    res.send(`<h1>${arr[name]}</h1>
        <h2>Hello there,${arr[name]} </h2>
    `)
})

app.get("/tip/:total/:tipPercentage", (req, res) => {
    const total = parseFloat(req.params.total);
    const tipPercentage = parseInt(req.params.tipPercentage);
    const tipAmount = (total * tipPercentage) / 100;
  
    res.send(tipAmount.toString());
  });

app.listen(3000,() => {
    console.log("Listening on port 3000")
})
