const { Router } = require('express');

const ProductControllers = require('../controllers/ProductControllers');
const productControllers = new ProductControllers();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const productsRoutes = Router();

productsRoutes.use(ensureAuthenticated);

productsRoutes.post('/', productControllers.create);
productsRoutes.get('/:id', productControllers.show);
productsRoutes.get('/', productControllers.index);
productsRoutes.delete('/:id', productControllers.delete);

module.exports = productsRoutes;
