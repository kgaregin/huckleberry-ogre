var express = require('express');
var router = express.Router();
const PostActions = new require('../src/db/actions/blog/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
