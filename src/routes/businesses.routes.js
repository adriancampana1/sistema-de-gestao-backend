const { Router } = require('express');

const BusinessesControllers = require('../controllers/BusinessesControllers');
const businessesControllers = new BusinessesControllers();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const businessesRoutes = Router();

businessesRoutes.use(ensureAuthenticated);

businessesRoutes.post('/', businessesControllers.create);
businessesRoutes.put('/:id', businessesControllers.update);
businessesRoutes.get('/:id', businessesControllers.show);
businessesRoutes.get('/', businessesControllers.index);
businessesRoutes.delete('/:id', businessesControllers.delete);

module.exports = businessesRoutes;
