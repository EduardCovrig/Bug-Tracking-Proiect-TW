import express from 'express';
import { AuthController } from '../controllers/authController.js';

const authController = new AuthController(); 
const router = express.Router();

router.post('/register', (req, res) => authController.register(req, res)); // inregistrare
router.post('/login', (req, res) => authController.login(req, res));     // Logare

export default router;