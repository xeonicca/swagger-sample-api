var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/person', function(req, res) {
  request({
    uri: "https://randomuser.me/api?inc=gender,name,nat",
    method: "GET",
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
  }, function(error, response, body) {
    res.send(body)
  });
})

router.get('/:count?', function(req, res) {
  var count = req.params.count || 5;
  var additionalFields = ''
  for(var query in req.query) {
    additionalFields += '&' + query + '=' + req.query[query]
  }

  var requestURL = `https://randomuser.me/api?results=${count}&inc=gender,name,nat${additionalFields}`

  request({
    uri: requestURL,
    method: "GET",
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
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