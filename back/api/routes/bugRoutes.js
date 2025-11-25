import express from 'express'; //express
import { BugController } from '../controllers/bugController.js'; //controller-ul cu endpointurile de bug
import { authMiddleware } from '../middlewares/authMiddleware.js'; //middleware de autentificare
//middleware-ul e folosit pe fiecare ruta, ca toate rutele de bug necesita autentificare

const router = express.Router(); //facem router ca avem mai multe rute
const bugController = new BugController(); //facem instanta

router.post('/',authMiddleware,(req, res) => bugController.createBug(req, res)); // Creare Bug
router.get('/', authMiddleware,(req, res) => bugController.getAllBugs(req, res)); // Preluare lista Bug-uri

// Rute de filtrare
router.get('/my-reported', authMiddleware, (req, res) => bugController.getMyReportedBugs(req, res)); // Bug-uri raportate de user-ul curent
router.get('/my-assigned', authMiddleware, (req, res) => bugController.getMyAssignedBugs(req, res)); // Bug-uri alocate userului curent

router.get('/:id', authMiddleware,(req, res) => bugController.getBugById(req, res)); // Preluare un Bug (dupa id)
router.put('/:id', authMiddleware,(req, res) => bugController.updateBug(req, res)); // Actualizare Bug (dupa id)
router.delete('/:id',authMiddleware, (req, res) => bugController.deleteBug(req, res)); // Stergere Bug (dupa id)

export default router; //exportam mai departe catre app.js