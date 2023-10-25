const { Router } = require('express');

const UserControllers = require('../controllers/UserControllers');
const userControllers = new UserControllers();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();

usersRoutes.post('/', userControllers.create);
usersRoutes.put('/', ensureAuthenticated, userControllers.update);

module.exports = usersRoutes;
