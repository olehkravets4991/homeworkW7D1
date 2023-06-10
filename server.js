const express = require("express")
const app = express()

app.get("/greeting", (req, res) => {
    res.send("Hello stranger")
})

app.get("/greeting/:id", (req,  res) => {
    const arr = ["Oleh", "Oleh Kravets"]
    const id = req.params.id
    res.send(`<h1>${arr[id]}</h1>
        <h2>Hello there,${arr[id]} </h2>
    `)
})

app.listen(3000,() => {
    console.log("Listening on port 3000")
})
