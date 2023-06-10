const express = require("express")
const app = express()
const request = require('request');
const apiUrl = 'http://jservice.io/api/random';

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

  const magic8BallResponses = ["It is certain","It is decidedly so","Without a doubt","Yes definitely","You may rely on it","As I see it, yes","Most likely","Outlook good","Yes","Signs point to yes","Reply hazy, try again","Ask again later","Better not tell you now","Cannot predict now","Concentrate and ask again","Don't count on it","My reply is no","My sources say no","Outlook not so good","Very doubtful"];
  
  app.get('/magic/:question', (req, res) => {
    const question = decodeURIComponent(req.params.question);
    const randomResponse =
      magic8BallResponses[Math.floor(Math.random() * magic8BallResponses.length)];
  
    const responseHtml = `<h1>Your Question: ${question}</h1>
                          <h1>Magic 8 Ball Response: ${randomResponse}</h1>`;
  
    res.send(responseHtml);
  });

  function isFibonacci(number) {
    if (number < 0) {
      return false;
    } else if (number === 0 || number === 1) {
      return true;
    } else {
      let a = 0;
      let b = 1;
      while (b < number) {
        let temp = b;
        b = a + b;
        a = temp;
      }
      return b === number;
    }
  }
  

  app.get('/fibonacci', (req, res) => {
    const number = parseInt(req.query.number);
    if (isFibonacci(number)) {
      res.send('Very good. It is a Fibonacci number.');
    } else {
      res.send('I can tell this is not a Fibonacci number.');
    }
  });

  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const question = JSON.parse(body)[0];
      console.log('Category:', question.category.title);
      console.log('Question:', question.question);
    } else {
      console.error('Error:', error);
    }
  });

  app.get('/trivia', (req, res) => {
    request(apiUrl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const question = JSON.parse(body)[0];
        const trivia = {
          question: question.question,
          answer: question.answer,
        };
        res.json(trivia);
      } else {
        res.status(500).send('Error retrieving trivia question');
      }
    });
  });

app.listen(3000,() => {
    console.log("Listening on port 3000")
})
