import prisma from '../../database/prismaClient.js'; //importa baza de date

export class ProjectMemberRepository { 
  async create(data) { //metoda pentru a crea un membru nou in baza de date
    return prisma.projectMember.create({ data });
  }

  async findByProject(id_project) { //gaseste toti membrii unui proiect dupa id_project
    return prisma.projectMember.findMany({
      where: { id_project },
      include: {
        user: true,
      }
    });
  }

  // Preluarea membrilor unui proiect dupa id_user
  async findByUser(id_user) {
    return prisma.projectMember.findMany({
        where: { id_user },
        include: {
            project: true, // Include detaliile proiectului
        }
    });
  }

  async findUnique(id_user, id_project) { //gaseste un membru dupa id_user si id_project
    return prisma.projectMember.findUnique({
      where: {
        id_user_id_project: {
          id_user,
          id_project,
        }
      },
      include: {
        user: true,
        project: true
      }
    });
  }
  
  // preluare doar a rolului
  async findRole(id_user, id_project) {
    const member = await prisma.projectMember.findUnique({
      where: {
        id_user_id_project: {
          id_user,
          id_project,
        }
      },
      select: {
        role: true // returneaza doar campul role
      }
    });
    return member ? member.role : null; //daca nu se gaseste, null
  }

  async update(id_user, id_project, data) { //metoda pentru actualizare a unui membru dupa id_user si id_project
    return prisma.projectMember.update({
      where: {
        id_user_id_project: {
          id_user,
          id_project,
        }
      },
      data
    });
  }

  async delete(id_user, id_project) { //sterge un membru dupa id_user si id_project
    return prisma.projectMember.delete({
      where: {
        id_user_id_project: {
          id_user,
          id_project,
        }
      }
    });
  }
}