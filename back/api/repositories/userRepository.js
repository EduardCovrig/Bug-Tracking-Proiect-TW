import prisma from '../../database/prismaClient.js'; //importa baza de date

export class UserRepository {
  async create(data) { //creeaza un utilizator nou in baza de date
    return await prisma.user.create({ data });
  }

   //folosit pentru criptarea parolei, in controller la adaugare utilizator.
   async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }
  async findAll() { //ia toti utilizatorii din baza de date, cu tot cu metodele de acces catre foreign key-uri
    return await prisma.user.findMany({
      include: {
        createdProjects: true,
        reportedBugs: true,
        assignedBugs: true,
        projectMemberships: true,
      },
    });
  }

  async findById(id_user) { //gaseste un utilizator dupa id_user, cu tot cu metodele de acces catre foreign key-uri
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

  async update(id_user, data) { //actualizeaza un user dupa id_user
    return await prisma.user.update({
      where: { id_user },
      data,
    });
  }

  async delete(id_user) { //sterge un user dupa id_user
    return await prisma.user.delete({
      where: { id_user },
    });
  }
}
