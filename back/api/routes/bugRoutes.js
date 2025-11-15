import express from 'express';
import { BugController } from '../controllers/bugController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const bugController = new BugController();

router.post('/',authMiddleware,(req, res) => bugController.createBug(req, res)); // Creare Bug
router.get('/', authMiddleware,(req, res) => bugController.getAllBugs(req, res)); // Preluare lista Bug-uri

// Rute de filtrare
router.get('/my-reported', authMiddleware, (req, res) => bugController.getMyReportedBugs(req, res)); // Bug-uri raportate de user-ul curent
router.get('/my-assigned', authMiddleware, (req, res) => bugController.getMyAssignedBugs(req, res)); // Bug-uri alocate userului curent

router.get('/:id', authMiddleware,(req, res) => bugController.getBugById(req, res)); // Preluare un Bug (dupa id)
router.put('/:id', authMiddleware,(req, res) => bugController.updateBug(req, res)); // Actualizare Bug (dupa id)
router.delete('/:id',authMiddleware, (req, res) => bugController.deleteBug(req, res)); // Stergere Bug (dupa id)

export default router;