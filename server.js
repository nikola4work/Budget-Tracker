var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var compression = require("compression");
var apiRoutes = require("./routes/apiRoutes");
var PORT = 8080;

var app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

apiRoutes(app);

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/Niko'sBudget", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// routes here

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});