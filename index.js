//importing modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/routes')

var app = express();

//adding middleware cors
app.use(cors());

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const port no.
const port = 3000;

app.use('/api', routes);

app.listen(port,()=>{
    console.log('server started at port : '+port);
});