import { UserRepository } from '../repositories/userRepository.js';

import bcrypt from "bcrypt";



export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    //scurta verificare, daca emailul e deja in baza de date => eroare
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    //incriptarea parolei cu un hash de 10.
    return this.userRepository.create({
      username: data.username,
      email: data.email,
      password: hashedPassword
    });
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id_user) {
    const user = await this.userRepository.findById(id_user); //cauta utilizator cu id-ul respectiv
    if (!user) throw new Error('User not found'); // nu gaseste, ridica eroare
    return user; //gaseste, returneaza
  }

  async updateUser(id_user, data) {
    await this.getUserById(id_user); //cautam un utilizator cu acel id, daca nu se da eroare (cum se vede in functia de mai sus)
    if (data.password) { //daca exista o parola in body
      data.password = await bcrypt.hash(data.password, 10); // o incrpitam
    }

    return await this.userRepository.update(id_user, data); //returnam noul utilizator udpatat

  }

  async deleteUser(id_user) {
    await this.getUserById(id_user); //aici se ridica eroare daca nu il gaseste
    return await this.userRepository.delete(id_user); //daca il gaseste, apeleaza functia de stergere din baza de date
  }
}
