import prisma from '../../database/prismaClient.js';

export class UserRepository {
  async create(data) {
    return await prisma.user.create({ data });
  }

   //folosit pentru criptarea parolei, in controller la adaugare utilizator.
   async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }
  async findAll() {
    return await prisma.user.findMany({
      include: {
        createdProjects: true,
        reportedBugs: true,
        assignedBugs: true,
        projectMemberships: true,
      },
    });
  }

  async findById(id_user) {
    return await prisma.user.findUnique({
      where: { id_user },
      include: {
        createdProjects: true,
        reportedBugs: true,
        assignedBugs: true,
        projectMemberships: true,
      },
    });
  }

  async update(id_user, data) {
    return await prisma.user.update({
      where: { id_user },
      data,
    });
  }

  async delete(id_user) {
    return await prisma.user.delete({
      where: { id_user },
    });
  }
}
