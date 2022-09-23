const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 5000;
const path = require('path');
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middlewares/sortMiddleware');

const route = require('./routes')
const db = require('./config/db')

// Connect to DB

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded(
  {
    extended: true
  }
));

app.use(express.json());

app.use(methodOverride('_method'));

//Custom middlewares
app.use(sortMiddleware);

app.use(morgan('combined'))

app.engine(
  'hbs',
  handlebars.engine({
    extname: ".hbs",
    helpers: require('./helpers/handlebars')
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

//Routes
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})