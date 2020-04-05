const db = require("../models");

var apiRoutes = app => {
    app.post("/api/budget/:type", (req, res) => {
        var newBudget = req.body;
        db.Budget.create(newBudget).then(data => {
            db.Budget.find({}).then(allTransactions => {
                res.json(allTransactions);
            });
            //   res.json(data);
        });
    });

    app.get("/api/budget", (req, res) => {
        db.Budget.find({})
            .sort({ date: 1 })
            .then(allTransactions => {
                res.json(allTransactions);
            });
    });

    app.post("/api/budget/bulk", ({ body }, res) => {
        db.Budget.insertMany(body)
            .then(allTransactions => {
                res.json(allTransactions);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
};
module.exports = apiRoutes;