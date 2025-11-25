import prisma from '../../database/prismaClient.js'; //importa baza de date

export class ProjectRepository {
  async create(data) { //creeaza un proiect nou in baza de date
    return prisma.project.create({ data });
  }

  async findAll() { //ia toate proiectele din baza de date, incluzand si metodele de acces catre foreign key-uri
    return prisma.project.findMany({
      include: {
        createdBy: true,
        bugs: true,
        members: true
      }
    });
  }

  async findById(id_project) { //gaseste un proiect dupa id_project
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
    return project ? project.created_by : null; //daca nu il gaseste, null
  }

  async update(id_project, data) { //actualizeaza un proiect dupa id_project
    return prisma.project.update({
      where: { id_project },
      data
    });
  }

  async delete(id_project) { //sterge un proiect dupa id_project
    return prisma.project.delete({
      where: { id_project }
    });
  }
}