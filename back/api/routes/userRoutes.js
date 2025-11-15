import express from 'express';
import { UserController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const userController = new UserController();

// Ruta POST pentru crearea utilizatorului a fost mutata in authRoutes.js (/auth/register)

// Lista toti utilizatorii (Necesita token)
router.get('/', authMiddleware,(req, res) => userController.getAllUsers(req, res)); 

// Un utilizator (dupa id) (Necesita token + autorizare în Controller)
router.get('/:id', authMiddleware,(req, res) => userController.getUserById(req, res)); 

// Actualizeaza un utilizator (dupa id) (Necesita token + autorizare în Controller)
router.put('/:id', authMiddleware,(req, res) => userController.updateUser(req, res)); 

// Sterge un utilizator (dupa id) (Necesita token + autorizare în Controller)
router.delete('/:id',authMiddleware, (req, res) => userController.deleteUser(req, res)); 

export default router;