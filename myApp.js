const express = require('express');
const app = express();

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var helmet =require('helmet');

app.use(helmet({
hidePoweredBy: true,
  frameguard: {         // configure
    action: 'deny'
  },
xssFilter: true,
noSniff: true,
ieNoOpen: true,
hsts: {force: true, maxAge: 7776000000}, // 7776000000ms == 90 days
dnsPrefetchControl: true,
noCache: true,
// Content Security Policy
contentSecurityPolicy: {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com'],
  }}
}));

































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
