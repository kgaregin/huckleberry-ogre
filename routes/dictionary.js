const express = require('express');
const router = express.Router();
const connect = require('camo').connect;
const Document = require('camo').Document
const DB_URI = "mongodb://huckleberryogre:iamcook1@ogre-cluster-shard-00-00-rymlw.mongodb.net:27017,ogre-cluster-shard-00-01-rymlw.mongodb.net:27017,ogre-cluster-shard-00-02-rymlw.mongodb.net:27017/ogre-cluster?ssl=true&replicaSet=ogre-cluster-shard-0&authSource=admin";

class Dog extends Document {
  constructor() {
    super();

    this.name = String;
    this.breed = String;
  }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:word', (req, res, next) => {
  res.send(req.word);
});

router.param('word', (req, res, next, word) => {
  connect(DB_URI).then((db) => {
    var lassie = Dog.create({name: 'Lassie', breed: 'Collie'});

    lassie.save().then(function(l) {
      console.log(l._id);
      req.word = l;
    });
  })
  next();
});

module.exports = router;
