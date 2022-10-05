const express = require('express');
const level = require('./lib/levels');
const weather = require('./lib/weather');

const app = express();

const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  helpers: {
    section: (name, options) => {
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return  null;
    }
  }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
  next();
});

// middleware to add weather data to context
app.use(function(req, res, next){
if(!res.locals.partials) res.locals.partials = {};
 res.locals.partials.weatherContext = weather.getWeatherData();
 next();
});

app.get('/', function(req, res) {
  res.render('home', { level: level.getLevel() });
});

app.get('/about', function(req, res) {
  res.render('about', { pageTestScript: '/qa/tests-about.js' });
});

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', (req, res) => {
  res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
});

app.get('/jquery-test', (req, res) => {
  res.render('jquery-test');
});

app.get('/nursery-rhyme', (req, res) => {
	res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', (req, res) => {
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
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

