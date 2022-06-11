var express = require('express');
var app = express();
const index_api = require('./routes/index.ts')

app.use(express.json());
app.use('/',index_api)


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })