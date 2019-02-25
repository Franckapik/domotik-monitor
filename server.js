const express = require('express')
var path = require('path');
const app = express()
const schema = require('./schema');
const bodyParser = require('body-parser');
const cors = require('cors');
const Influx = require('influxdb-nodejs');
const db = new Influx('http://localhost:8086/domotique');

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.get('/measurements', cors(corsOptions), function(req, res) {
  db.showMeasurements()
    .then(names => {
      console.log(names);
      res.send(names);
    })
})

app.get('/db', cors(corsOptions), function(req, res) {
  console.log(req.query);
  db.query(req.query.name)
    .set({
      limit: req.query.limit
    })
    .then((data) => {
      // { name: 'http', columns: [ 'time', 'sum' ], values: [ [ '1970-01-01T00:00:00Z', 904 ] ] }
      res.send(data.results[0].series[0]);
    }).catch(console.error);
})

db.showDatabases()
  .then(names => {
    if (!names.includes('domotique')) {
      return db.createDatabase('domotique');
    }
  }).then(() => {
    app.listen(3001, function() {
      console.log('Moniteur de domotique lancé sur le port 3001!')
    })
  })
  .catch(err => {
    console.error(`Erreur lors de la création/lecture de base de donnée!`);
  })
