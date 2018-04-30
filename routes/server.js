var express = require('express');
var router = express.Router();

const path = require("path");

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }
  

  const db = client.db("black_death_db");

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  router.get("/facts", function(req, res){
    const factsCollection = db.collection("facts");
    factsCollection.find().toArray(function(err, facts){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(facts);
    });
  })
})

module.exports = router;
