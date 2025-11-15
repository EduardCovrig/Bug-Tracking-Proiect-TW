import { AuthService } from '../services/authService.js';

const authService = new AuthService();

export class AuthController {
  
  async register(req, res) {
    try {
      const newUser = await authService.register(req.body);
      const { password, ...userWithoutPassword } = newUser; 
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: error.message }); 
    }
  }
}