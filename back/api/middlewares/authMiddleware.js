import jwt from 'jsonwebtoken'; //pt token JWT
import 'dotenv/config'; //pt a citi cheia secreta din .env

const JWT_SECRET = process.env.JWT_SECRET; // o citeste

export const authMiddleware = (req, res, next) => {
  // Tokenul este trimis pe rute sub forma: Authorization: Bearer <token> (in headers)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) { //daca nu respecta forma
    return res.status(401).json({ error: 'Access denied. No token provided.' }); //eroare
  }

  // extrage tokeul fara bearer
  const token = authHeader.split(' ')[1]; //separa dupa spatii, si ia al doilea termen, adica fix tokenul.

  try {
    // verifica validitatea tokenului primit si decodeaza datele
    const decoded = jwt.verify(token, JWT_SECRET);

    //pune dele utilizatorului in obiectul request
    //astfel, controlerul stie face cererea (req.user.id_user)
    req.user = decoded; 

    // trece mai departe din service la controller
    next();
  } catch (ex) {
    //pt orice exceptie: 
    res.status(401).json({ error: 'Invalid token.' });
  }
};