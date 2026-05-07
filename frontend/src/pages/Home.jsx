import { useState, useEffect } from 'react';
import StoryCard from '../components/StoryCard';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories');
        const data = await res.json();
        if (Array.isArray(data)) {
          setStories(data);
        } else {
          console.error('Unexpected API response:', data);
          setStories([]);
        }
      } catch (error) {
        console.error('Failed to fetch stories', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Real-time scraped from Hacker News
        </div>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-600 tracking-tight mb-4">
          Top Hacker News Stories
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          A beautifully designed, blazing-fast dashboard for what the tech world is talking about right now. Bookmark stories, search instantly, and never miss a beat.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
