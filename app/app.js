const express = require('express');
const serveIndex = require('serve-index');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(serveIndex(__dirname + '/public', { view: 'details' }));

console.log('Available on: http://localhost:' + port);
app.listen(port);