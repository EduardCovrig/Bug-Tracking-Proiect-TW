import express from 'express';
import { ProjectMemberController } from '../controllers/projectMemberController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const projectMemberController = new ProjectMemberController();

router.post('/', authMiddleware,(req, res) => projectMemberController.addMember(req, res)); // Adaugă membru în proiect
router.get('/project/:id_project',authMiddleware, (req, res) => projectMemberController.getMembersByProject(req, res)); // Preluare membri după id_project
router.get('/:id_user/:id_project', authMiddleware,(req, res) => projectMemberController.getMember(req, res)); // Preluare membru specific (cheie compusă)
router.put('/:id_user/:id_project', authMiddleware,(req, res) => projectMemberController.updateMemberRole(req, res)); // Actualizare rol membru
router.delete('/:id_user/:id_project', authMiddleware,(req, res) => projectMemberController.removeMember(req, res)); // Eliminare membru

router.get('/my-projects', authMiddleware, (req, res) => projectMemberController.getMyProjects(req, res)); // Preluare proiecte ale utilizatorului curent

export default router;