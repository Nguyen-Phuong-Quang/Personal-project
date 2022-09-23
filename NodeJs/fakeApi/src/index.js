const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
  
// Routes
const routes = require('./routes')

// Connect to database
const database = require('./configs/db');
database.connect();

app.use(express.urlencoded(
    {
        extended: true
    }
))

app.use(methodOverride('_method'))

app.use(morgan('combined'));

app.use(express.json());

// Routes
routes(app);

app.listen(PORT);
