const { Router } = require('express');

const CategoriesControllers = require('../controllers/CategoriesControllers');
const categoriesControllers = new CategoriesControllers();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post('/', categoriesControllers.create);
categoriesRoutes.get('/', categoriesControllers.index);

module.exports = categoriesRoutes;
