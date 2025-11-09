import express from 'express';
import { ProjectController } from '../controllers/projectController.js';

const router = express.Router();
const projectController = new ProjectController();

router.post('/', (req, res) => projectController.createProject(req, res)); // Proiect nou
router.get('/', (req, res) => projectController.getAllProjects(req, res)); // Preluare lista proiecte 
router.get('/:id', (req, res) => projectController.getProjectById(req, res)); // Preluare un proiect (dupa id)
router.put('/:id', (req, res) => projectController.updateProject(req, res)); // Actualizare proiect (dupa id)
router.delete('/:id', (req, res) => projectController.deleteProject(req, res)); // Stergere proiect (dupa id)

export default router;
