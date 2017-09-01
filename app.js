const express = require('express');
const app = express();

const data = require('./data.json');

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function (req, res) {
    res.send(JSON.stringify(data));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
