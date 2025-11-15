import prisma from '../../database/prismaClient.js';

export class ProjectRepository {
  async create(data) {
    return prisma.project.create({ data });
  }

  async findAll() {
    return prisma.project.findMany({
      include: {
        createdBy: true,
        bugs: true,
        members: true
      }
    });
  }

  async findById(id_project) {
    return prisma.project.findUnique({
      where: { id_project },
      include: {
        createdBy: true,
        bugs: true,
        members: true
      }
    });
  }
  
  //Returneaza doar ID-ul creatorului pentru verificarea de autorizare
  async findCreatorId(id_project) {
    const project = await prisma.project.findUnique({
      where: { id_project },
      select: { created_by: true }
    });
    return project ? project.created_by : null;
  }

  async update(id_project, data) {
    return prisma.project.update({
      where: { id_project },
      data
    });
  }

  async delete(id_project) {
    return prisma.project.delete({
      where: { id_project }
    });
  }
}