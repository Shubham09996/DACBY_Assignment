import { useState, useEffect } from 'react';
import { fetchStoriesApi } from '../api';
import StoryCard from '../components/StoryCard';
import { Activity, Search } from 'lucide-react';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetchStoriesApi();
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setStories(data);
        } else if (data && data.stories && Array.isArray(data.stories)) {
          setStories(data.stories);
        } else {
          setStories([]);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const filteredStories = stories.filter(story => {
    const query = searchQuery.toLowerCase();
    return (
      story.title?.toLowerCase().includes(query) ||
      story.author?.toLowerCase().includes(query) ||
      story.url?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      
      {/* Hero Section */}
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 mb-8">
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          Real-time scraped from Hacker News
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#e2e8f0] tracking-tight mb-6">
          Top Hacker News Stories
        </h1>
        <p className="text-base md:text-lg text-slate-400 font-normal leading-relaxed mb-12">
          A beautifully designed, blazing-fast dashboard for what the tech world is talking about right now. Bookmark stories, search instantly, and never miss a beat.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 bg-[#111827] border border-white/5 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:border-white/10 focus:ring-1 focus:ring-white/10 transition-colors sm:text-sm"
            placeholder="Search by title, author, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!loading && (
        <div className="mb-6 text-sm text-slate-400">
          Showing <span className="font-semibold text-white">{filteredStories.length}</span> of <span className="font-semibold text-white">{stories.length}</span> stories
        </div>
      )}

      {/* Feed Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
