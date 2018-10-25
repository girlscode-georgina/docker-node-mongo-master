const mongoose = require("mongoose");
const User = require("./users");
const Comment = require("./comments");


const coffeeShopSchema = new mongoose.Schema ({
    name: String,
    zip: Number,
    street: String,
    town: String,
    comments: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment" }]
});


module.exports = mongoose.model("CoffeeShop", coffeeShopSchema);
