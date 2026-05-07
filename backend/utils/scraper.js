import axios from 'axios';
import * as cheerio from 'cheerio';
import Story from '../models/Story.js';

const scrapeHackerNews = async () => {
  try {
    const { data } = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(data);
    const stories = [];

    $('.athing').slice(0, 10).each((index, element) => {
      const id = $(element).attr('id');
      const titleElement = $(element).find('.titleline > a').first();
      const title = titleElement.text();
      const url = titleElement.attr('href');

      const subtextRow = $(element).next();
      const pointsText = subtextRow.find('.score').text();
      const points = parseInt(pointsText) || 0;
      const author = subtextRow.find('.hnuser').text();
      const postedAt = subtextRow.find('.age').attr('title');

      stories.push({
        hnId: id,
        title,
        url,
        points,
        author,
        postedAt,
      });
    });

    for (const story of stories) {
      // Find by title or URL to prevent duplicates if HN ID isn't used
      // We can also add hnId to the model if we wanted to be strict,
      // but let's just use url as unique identifier for now
      const existingStory = await Story.findOne({ title: story.title });
      if (existingStory) {
        existingStory.points = story.points;
        await existingStory.save();
      } else {
        await Story.create(story);
      }
    }

    console.log('Successfully scraped top 10 HN stories.');
    return stories;
  } catch (error) {
    console.error('Error scraping HN:', error.message);
  }
};

export default scrapeHackerNews;
