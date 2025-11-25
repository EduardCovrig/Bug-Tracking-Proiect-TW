import { UserService } from '../services/userService.js'; //importam service-ul pentru user

const userService = new UserService(); //facem instanta

export class UserController {

  // RUTA DE CREARE A FOST MUTATA ÎN AUTHCONTROLLER

  async getAllUsers(req, res) { //ia toti userii 
    try {
      const users = await userService.getAllUsers(); //incearca sa ii ia
      res.json(users); //daca reuseste ii returnaza ca json
    } catch (error) {
      res.status(500).json({ error: error.message }); //daca apare ceva, 500 SERVER ERROR cu eroarea
    }
  }

  async getUserById(req, res) { //cauta un user dupa id
    try {
      const targetId = req.params.id;  //id-ul cautat
      const currentUserId = req.user.id_user; // ID-ul din token (utilizatorul logat)

      // Autorizare: Utilizatorul poate vedea doar propriul profil
      if (targetId !== currentUserId) {
         return res.status(403).json({ error: 'Forbidden: You can only view your own profile.' }); //403 FORBIDDEN daca incearca altceva
      }

      const user = await userService.getUserById(targetId); //ia userul daca totul a mers ok pana aici
      res.json(user); //il returneaza
    } catch (error) {
      res.status(404).json({ error: error.message }); //404 NOT FOUND daca apare ceva
    }
  }

  async updateUser(req, res) {//actualizeaza un user dupa id
    try {
      const targetId = req.params.id;  //id-ul dorit de actualizare
      const currentUserId = req.user.id_user;  //id-ul logat

      // Autorizare: Utilizatorul poate modifica doar propriul profil
      if (targetId !== currentUserId) { //daca nu corespund cererii
        return res.status(403).json({ error: 'Forbidden: You can only update your own profile.' }); //403 FORBIDDEN daca incearca altceva
      }
      
      const updated = await userService.updateUser(targetId, req.body); //daca totul e ok, face update-ul
      // Nu trimite parola hashuitA inapoi
      const { password, ...userWithoutPassword } = updated;  //separa parola de restul datelor
      res.json(userWithoutPassword); //returneaza datele fara parola ca json
      
    } catch (error) {
      res.status(400).json({ error: error.message }); //daca apare ceva 400 BAD REQUEST cu eroarea
    }
  }

  async deleteUser(req, res) { //stergerea unui user dupa id (EXACT ACEASI LOGICA CA LA UPDATE)
    try {
      const targetId = req.params.id;  //id-ul dorit
      const currentUserId = req.user.id_user; //id-ul logat (de la care vine cererea)

      // Autorizare: Utilizatorul poate sterge doar propriul cont
      if (targetId !== currentUserId) {
        return res.status(403).json({ error: 'Forbidden: You can only delete your own account.' }); //403 FORBIDDEN daca incearca altceva
      }
      
      await userService.deleteUser(targetId); //face stergerea efectiva daca totul a mers ok pana aici
      res.status(204).send(); //204 NO CONTENT pentru ca s-a sters cu succes
    } catch (error) {
      res.status(400).json({ error: error.message }); //400 BAD REQUEST cu eroarea daca apare ceva
    }
  }
}