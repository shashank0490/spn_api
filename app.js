require("rootpath")();
var express = require('express');
var app = express();
const morgan = require("morgan");
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, ".env") });
var bodyParser = require('body-parser');
var webRoutes = require("routes/web/routes");
const Send = require("./response/send");
var cors = require('cors');
require('./initialization');
require('./errorHandling/process');
const uuid = require('uuid').v4;
app.use(morgan('dev'));
app.use(cors());



global._const = require('./routes/utils/constant');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', async (req, res) => {
    res.send('Welcome peeps !');
});

app.use(Send);
// app.use(checkSpecialCharacter);
app.use("/web/api", webRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
//An error handling middleware
app.use( (err, req, res, next) =>{
    res.status(400);
    res.json({ message: "Oops, something went wrong." })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.BadRequest({},'Page not found!',404);
});

app.listen(process.env.PORT,  () =>{
    console.log(`Server has started at port: ${process.env.PORT} ..`);
});