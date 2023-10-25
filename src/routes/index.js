const { Router } = require('express');
const routes = Router();

const usersRouter = require('./users.routes');
const categoriesRoutes = require('./categories.routes');
const productsRoutes = require('./products.routes');
const businessesRoutes = require('./businesses.routes');
const notesRoutes = require('./notes.routes');
const sessionsRoutes = require('./sessions.routes');

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/products', productsRoutes);
routes.use('/businesses', businessesRoutes);
routes.use('/notes', notesRoutes);

module.exports = routes;
