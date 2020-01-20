const {Router} = require('express');


const routes = Router();

routes.get('/link', DevConstroller.index);
routes.post('/link', DevConstroller.store);

routes.get('/search', SearchConstroller.index);

module.exports = routes;