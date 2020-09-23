import express from 'express';
import ClassesController from './src/controllers/ClassesController';
import ConnectionsController from './src/controllers/ConnectionsController';
import UsersController from './src/controllers/UsersController';
import SessionController from './src/controllers/SessionController';
import checkJwt from './src/middlewares/checkJwt';


const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const sessionController = new SessionController();

routes.post('/login', sessionController.create);
routes.post('/users', usersController.create);

routes.use(checkJwt);

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

routes.put('/users', usersController.update);



export default routes;