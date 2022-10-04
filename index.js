const express = require('express');
const level = require('./lib/levels');

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

// mocked weather data
function getWeatherData(){
  return {
      locations: [
          {
              name: 'Portland',
              forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
              iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
              weather: 'Overcast',
              temp: '54.1 F (12.3 C)',
          },
          {
              name: 'Bend',
              forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
              iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
              weather: 'Partly Cloudy',
              temp: '55.0 F (12.8 C)',
          },
          {
              name: 'Manzanita',
              forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
              iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
              weather: 'Light Rain',
              temp: '55.0 F (12.8 C)',
          },
      ],
  };
}

// middleware to add weather data to context
app.use(function(req, res, next){
if(!res.locals.partials) res.locals.partials = {};
 res.locals.partials.weatherContext = getWeatherData();
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

