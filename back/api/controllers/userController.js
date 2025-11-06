import express from 'express';
import userService from '../services/userService.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUser(Number(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(404).json({ "error": err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ "error": err.message });
  }
});

export default router;
