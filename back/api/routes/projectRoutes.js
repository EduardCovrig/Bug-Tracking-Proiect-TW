import express from 'express';
import { ProjectController } from '../controllers/projectController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const projectController = new ProjectController();

router.post('/', authMiddleware,(req, res) => projectController.createProject(req, res)); // Proiect nou
router.get('/', authMiddleware,(req, res) => projectController.getAllProjects(req, res)); // Preluare lista proiecte 
router.get('/:id', authMiddleware,(req, res) => projectController.getProjectById(req, res)); // Preluare un proiect (dupa id)
router.put('/:id', authMiddleware,(req, res) => projectController.updateProject(req, res)); // Actualizare proiect (dupa id)
router.delete('/:id',authMiddleware, (req, res) => projectController.deleteProject(req, res)); // Stergere proiect (dupa id)

export default router;
