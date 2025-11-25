
import { UserRepository } from '../repositories/userRepository.js'; //importam si facem instanta de repostiory pentru a avea acces la metodele
//din baza de date pentru user
import bcrypt from "bcrypt"; //pentru criptare si decriptare

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  
  // RUTA DE CREARE A FOST MUTATA IN AUTHSERVICE

  async getAllUsers() { //returneaza toti utilizatorii
    return await this.userRepository.findAll();
  }

  async getUserById(id_user) { //ia un utilizator dupa id
    const user = await this.userRepository.findById(id_user); //gestionam cazul in care id-ul e dat gresit, nu exista acel user.
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateUser(id_user, data) { //actualizeaza un utilizator dupa id
    await this.getUserById(id_user);  //daca nu exista, se arunca eroare (codul e cu 3 linii mai sus!, altfel continuam)

    // Re-hashing parola daca este actualizata (daca s-a dat password ca argument in data, altfel se trece peste)
    if (data.password) { 
      data.password = await bcrypt.hash(data.password, 10); //10 salt rounds, folosite peste tot in proiect la logare
    }

    return await this.userRepository.update(id_user, data);
  }

  async deleteUser(id_user) { //sterge un utilizator dupa id
    await this.getUserById(id_user);  //daca nu exista, se arunca eroare (codul e cu vreo 12 linii mai sus!, altfel continuam)
    return await this.userRepository.delete(id_user);
  }
}