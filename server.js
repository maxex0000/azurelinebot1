
 'use strict';

var port = process.env.PORT || 8000;

 var http = require('http');
 var express = require('express');
 var bodyParser = require('body-parser');

 var app = express();
 var request=require('request');
 var server = app.listen(port);

 var path = require('path');

 app.use(bodyParser.json());

 app.get('/',function(req,res){
  res.send('ack');
 });

 /*
 server.listen(port, function () {
     app.setHost(undefined); // change five
 });
*/
  app.post('/linebot', function(req, res){
    var result = req.body.result;
    for(var i=0; i<result.length; i++){
      var data = result[i]['content'];
      bot2(data.from,data.text);
    }
    res.send('ok');
  });

 var askList=['你的生日','你好','hi','嗨','hello'];
 var ansList=['我出生於2016年9月10日星期六下午五點二十分','你好','哈囉','hello','hi'];
 var temp="";

 app.post('/linerobot', function(req, res){
  var result = req.body.result;
  for(var i=0; i<result.length; i++){
    var data = result[i]['content'];
    bot1(data.from,data.text);
  }
  res.send('ok');
});

function bot1(sender, text) {
  var data = {
    sender: sender,
    text: text
  };
  
  request({
    url:'http://loyal.jms.tw:8889/bot1',
    method: 'POST',
    form: data 
  },function(a,b,c){});
}

function bot2(sender, text) {

 var data = {
    sender: sender,
    text: text
  };
  
  request({
    url:'http://loyal.jms.tw:8889/bot2',
    method: 'POST',
    form: data 
  },function(a,b,c){});
  
}