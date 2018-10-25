const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const CoffeeShop = require("./models/coffeeshops")

const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/coffee-app',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



  app.get("/", function (req,res) {
    res.render("landing");
  });


  //Get all coffeeshops & show them on the page

  app.get("/coffeeshops", function(req,res) {
    CoffeeShop.find({}, function(err, coffeeshops){
      if (err) {
        console.log("something went wrong" + err);
      } else {
          res.render("index", {coffeeshops: coffeeshops});
      }
    })

  });

  //Upload REQUEST
  app.post("/coffeeshops", function(req,res) {
    const request = req.body;
    let name = request.name,
        zip = request.zip,
        street = request.street,
        town = request.town;

    let newCoffeeShop = {name: name, zip: zip, street: street, town: town}
    CoffeeShop.create(newCoffeeShop, function(err, el) {
      if (err) {
        res.send(err)
      } else {
        res.redirect("/coffeeshops");
      }
    });

    //SHOW ROUTE
  app.get("/coffeeshops/:name", function(req, res) {
    CoffeeShop.findOne({name: req.params.name }, function(err, foundCoffeeshop) {
      if (err) {
        console.log("something went wrong" + err);
      } else {
        res.render("show", {coffeeshop: foundCoffeeshop});
      }
    });
  });

