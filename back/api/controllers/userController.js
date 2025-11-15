import { UserService } from '../services/userService.js';

const userService = new UserService();

export class UserController {

  // RUTA DE CREARE A FOST MUTATA ÎN AUTHCONTROLLER

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const targetId = req.params.id; 
      const currentUserId = req.user.id_user; // ID-ul din token (utilizatorul logat)

      // Autorizare: Utilizatorul poate vedea doar propriul profil
      if (targetId !== currentUserId) {
         return res.status(403).json({ error: 'Forbidden: You can only view your own profile.' });
      }

      const user = await userService.getUserById(targetId);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const targetId = req.params.id; 
      const currentUserId = req.user.id_user; 

      // Autorizare: Utilizatorul poate modifica doar propriul profil
      if (targetId !== currentUserId) {
        return res.status(403).json({ error: 'Forbidden: You can only update your own profile.' });
      }
      
      const updated = await userService.updateUser(targetId, req.body);
      // Nu trimite parola hashuitA inapoi
      const { password, ...userWithoutPassword } = updated; 
      res.json(userWithoutPassword);
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const targetId = req.params.id; 
      const currentUserId = req.user.id_user; 

      // Autorizare: Utilizatorul poate sterge doar propriul cont
      if (targetId !== currentUserId) {
        return res.status(403).json({ error: 'Forbidden: You can only delete your own account.' });
      }
      
      await userService.deleteUser(targetId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}