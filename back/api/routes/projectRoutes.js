import express from 'express'; //express
import { ProjectController } from '../controllers/projectController.js'; //controller-ul cu endpointurile de proiect

import { authMiddleware } from '../middlewares/authMiddleware.js'; //middleware de autentificare
//se va folosi pe fiecare ruta

const router = express.Router(); //facem router ca avem mai multe rute
const projectController = new ProjectController(); //facem instanta

router.post('/', authMiddleware,(req, res) => projectController.createProject(req, res)); // Proiect nou
router.get('/', authMiddleware,(req, res) => projectController.getAllProjects(req, res)); // Preluare lista proiecte 
router.get('/:id', authMiddleware,(req, res) => projectController.getProjectById(req, res)); // Preluare un proiect (dupa id)
router.put('/:id', authMiddleware,(req, res) => projectController.updateProject(req, res)); // Actualizare proiect (dupa id)
router.delete('/:id',authMiddleware, (req, res) => projectController.deleteProject(req, res)); // Stergere proiect (dupa id)

export default router; //exportam mai departe catre app.js
