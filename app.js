var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var HttpsProxyAgent = require('https-proxy-agent');
var agent = new HttpsProxyAgent('http://172.30.0.192:8080');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/person', function(req, res) {
  request({
    uri: "https://randomuser.me/api?nat=us&inc=gender,name,nat",
    method: "GET",
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    agent: agent,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
  }, function(error, response, body) {
    res.send(body)
  });
})

router.get('/:count', function(req, res) {
  var count = req.params.count || 5;
  request({
    uri: `https://randomuser.me/api?nat=us&results=${count}&inc=gender,name,nat`,
    method: "GET",
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    agent: agent,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
  }, function(error, response, body) {
    res.send(body)
  });
});

app.use('/people', router);

app.use('/swagger', express.static('swagger'));

app.listen(9487, function () {
  console.log('Example app listening on port 9487!');
});