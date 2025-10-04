import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import produtcsRoutes from '../src/routes/products.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/products', produtcsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
