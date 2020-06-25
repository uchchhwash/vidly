const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require("mongoose");
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require('express');
const app = express();

mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could Not Connect to MongoDB"))

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);

app.use('/api/genres', genres);
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));