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

var URI = process.env.MONGODB_URI || "";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});



// routes here

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});