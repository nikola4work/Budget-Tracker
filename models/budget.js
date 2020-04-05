var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BudgetSchema = new Schema({
    transaction: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

var Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;