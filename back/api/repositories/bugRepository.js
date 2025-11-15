import prisma from '../../database/prismaClient.js';

export class BugRepository {
  async create(data) {
    return prisma.bug.create({ data });
  }

  async findAll() {
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

  async update(id_bug, data) {
    return prisma.bug.update({
      where: { id_bug },
      data
    });
  }

  async delete(id_bug) {
    return prisma.bug.delete({
      where: { id_bug }
    });
  }
}