/**
 * Created by Sandeep on 16/10/14.
 */
var express = require('express');
var router = express.Router();

var tags=['java','css','css3','php','nodejs','html','html5','python','ruby','rails','express','angularjs','react']

/* GET users listing. */
router.get('/search', function(req, res) {
    if(req.query.term){
        res.json(tags.filter(function(value){
            return value.indexOf(req.query.term)!== -1;
        }));
    }
    else{
        res.status(200).end();
    }
});

module.exports = router;
