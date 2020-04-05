var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var compression = require("compression");
var apiRoutes = require("./routes/apiRoutes");
var PORT = 9090;

var app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

apiRoutes(app);

app.use(express.static("public"));

mongoose.connect("mongodb://niko:nikola1993@ds031995.mlab.com:31995/heroku_qmg4lnc7", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// routes here

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});