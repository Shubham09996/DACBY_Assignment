import Story from '../models/Story.js';
import User from '../models/User.js';
import scrapeHackerNews from '../utils/scraper.js';

// @desc    Trigger scraper
// @route   POST /api/scrape
// @access  Public
export const triggerScrape = async (req, res) => {
  try {
    await scrapeHackerNews();
    res.json({ message: 'Scraping completed' });
  } catch (error) {
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
};

// @desc    Fetch all stories
// @route   GET /api/stories
// @access  Public
export const getStories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await Story.find({})
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch a single story
// @route   GET /api/stories/:id
// @access  Public
export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (story) {
      res.json(story);
    } else {
      res.status(404).json({ message: 'Story not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle bookmark
// @route   POST /api/stories/:id/bookmark
// @access  Private
export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const storyId = req.params.id;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isBookmarked = user.bookmarkedStories.includes(storyId);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarkedStories = user.bookmarkedStories.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      // Add bookmark
      user.bookmarkedStories.push(storyId);
    }

    await user.save();
    res.json({ message: isBookmarked ? 'Bookmark removed' : 'Bookmark added', bookmarkedStories: user.bookmarkedStories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
