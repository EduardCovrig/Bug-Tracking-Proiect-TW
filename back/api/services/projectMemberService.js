import { ProjectMemberRepository } from '../repositories/projectMemberRepository.js';

export class ProjectMemberService {
  constructor() {
    this.projectMemberRepository = new ProjectMemberRepository();
  }

  async addMember(data) {
    return this.projectMemberRepository.create(data);
  }

  async getMembersByProject(id_project) {
    return this.projectMemberRepository.findByProject(id_project);
  }
  
  // Preluare toate proiectele la care participa un utilizator
  async getProjectsByUserId(id_user) {
    return this.projectMemberRepository.findByUser(id_user);
  }

  async getMember({ id_user, id_project }) {
    const member = await this.projectMemberRepository.findUnique(id_user, id_project);
    if (!member) throw new Error('Project member not found');
    return member;
  }
  
  // Preluarea rol 
  async getRole(id_user, id_project) {
    return this.projectMemberRepository.findRole(id_user, id_project);
  }
  
  // Verificare rapida daca utilizatorul e PM
  async isProjectManager(id_user, id_project) {
    const role = await this.getRole(id_user, id_project);
    return role === 'PM';
  }

  async updateMemberRole({ id_user, id_project }, data) {
    await this.getMember({ id_user, id_project }); 
    return this.projectMemberRepository.update(id_user, id_project, data);
  }

  async removeMember({ id_user, id_project }) {
    await this.getMember({ id_user, id_project }); 
    return this.projectMemberRepository.delete(id_user, id_project);
  }
}