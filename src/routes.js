const {Router} = require('express');
const SiteConstroller = require('./controllers/SiteController');


const routes = Router();

routes.get('/link', SiteConstroller.index);
routes.post('/link', SiteConstroller.store);

module.exports = routes;