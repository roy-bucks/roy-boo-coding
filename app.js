'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const path = require("path"); // path module
const port =  process.env.PORT || 3000;

const {
    dbConnect,
    dbDisconnect,
} = require('./utils/dbHandler.utils');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));


// all static content
// app.use(express.static(path.join(__dirname, "./assets/")));

//app static 
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');// root route to render the index.ejs view


// start server
const server = app.listen(port);
dbConnect(); //db connection 
console.log('Express started. Listening on %s', port);



const routes = require('./routes/index');
routes(app);
