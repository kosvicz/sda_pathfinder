const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('Hello Pathfinder');
});

app.get('/about', function(req, res) {
  res.type('text/plain');
  res.send('About Pathfinder Club');
});

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server error');
});

app.listen(app.get('port'), function() {
  console.log('Express running on http://localhost:' +
    app.get('port') + '; Press Ctrl+C to stop server.');
});

