import jwt from 'jsonwebtoken';
import 'dotenv/config'; //pt a citi cheia secreta din .env

const JWT_SECRET = process.env.JWT_SECRET; // o citeste

export const authMiddleware = (req, res, next) => {
  // Tokenul este trimis de obicei sub forma: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) { //daca nu respecta forma
    return res.status(401).json({ error: 'Access denied. No token provided.' }); //eroare
  }

  // extrage tokeul fara bearer
  const token = authHeader.split(' ')[1];

  try {
    // verifica validitatea tokenului primat si decodeaza
    const decoded = jwt.verify(token, JWT_SECRET);

    //pune dele utilizatorului in obiectul request
    //astfel, controlerul stie face cererea (req.user.id_user)
    req.user = decoded; 

    // trece mai departe la controller
    next();
  } catch (ex) {
    //pt orice exceptie: 
    res.status(401).json({ error: 'Invalid token.' });
  }
};