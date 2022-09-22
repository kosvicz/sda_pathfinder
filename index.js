const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
    .create({defaultLayout: 'main'});
const level = require('./lib/levels');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home', { level: level.getLevel() });
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express running on http://localhost:' +
    app.get('port') + '; Press Ctrl+C to stop server.');
});

