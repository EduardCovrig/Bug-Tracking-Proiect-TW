import prisma from '../../database/prismaClient.js'; //importa baza de date

export class BugRepository { 
  async create(data) { //metoda pentru a crea un bug nou in baza de date
    return prisma.bug.create({ data });
  }

  async findAll() { //metoda pentru a lua toate bugurile din baza de date, incluzand si metoda de acces catre foreign key-uri
    return prisma.bug.findMany({
      include: {
        project: true,
        reporter: true,
        assignee: true,
      }
    });
  }
  
  // Filtreaza dupa cel care a raportat
  async findByReportedBy(reported_by) {
    return prisma.bug.findMany({
      where: { reported_by },
      include: { project: true, assignee: true, reporter: true }
    });
  }

//iltreaza dupa cel caruia i-a fost alocat
  async findByAssignedTo(assigned_to) {
    return prisma.bug.findMany({
      where: { assigned_to },
      include: { project: true, assignee: true, reporter: true }
    });
  }

  // gasire bug dupa id
  async findById(id_bug) {
    return prisma.bug.findUnique({
      where: { id_bug },
      include: {
        project: true,
        reporter: true,
        assignee: true,
      }
    });
  }
  
 //Preluare detalii necesare pentru autorizare
  async findReportDetails(id_bug) {
      return prisma.bug.findUnique({
          where: { id_bug },
          select: { reported_by: true, id_project: true }
      });
  }

  //actualizeaza un bug dupa id
  async update(id_bug, data) {
    return prisma.bug.update({
      where: { id_bug },
      data
    });
  }

  //sterge un bug
  async delete(id_bug) {
    return prisma.bug.delete({
      where: { id_bug }
    });
  }
}