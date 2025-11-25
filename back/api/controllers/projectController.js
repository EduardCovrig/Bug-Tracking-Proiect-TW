import { ProjectService } from '../services/projectService.js'; //service pt proiecte
import { ProjectMemberService } from '../services/projectMemberService.js'; //service pt membrii proiectului

const projectService = new ProjectService();
const projectMemberService = new ProjectMemberService(); //facem instante pt ambele

export class ProjectController {
  async createProject(req, res) { //crearea unui proiect nou
    try {
      // id_user-ul este preluat din token de catre authMiddleware
      const created_by = req.user.id_user; 
      const projectData = {
        ...req.body, //tot req
        created_by: created_by //adaugam si created_by
      };
      const project = await projectService.createProject(projectData); //facem adaugarea efectiva, daca apare ceva => catch
      res.status(201).json(project); //201 CREATED si datele proiectului
    } catch (error) {
      res.status(400).json({ error: error.message }); //400 BAD REQUEST cu eroarea
    }
  }

  async getAllProjects(req, res) { //ia toate proiectele
    try {
      const projects = await projectService.getAllProjects(); //facem preluarea, daca apare ceva catch
      res.json(projects); //le returnam ca json
    } catch (error) {
      res.status(500).json({ error: error.message }); //500 SERVER ERROR cu eroarea
    }
  }

  async getProjectById(req, res) { //cauta un proiect dupa id-ul proiectului
    try {
      const project = await projectService.getProjectById(req.params.id); //incearca, daca nu => catch
      res.json(project); //daca e ok returnam
    } catch (error) {
      res.status(404).json({ error: error.message }); //404 NOT FOUND cu eroarea
    }
  }

  async updateProject(req, res) { //actualizarea unui proiect dupa id-il proiectului
    try {
      const id_project = req.params.id;
      const currentUserId = req.user.id_user; //utilizatorul logat acum
      
      // 1. Preia ID-ul Creatorului proiectului
      const creatorId = await projectService.getProjectCreatorId(id_project);
      
      // 2. Verifica daca utilizatorul este Project Manager
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);
      
      // 3. AUTORIZARE: Permite doar creatorului proiectului sau nui PM
      if (creatorId !== currentUserId && !isPm) {
        return res.status(403).json({ error: 'Forbidden: Only the creator or a Project Manager can update this project.' }); //403 FORBIDDEN
        //cineva fara acces a incercat sa faca actualizarea proiectului
      }

      const updated = await projectService.updateProject(id_project, req.body); //daca totul a fost ok, ajungem aici si facem efectiv actualizarea
      res.json(updated); //returnam json cu proiectul actualizat de confirmare
    } catch (error) {
      res.status(400).json({ error: error.message }); //400 BAD REQUEST cu eroarea
    }
  }

  async deleteProject(req, res) { //EXACT ACEEASI LOGICA CA LA UPDATE
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
      res.status(204).send(); //204 NO CONTENT (a mers cu succes, dar nu avem ce sa mai returnam ca l-am sters)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}