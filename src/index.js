require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const routes = require('./routes')
const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-gq0rh.mongodb.net/rate-sites?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes);
app.use(morgan("dev"));

app.listen(4444, () => {
    console.log('> Server started')
});