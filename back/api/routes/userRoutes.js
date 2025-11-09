import express from 'express';
import { UserController } from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();

router.post('/', (req, res) => userController.createUser(req, res)); // Utilizator nou
router.get('/', (req, res) => userController.getAllUsers(req, res)); // Lista toti utilizatorii
router.get('/:id', (req, res) => userController.getUserById(req, res)); // Un utilizator (dupa id)
router.put('/:id', (req, res) => userController.updateUser(req, res)); // Actualizeaza un utilizator (dupa id)
router.delete('/:id', (req, res) => userController.deleteUser(req, res)); // Sterge un utilizator (dupa id)

export default router;
