import { ProjectMemberService } from '../services/projectMemberService.js'; //service cu metodele pt projectmember

const projectMemberService = new ProjectMemberService(); //facem instanta noua

export class ProjectMemberController {
  
  async addMember(req, res) {
    try {
      const { id_project, id_user, role } = req.body;
      const currentUserId = req.user.id_user; // ID-ul utilizatorului care face cererea

      //1. Verificare: Daca utilizatorul vrea sa se adauge singur ca TST
      const isSelfEnrollment = (currentUserId === id_user) && (role === 'TST');
      
      if (!isSelfEnrollment) {
          // Daca nu e self-enrollment, verificam daca cel care face cererea e PM
          const isPm = await projectMemberService.isProjectManager(currentUserId, id_project); 
          if (!isPm) { //daca nu e pm, eroare!
            return res.status(403).json({ error: 'Forbidden: Only Project Managers can add other members.' });
          }
      }

      // 2. Daca e PM, continua
      const member = await projectMemberService.addMember(req.body);
      res.status(201).json(member); //201 CREATED si datele membrului adaugat
      
    } catch (error) { //in caz de orice eroare 400 BAD REQUEST
      res.status(400).json({ error: error.message });
    }
  }

  // Preluarea membrilor unui proiect dupa id
  async getMembersByProject(req, res) {
    try {
      const members = await projectMemberService.getMembersByProject(req.params.id_project); //inceraca sa ii ia, in caz de orice exceptie => catch
      res.json(members); //returneaza json cu ei (default cod 200 OK)
    } catch (error) {
      res.status(500).json({ error: error.message }); //500 SERVER ERROR daca ceva nu a mers ok
    }
  }

  //Preluarea proiectelor la care este membru utilizatorul logat acum
  async getMyProjects(req, res) {
    try {
      const id_user = req.user.id_user; // Preluare id din token utilizator logat
      const memberships = await projectMemberService.getProjectsByUserId(id_user); //ia proiectele
      res.json(memberships); //daca e ok le afiseaza
    } catch (error) {
      res.status(500).json({ error: error.message }); //atlfel 500 SERVER ERROR
    }
  }

  //Preluarea unui membru specific dupa id_user si id_project
  async getMember(req, res) {
    try {
      const { id_user, id_project } = req.params; //ia din parametrii requestului
      const member = await projectMemberService.getMember({ id_user, id_project }); //incearca sa caute membrul
      res.json(member); //il gaseste, il returneaza
    } catch (error) {
      res.status(404).json({ error: error.message }); //nu il gaseste, deci exceptie, deci 404 NOT FOUND
    }
  }

  // Actualizare rol membru. neceista rol pm
  async updateMemberRole(req, res) {
    try {
      const { id_user, id_project } = req.params; //ia din parametrii requestului
      const currentUserId = req.user.id_user;  //id-ul utilizatorului logat acum

      // 1. Verificare: Este utilizatorul care face cererea PM?
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);
      if (!isPm) {
        return res.status(403).json({ error: 'Forbidden: Only Project Managers can update member roles.' }); //403 FORBIDDEN acces interzis
      }

      // 2. Daca e PM, continua
      const updated = await projectMemberService.updateMemberRole({ id_user, id_project }, req.body); //actualizeaza rolul
      res.json(updated); //daca e ok afiseaza json cu noile date ale membrului
    } catch (error) { 
      res.status(400).json({ error: error.message }); //400 BAD REQUEST in caz de eroare
    }
  }

  // Eliminare membru. Necesita PM (EXACT ACELASI PROCES CA MAI SUS)
  async removeMember(req, res) {
    try {
      const { id_user, id_project } = req.params;
      const currentUserId = req.user.id_user; 

      // 1. Verificare: Este utilizatorul care face cererea PM?
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project); //verifica daca e
      if (!isPm) {
        return res.status(403).json({ error: 'Forbidden: Only Project Managers can remove members.' }); //403 FORBIDDEN daca nu e pM
      }

      // 2. Daca este PM, continua
      await projectMemberService.removeMember({ id_user, id_project }); //il sterge
      res.status(204).send(); //daca e ok afiseaza json
    } catch (error) {
      res.status(400).json({ error: error.message }); //daca apare ceva eroare 400 BAD REQUEST
    }
  }
}