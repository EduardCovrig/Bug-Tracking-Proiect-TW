import bcrypt from 'bcrypt'; //pentru criptare/ decriptare parola
import jwt from 'jsonwebtoken'; //JWT pentru token
import { UserRepository } from '../repositories/userRepository.js'; //importa metodele pentru a folosi baza de date
import 'dotenv/config'; // Pentru a citi cheia secreta din .env

const userRepository = new UserRepository(); //facem instanta noua pt repository
const JWT_SECRET = process.env.JWT_SECRET //ia cheia jwt din .env

export class AuthService {

  // METODA PENTRU INREGISTRARE UTILIZATOR NOU
  async register(data) { 
    const { username, email, password } = data;

    //verifica daca exista deja in baza de date
    const existingUser = await userRepository.findByEmail(email); //preia din baza de date
    if (existingUser) { //daca a gasit
      throw new Error('User with this email already exists.'); //eroare
    }

    //daca nu a gasit, trecem mai departe

    // criptare parola
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //adaugare utilizator in baza de date, cu parola criptata
    return userRepository.create({
      username,
      email,
      password: hashedPassword, //parola criptata
    });
  }

  // METODA PENTRU LOGARE UTILIZATOR EXISTENT
  async login(email, password) {
    
    //cauta utilizatorul dupa email
    const user = await userRepository.findByEmail(email); //cauta in baza de date
    if (!user) { //daca nu gaseste, arunca eroare
      throw new Error('Invalid credentials.');
    }

    //daca il gaseste, comapra paroal introdusa cu cea criptata din baza de date
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) { //daca nu e corecta, arunca eroare
      throw new Error('Invalid credentials.');
    }

    // GENERARE JWT
    const token = jwt.sign(
      { id_user: user.id_user, email: user.email },
      JWT_SECRET,
      { expiresIn: '12h' } //tokenul expira dupa 12 ore.
    );

    //daca totul merge ok, returneaza tokenul si datele utilizatorului.
    return { token, user: { id_user: user.id_user, username: user.username, email: user.email } };
  }
}