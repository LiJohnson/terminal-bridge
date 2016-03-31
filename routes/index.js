var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ternimal',function( req,res,next ){
	res.render('ternimal',{title:'ternimal'});
});

module.exports = router;
