import express from 'express';
import {
  triggerScrape,
  getStories,
  getStoryById,
  toggleBookmark,
} from '../controllers/storyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/scrape', triggerScrape);
router.get('/', getStories);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', protect, toggleBookmark);

export default router;
