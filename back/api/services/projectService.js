import { ProjectRepository } from '../repositories/projectRepository.js';

export class ProjectService {
  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async createProject(data) {
    return this.projectRepository.create(data);
  }

  async getAllProjects() {
    return this.projectRepository.findAll();
  }
  
  // Preluare ID-ul creatorului proiectului
  async getProjectCreatorId(id_project) {
    const creatorId = await this.projectRepository.findCreatorId(id_project);
    if (!creatorId) throw new Error('Project not found');
    return creatorId;
  }

  async getProjectById(id_project) {
    const project = await this.projectRepository.findById(id_project);
    if (!project) throw new Error('Project not found'); // daca nu s-a gasit acel id in baza de date, eroare
    return project; // altfel, returneaza proiectul 
  }

  async updateProject(id_project, data) {
    // verificarea existentei o face getProjectCreatorId
    return this.projectRepository.update(id_project, data);
  }

  async deleteProject(id_project) {
    // la fel si aici
    return this.projectRepository.delete(id_project); 
  }
}