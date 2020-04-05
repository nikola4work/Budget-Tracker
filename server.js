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

mongoose.connect("mongodb://username:username2020@ds225294.mlab.com:25294/heroku_6d39dbwt", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});




// routes here

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});