var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var compression = require("compression");
var apiRoutes = require("./routes/apiRoutes");
const PORT = process.env.PORT || 9090;

var app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

apiRoutes(app);




app.use(express.static("public"));


var URI = process.env.MONGODB_URI || "mongodb://username:username2020@ds225294.mlab.com:25294/heroku_6d39dbwt";

mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true
});



// routes here

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});