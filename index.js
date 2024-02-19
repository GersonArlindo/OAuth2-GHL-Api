const express = require('express');
const callback = require('./lib/callback')

const app = express();

app.get('/initiate/:clientId/:clientSecret', require('./lib/initiate'));

//app.get('/refresh', require('./lib/refresh'));

app.get('/oauth/callback', (req, res) => {
    const clientId = req.query.clientId;
    const clientSecret = req.query.clientSecret;
    callback(req, res, clientId, clientSecret);
});


app.get('/', require('./lib/welcome'));

app.listen(3000, () => {
    console.log("App Listening on 3000 !");
});
