var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    PostActions.newPost('Hello', 'world').then(
        () => console.log('new post created!'),
        (error) => console.log(error)
    );
  res.send('respond with a resource');
});

module.exports = router;
