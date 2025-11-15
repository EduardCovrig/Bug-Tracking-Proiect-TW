
import { UserRepository } from '../repositories/userRepository.js';
import bcrypt from "bcrypt";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  
  // RUTA DE CREARE A FOST MUTATA ÎN AUTHSERVICE

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id_user) {
    const user = await this.userRepository.findById(id_user);
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateUser(id_user, data) {
    await this.getUserById(id_user); 

    // Re-hashing parola daca este actualizata
    if (data.password) { 
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.userRepository.update(id_user, data);
  }

  async deleteUser(id_user) {
    await this.getUserById(id_user); 
    return await this.userRepository.delete(id_user);
  }
}