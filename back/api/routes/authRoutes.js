import express from 'express'; //express
import { AuthController } from '../controllers/authController.js'; //controller-ul cu endpointurile

const authController = new AuthController();  //facem instanta
const router = express.Router(); //facem un roter ca avem mai multe rute

router.post('/register', (req, res) => authController.register(req, res)); // inregistrare
router.post('/login', (req, res) => authController.login(req, res));     // Logare

export default router; //exportam mai departe catre app.js