
import { BugService } from '../services/bugService.js'; // importam bugservice cu toate metodele necesare pentru buguri
import { ProjectMemberService } from '../services/projectMemberService.js'; // Import pentru verificare PM

const bugService = new BugService(); //facem instanta
const projectMemberService = new ProjectMemberService(); //facem instanta

export class BugController {
  async createBug(req, res) { //creare bug nou
    try {
        const reported_by = req.user.id_user; // ID-ul utilizatorului logat
        const bugData = { 
            ...req.body, //tot ce e in body-ul requestului
            reported_by: reported_by, //la care adaugam si reorted_by
          };
      const bug = await bugService.createBug(bugData); //daca nu gaseste => catch
      res.status(201).json(bug); //201 CREATED si date despre bug
    } catch (error) {
      res.status(400).json({ error: error.message }); //400 BAD REQUEST cu eroarea
    }
  }

  async getAllBugs(req, res) { //ia toate bugurile
    try {
      const bugs = await bugService.getAllBugs(); //daca e ceva eroare, ma baga pe catch
      res.json(bugs); //le trimite
    } catch (error) {
      res.status(500).json({ error: error.message }); //500 SERVER ERROR cu eroarea
    }
  }
  
  // Preluarea bug-urilor raportate de userul curent
  async getMyReportedBugs(req, res) {
    try {
      const reported_by = req.user.id_user;
      const bugs = await bugService.getBugsReportedBy(reported_by); //daca nu gaseste, ma baga pe catch
      res.json(bugs); //le returneaza
    } catch (error) {
      res.status(500).json({ error: error.message }); //500 SERVER ERROR 
    }
  }

  //  bugurile userului curent
  async getMyAssignedBugs(req, res) {
    try {
      const assigned_to = req.user.id_user;
      const bugs = await bugService.getBugsAssignedTo(assigned_to); // in caz de eroare => catch
      res.json(bugs); //le returneaza
    } catch (error) {
      res.status(500).json({ error: error.message }); //500 SERVER ERROR
    }
  }

  async getBugById(req, res) { //cauta bug dupa id
    try {
      const bug = await bugService.getBugById(req.params.id); //cauta, daca nu gaseste ma baga pe catch
      res.json(bug); // returneaza bug-ul
    } catch (error) {
      res.status(404).json({ error: error.message }); //404 NOT FOUND 
    }
  }

  async updateBug(req, res) { //actualizeaza un bug dupa id
    try {
      const id_bug = req.params.id; //id-ul bug-ului din parametrii requestului
      const currentUserId = req.user.id_user; //id-ul userului curent logat
      
      // 1. Preluare detalii pentru autorizare (reported_by si id_project)
      const { reported_by, id_project } = await bugService.getReportDetails(id_bug); 
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project); //verifica daca e pm proiectului

      // 2. AUTORIZARE: Doar reporterul bugu-ului sau un PM al proiectului pot modifica
      if (reported_by !== currentUserId && !isPm) {
        return res.status(403).json({ error: 'Forbidden: Only the reporter or a Project Manager can update this bug.' });
        //403 FORBIDDEN cu mesajul (accesul nu e permis)
      }

      const updated = await bugService.updateBug(id_bug, req.body); //actualizeaza daca a ajuns pana aici
      res.json(updated); //returneaza json cu obiectul actualizat
    } catch (error) {
      res.status(400).json({ error: error.message }); //400 BAD REQUEST daca apare altceva
    }
  }

  async deleteBug(req, res) { //exact aceasi logica ca la delete
    try {
      const id_bug = req.params.id;
      const currentUserId = req.user.id_user;
      
      // 1. Preluare detalii pentru autorizare
      const { reported_by, id_project } = await bugService.getReportDetails(id_bug);
      const isPm = await projectMemberService.isProjectManager(currentUserId, id_project);

      // 2. AUTORIZARE: Doar reporterul sau un PM al proiectului pot sterge
      if (reported_by !== currentUserId && !isPm) {
        return res.status(403).json({ error: 'Forbidden: Only the reporter or a Project Manager can delete this bug.' });
      }

      await bugService.deleteBug(id_bug);
      res.status(204).send(); //204 NO CONTENT pentru ca s-a sters cu succes
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}