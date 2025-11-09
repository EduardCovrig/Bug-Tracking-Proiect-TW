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

  async getProjectById(id_project) {
    const project = await this.projectRepository.findById(id_project);
    if (!project) throw new Error('Project not found'); //daca nu s-a gasit acel id in baza de date, eroare
    return project; //altfel, returneaza proiectul 
  }

  async updateProject(id_project, data) {
    await this.getProjectById(id_project); //functia va ridica o eroare daca nu il gaseste.
    return this.projectRepository.update(id_project, data);
  }

  async deleteProject(id_project) {
    await this.getProjectById(id_project); //daca nu il gaseste, se ridica eroare
    return this.projectRepository.delete(id_project); //daca il gaseste, se apeleaza functia de strere din baza de date
  }
}
