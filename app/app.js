const express = require('express');
const app = express();

const data = require('./data.json');
const config = require('./config.json');

var jwt = require('express-jwt');

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});

app.get('/data', jwt({secret: new Buffer(config.auth0secret, 'base64')}),
    function(req, res) {
        permissions = req.user['https://sgc.garvan.org.au/claims/permissions'];
        if (permissions && permissions[0] === 'tier2') {
            res.send(JSON.stringify(data));
        } else {
            res.sendStatus(401);
        }
    }
);

app.listen(3100, function () {
    console.log('App listening on port 3100!')
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.sendStatus(err.status || 500);
})
