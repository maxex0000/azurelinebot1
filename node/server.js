 'use strict';

var port = process.env.PORT || 8000;

 var http = require('http');
 var express = require('express');
 var bodyParser = require('body-parser');
 var swaggerize = require('swaggerize-express');
 var swaggerUi = require('swaggerize-ui'); // change one
 var path = require('path');
 var request = require('request');

 var app = express();

 var server = http.createServer(app);

 app.use(bodyParser.json());
<<<<<<< HEAD
 app.use(bodyParser.urlencoded({ extended: true }));
 
 app.get('/',function(req,res){
	res.send('ack');
 });
=======
>>>>>>> parent of c1630ec... version2

 app.use(swaggerize({
     api: path.resolve('./config/api.json'), // change two
     handlers: path.resolve('./handlers'),
     docspath: '/swagger/docs/v1' // change three
 }));

 // change four
 app.use('/swagger', swaggerUi({
   docs: '/swagger/docs/v1'  
 }));

 server.listen(port, function () {
     app.setHost(undefined); // change five
 });



const CHANNEL_ID = '1479889164';
const CHANNEL_SERECT = '2606537f46ec134d8e494f8474503edb'; 
const MID = 'u5e8f9e9d24a01b26db3adb980ec856dc';
const LINE_API = 'https://trialbot-api.line.me/v1/events';



app.post('/linerobot', (req, res) => {
  const result = req.body.result;
  for(var i=0; i<result.length; i++){
    const data = result[i]['content'];
    console.log('receive: ', data);
    sendTextMessage(data.from, data.text);
  }
});


function sendTextMessage(sender, text) {

  const data = {
    to: [sender],
    toChannel: 1383378250,
    eventType: '138311608800106203',
    content: {
      contentType: 1,
      toType: 1,
      text: text
    }
  };

  console.log('send: ', data);

  request({
    url: LINE_API,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Line-ChannelID': CHANNEL_ID,
      'X-Line-ChannelSecret': CHANNEL_SERECT,
      'X-Line-Trusted-User-With-ACL': MID
    },
    method: 'POST',
    body: JSON.stringify(data) 
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
    console.log('send response: ', body);
  });
}