import express from 'express';
import userRoutes from './api/routes/userRoutes.js';
import projectRoutes from './api/routes/projectRoutes.js';

/* TO ADD
import bugRoutes from './api/routes/bugRoutes.js';
import projectMemberRoutes from './api/routes/projectMemberRoutes.js';
*/

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
/*TO ADD
app.use('/bugs', bugRoutes);
app.use('/members', projectMemberRoutes);
*/

//mai e de adaugat ruta de logare, mai tarziu.


app.listen(3000, () => console.log('Server is now running on port 3000'));
