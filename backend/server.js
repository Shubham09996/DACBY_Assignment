import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import scrapeHackerNews from './utils/scraper.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: '*', // Allow all origins for the assignment
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);

app.post('/api/scrape', async (req, res) => {
  await scrapeHackerNews();
  res.send('Scraping triggered manually via server.js route');
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  // Run scraper automatically on server start
  await scrapeHackerNews();
});
