import express from 'express'; //express
import { ProjectMemberController } from '../controllers/projectMemberController.js'; //controller-ul cu endpointurile de projectMember
import { authMiddleware } from '../middlewares/authMiddleware.js'; //middleware de autentificare
//se va aplica pe fiecare ruta

const router = express.Router(); //facem router ca avem mai multe rute
const projectMemberController = new ProjectMemberController(); //facem instanta

router.post('/', authMiddleware,(req, res) => projectMemberController.addMember(req, res)); // Adauga membru în proiect
router.get('/project/:id_project',authMiddleware, (req, res) => projectMemberController.getMembersByProject(req, res)); // Preluare membri după id_project
router.get('/:id_user/:id_project', authMiddleware,(req, res) => projectMemberController.getMember(req, res)); // Preluare membru specific (cheie id_user si id_project))
router.put('/:id_user/:id_project', authMiddleware,(req, res) => projectMemberController.updateMemberRole(req, res)); // Actualizare rol membru
router.delete('/:id_user/:id_project', authMiddleware,(req, res) => projectMemberController.removeMember(req, res)); // Eliminare membru

router.get('/my-projects', authMiddleware, (req, res) => projectMemberController.getMyProjects(req, res)); // Preluare proiecte ale utilizatorului curent

export default router; //export mai departe catre app.js