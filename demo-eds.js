var express = require('express');
var app = express();
var fs = require("fs");
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080

app.get('/types', function (req, res) {
   fs.readFile( __dirname + "/eds_ressources/" + "eds_types.json", 'utf8', function (err, data) {
      var repositoryId = req.query.repositoryId;
      console.log("Types for repo %s -> %s", repositoryId, data);
      res.end( data );
   });
})
app.post('/type/', function (req, res) {
   var json = JSON.parse(req.body);
   console.log("Json Payload %s", json);

   var propSymName = req.params.propSymName;
   console.log("Returning data for %s", propSymName);


   fs.readFile( __dirname + "/" + "/eds_ressources/" + "eds_types/" + propSymName+ ".json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})
var server = app.listen(port, host, function () {
   console.log("EDS-demo service listening at http://%s:%s", host, port)
})