import express from 'express';
import userRoutes from './api/routes/userRoutes.js';
import projectRoutes from './api/routes/projectRoutes.js';
import bugRoutes from './api/routes/bugRoutes.js';
import projectMemberRoutes from './api/routes/projectMemberRoutes.js';
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from './api/routes/authRoutes.js'; // AUTENTIFICARE

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/auth', authRoutes); //RUTA DE AUTENTIFICARE 


//RUTE PROTEJATE - necesita token
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/bugs', bugRoutes); 
app.use('/members', projectMemberRoutes); 

const PORT = process.env.PORT || 3000; //ia port-ul din .env creat sau default 3000

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
