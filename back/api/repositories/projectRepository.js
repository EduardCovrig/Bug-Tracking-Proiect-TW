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
