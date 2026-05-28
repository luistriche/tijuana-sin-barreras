import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './config/db';
import barrierRoutes from './routes/barriers';
import routingRoutes from './routes/routing';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'https://tijuana-sin-barreras.vercel.app',
    'https://tijuana-sin-barreras-1muwo8q3i-luistriches-projects.vercel.app',
  ],
}));
app.use(express.json());

app.use('/api/barriers', barrierRoutes);
app.use('/api/route', routingRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
