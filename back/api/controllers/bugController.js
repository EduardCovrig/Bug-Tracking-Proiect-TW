
import { BugService } from '../services/bugService.js';
import { ProjectMemberService } from '../services/projectMemberService.js'; // Import pentru verificare PM

const bugService = new BugService();
const projectMemberService = new ProjectMemberService();

export class BugController {
  async createBug(req, res) {
    try {
        const reported_by = req.user.id_user; // ID-ul utilizatorului logat
        const bugData = {
            ...req.body,
            reported_by: reported_by, 
          };
      const bug = await bugService.createBug(bugData);
      res.status(201).json(bug);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllBugs(req, res) {
    try {
      const bugs = await bugService.getAllBugs();
      res.json(bugs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Preluarea bug-urilor raportate de userul curent
  async getMyReportedBugs(req, res) {
    try {
      const reported_by = req.user.id_user;
      const bugs = await bugService.getBugsReportedBy(reported_by);
      res.json(bugs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //  bugurile userului curent
  async getMyAssignedBugs(req, res) {
    try {
      const assigned_to = req.user.id_user;
      const bugs = await bugService.getBugsAssignedTo(assigned_to);
      res.json(bugs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBugById(req, res) {
    try {
      const bug = await bugService.getBugById(req.params.id);
      res.json(bug);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateBug(req, res) {
    try {
      const id_bug = req.params.id;
      const currentUserId = req.user.id_user;
      
      // 1. Preluare detalii pentru autorizare (reported_by si id_project)
      const { reported_by, id_project } = await bugService.getReportDetails(id_bug);
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);

      // 2. AUTORIZARE: Doar reporterul SAU un PM al proiectului pot modifica
      if (reported_by !== currentUserId && !isPm) {
        return res.status(403).json({ error: 'Forbidden: Only the reporter or a Project Manager can update this bug.' });
      }

      const updated = await bugService.updateBug(id_bug, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteBug(req, res) {
    try {
      const id_bug = req.params.id;
      const currentUserId = req.user.id_user;
      
      // 1. Preluare detalii pentru autorizare
      const { reported_by, id_project } = await bugService.getReportDetails(id_bug);
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);

      // 2. AUTORIZARE: Doar reporterul SAU un PM al proiectului pot sterge
      if (reported_by !== currentUserId && !isPm) {
        return res.status(403).json({ error: 'Forbidden: Only the reporter or a Project Manager can delete this bug.' });
      }

      await bugService.deleteBug(id_bug);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}