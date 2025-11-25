import { ProjectMemberRepository } from '../repositories/projectMemberRepository.js';
// repository importat pentru a putea interactiona cu baza de date

export class ProjectMemberService {
  constructor() {
    this.projectMemberRepository = new ProjectMemberRepository(); //facem instanta noua de repo
  }

  async addMember(data) {
    return this.projectMemberRepository.create(data); //apelam metoda de creare din repostriory
  }

  async getMembersByProject(id_project) {
    return this.projectMemberRepository.findByProject(id_project); //ia toti mebrii din proiect, dupa un id_project
  }
  
  // Preluare toate proiectele la care participa un utilizator
  async getProjectsByUserId(id_user) {
    return this.projectMemberRepository.findByUser(id_user);
  }

  async getMember({ id_user, id_project }) { //ia un membru dupa id_user si id_project
    const member = await this.projectMemberRepository.findUnique(id_user, id_project);  //await pentru ca aici trebuie sa gestionam promisiunea,
    //mai sus, returnam direct promisiunea mai departe catre controller.
    if (!member) throw new Error('Project member not found');
    return member;
  }
  
  // Preluarea rol 
  async getRole(id_user, id_project) { //returneaza rolul unui membru
    return this.projectMemberRepository.findRole(id_user, id_project);
  }
  
  // Verificare rapida daca utilizatorul e PM
  async isProjectManager(id_user, id_project) {
    const role = await this.getRole(id_user, id_project);
    return role === 'PM';
  }

  async updateMemberRole({ id_user, id_project }, data) { //actualizeaza rolul unui membru
    await this.getMember({ id_user, id_project }); 
    return this.projectMemberRepository.update(id_user, id_project, data);
  }

  async removeMember({ id_user, id_project }) { //sterge un membru dintr-un proiect
    await this.getMember({ id_user, id_project }); 
    return this.projectMemberRepository.delete(id_user, id_project);
  }
}