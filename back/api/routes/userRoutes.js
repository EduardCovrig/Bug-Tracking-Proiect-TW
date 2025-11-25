import express from 'express'; //express
import { UserController } from '../controllers/userController.js'; //controller-ul cu endpointurile de utilizator
import { authMiddleware } from '../middlewares/authMiddleware.js'; //middleware de autentificare
//toate rutele au nevoie de autentificare cu un token valid

const router = express.Router(); //facem router ca avem mai multe rute
const userController = new UserController(); //facem instanta de controller

// Ruta POST pentru crearea utilizatorului a fost mutata in authRoutes.js (/auth/register)

router.get('/', authMiddleware,(req, res) => userController.getAllUsers(req, res)); //lista toti utilizatorii

router.get('/:id', authMiddleware,(req, res) => userController.getUserById(req, res)); //un utilizator(dupa id)

router.put('/:id', authMiddleware,(req, res) => userController.updateUser(req, res)); //actualizeaza un utilizator dupa id

router.delete('/:id',authMiddleware, (req, res) => userController.deleteUser(req, res)); //sterge toti utilizatorii dupa id

export default router; //exportam mai departe catre app.js