const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const home = require('./routes/home');
const express = require('express');
const app = express();


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));