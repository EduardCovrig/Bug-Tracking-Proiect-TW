import { AuthService } from '../services/authService.js'; //importam service-ul de autentificare

const authService = new AuthService(); //facem insanta pt a accesa metodele din service

export class AuthController {
  
  //METODA INTREGISTRARE UTILIZATOR NOU
  async register(req, res) { 
    try {
      const newUser = await authService.register(req.body);
      const { password, ...userWithoutPassword } = newUser; //password e o variabila proprie, restul in obiectul userWithoutPassword.[camp]
      res.status(201).json(userWithoutPassword); //returnam tot inafara de parola ca json cu statusul 201 CREATED
    } catch (error) {
      res.status(400).json({ error: error.message }); // returnam status 400 BAD REQUEST cu codul erorii
    }
  }

  //METODA LOGARE UTILIZATOR EXISTENT
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json(result); //returnam rezultatul logarii cu statusul 200 OK
    } catch (error) {
      res.status(401).json({ error: error.message }); //in caz de eroare, 400 BAD REQUEST cu codul erorii
    }
  }
}