var express = require('express');
var router = express.Router();
var async = require('async');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var products =[];
  var sql ="select id, name, description, category, price " +
           "from products";
  pool.getConnection(function(err,conn){
    if(err){
      next(err);
    } else {
      conn.query(sql,function(err,rows,fields){
        if(err){
          conn.release();
          next(err);
        } else {
          conn.release();
          async.each(rows,function(row,callback) {// 정상적이면 null, 에러면 에러객체 맨마지막엔 에러 있냐 없나{
            var product ={
              "id": row['id'],
              "description": row['description'],
              "catogory": row['category'],
              "price":row['price']
            };
            product.push(product);
            callback();
          }, function (err){
            if(err){
              next(err);
            } else {
              res.json(products);
            }

          });//iterator에는 원소가 전달
        }

      });
    }
  });
  res.json(products);
});

module.exports = router;
