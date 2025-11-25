import { BugRepository } from '../repositories/bugRepository.js'; //importa repostiory pentru a accesa metode legate de accesul la baza
// de date

export class BugService {
  constructor() {
    this.bugRepository = new BugRepository(); //cream instanta pentru repository pt a-l folosi mai jos in metode.
  }

  async createBug(data) { //creaza un bug nou
    return this.bugRepository.create(data);
  }

  async getAllBugs() { //ia toate bugurile
    return this.bugRepository.findAll();
  }
  
  //Filtreaza dupa cel care a raportat
  async getBugsReportedBy(reported_by) {
    return this.bugRepository.findByReportedBy(reported_by);
  }

  // Filtreaza dupa cel caruia i-a fost alcat
  async getBugsAssignedTo(assigned_to) {
    return this.bugRepository.findByAssignedTo(assigned_to);
  }

  async getBugById(id_bug) { //gaseste bug dupa id
    const bug = await this.bugRepository.findById(id_bug);
    if (!bug) throw new Error('Bug not found');
    return bug;
  }
  
  // Preluare detalii necesare pentru autorizare
  async getReportDetails(id_bug) {
      const details = await this.bugRepository.findReportDetails(id_bug);
      if (!details) throw new Error('Bug not found');
      return details;
  }

  async updateBug(id_bug, data) { //actualizeaza bug dupa id
    await this.getBugById(id_bug); // Verifica existenta
    return this.bugRepository.update(id_bug, data);
  }

  async deleteBug(id_bug) { //sterge bug dupa id
    await this.getBugById(id_bug); // Verifica existenta
    return this.bugRepository.delete(id_bug);
  }
}