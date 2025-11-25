import { ProjectRepository } from '../repositories/projectRepository.js'; //repo pentru a avea acces la baza de date.

export class ProjectService {
  constructor() {
    this.projectRepository = new ProjectRepository(); //facem instantan noua.
  }

  async createProject(data) { //creeaza proiect nou
    return this.projectRepository.create(data); 
  }

  async getAllProjects() { //ia toate proiectele
    return this.projectRepository.findAll();
  }
  
  // Preluare ID-ul creatorului proiectului
  async getProjectCreatorId(id_project) {
    const creatorId = await this.projectRepository.findCreatorId(id_project); //facem await pentru ca aici trebuie sa gestionam promisiunea
    if (!creatorId) throw new Error('Project not found');
    return creatorId;
  }

  async getProjectById(id_project) {
    const project = await this.projectRepository.findById(id_project);
    if (!project) throw new Error('Project not found'); // daca nu s-a gasit acel id in baza de date, eroare
    return project; // altfel, returneaza proiectul 
  }

  async updateProject(id_project, data) { //actualizeza proiect dupa id_project
    // verificarea existentei o face getProjectCreatorId
    return this.projectRepository.update(id_project, data);
  }

  async deleteProject(id_project) { //sterge proiect dupa id_project
    // la fel si aici
    return this.projectRepository.delete(id_project); 
  }
}