const express = require('express');

const app = express();

app.get('/initiate/:clientId/:clientSecret', require('./lib/initiate'));

//app.get('/refresh', require('./lib/refresh'));

app.get('/oauth/callback/:clientId/:clientSecret', require('./lib/callback'));

app.get('/', require('./lib/welcome'));

app.listen(3000, () => {
    console.log("App Listening on 3000 !");
});
