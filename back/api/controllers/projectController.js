import { ProjectService } from '../services/projectService.js';
import { ProjectMemberService } from '../services/projectMemberService.js';

const projectService = new ProjectService();
const projectMemberService = new ProjectMemberService();

export class ProjectController {
  async createProject(req, res) {
    try {
      // id_user-ul este preluat din token de catre authMiddleware
      const created_by = req.user.id_user; 
      const projectData = {
        ...req.body,
        created_by: created_by 
      };
      const project = await projectService.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllProjects(req, res) {
    try {
      const projects = await projectService.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProjectById(req, res) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      res.json(project);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProject(req, res) {
    try {
      const id_project = req.params.id;
      const currentUserId = req.user.id_user;
      
      // 1. Preia ID-ul Creatorului proiectului
      const creatorId = await projectService.getProjectCreatorId(id_project);
      
      // 2. Verifica daca utilizatorul este Project Manager
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);
      
      // 3. AUTORIZARE: Permite doar creatorului SAU unui PM
      if (creatorId !== currentUserId && !isPm) {
        return res.status(403).json({ error: 'Forbidden: Only the creator or a Project Manager can update this project.' });
      }

      const updated = await projectService.updateProject(id_project, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProject(req, res) {
    try {
      const id_project = req.params.id;
      const currentUserId = req.user.id_user;
      
      // 1. Preia ID-ul Creatorului proiectului
      const creatorId = await projectService.getProjectCreatorId(id_project);
      
      // 2. Verifica daca utilizatorul este Project Manager
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);
      
      // 3. AUTORIZARE: Permite doar creatorului SAU unui PM
      if (creatorId !== currentUserId && !isPm) {
        return res.status(403).json({ error: 'Forbidden: Only the creator or a Project Manager can delete this project.' });
      }
      
      await projectService.deleteProject(id_project);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}