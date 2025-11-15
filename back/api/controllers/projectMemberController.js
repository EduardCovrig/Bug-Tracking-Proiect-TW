import { ProjectMemberService } from '../services/projectMemberService.js';

const projectMemberService = new ProjectMemberService();

export class ProjectMemberController {
  
  async addMember(req, res) {
    try {
      const { id_project } = req.body;
      const currentUserId = req.user.id_user; // ID-ul utilizatorului care face cererea

      // 1. Verificare: Este utilizatorul care face cererea Project Manager pentru acest proiect?
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);
      
      if (!isPm) {
        return res.status(403).json({ error: 'Forbidden: Only Project Managers can add or modify members in a project.' });
      }

      // 2. Daca e PM, continua
      const member = await projectMemberService.addMember(req.body);
      res.status(201).json(member);
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Preluarea membrilor unui proiect
  async getMembersByProject(req, res) {
    try {
      const members = await projectMemberService.getMembersByProject(req.params.id_project);
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //Preluarea proiectelor la care este membru utilizatorul curent
  async getMyProjects(req, res) {
    try {
      const id_user = req.user.id_user; // Preluare id din token
      const memberships = await projectMemberService.getProjectsByUserId(id_user);
      res.json(memberships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //Preluarea unui membru specific
  async getMember(req, res) {
    try {
      const { id_user, id_project } = req.params;
      const member = await projectMemberService.getMember({ id_user, id_project });
      res.json(member);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Actualizare rol membru. neceista pm
  async updateMemberRole(req, res) {
    try {
      const { id_user, id_project } = req.params;
      const currentUserId = req.user.id_user; 

      // 1. Verificare: Este utilizatorul care face cererea PM?
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);
      if (!isPm) {
        return res.status(403).json({ error: 'Forbidden: Only Project Managers can update member roles.' });
      }

      // 2. Daca e PM, continua
      const updated = await projectMemberService.updateMemberRole({ id_user, id_project }, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminare membru. Necesita PM
  async removeMember(req, res) {
    try {
      const { id_user, id_project } = req.params;
      const currentUserId = req.user.id_user; 

      // 1. Verificare: Este utilizatorul care face cererea PM?
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);
      if (!isPm) {
        return res.status(403).json({ error: 'Forbidden: Only Project Managers can remove members.' });
      }

      // 2. Daca este PM, continua
      await projectMemberService.removeMember({ id_user, id_project });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}