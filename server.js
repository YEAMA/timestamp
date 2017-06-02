const path = require('path')
const express = require('express')

// const publicPath = path.join(__dirname, '../public/')
const port = process.env.PORT || 3000

var app = express()
// app.use(express.static(publicPath))

app.get('/:unix', (req, res) => {
  var unix = Number(req.params.unix) || req.params.unix;
  var result = {
    unix,
    natural: null 
  };
  
  var natural = new Date(unix * 1000).toString();
  if ( natural !== "Invalid Date" )
    result.natural = natural;
  else
    {
      natural = new Date(unix);
      if (natural !== "Invalid Date") {
          result.natural = unix;
          result.unix = natural.getTime()/1000;
      }
      else
        result.unix = null;
    }
  
  var json = JSON.stringify(result, undefined, 4);
  res.send(json);
})

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})
