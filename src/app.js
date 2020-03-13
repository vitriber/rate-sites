const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes')

const createApp = () => {
    const app = express();
    
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(routes);
    app.use(morgan("dev"));

    return app;
};

module.exports = createApp;
