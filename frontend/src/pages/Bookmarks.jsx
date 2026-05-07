import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark as BookmarkIcon, LayoutGrid } from 'lucide-react';
import { fetchStoriesApi } from '../api';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../context/AuthContext';

const Bookmarks = () => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user || !user.bookmarkedStories?.length) {
        setLoading(false);
        setBookmarkedStories([]);
        return;
      }

      try {
        const res = await fetchStoriesApi();
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const filtered = data.filter(story => user.bookmarkedStories.includes(story._id));
          setBookmarkedStories(filtered);
        } else if (data && data.stories && Array.isArray(data.stories)) {
          const filtered = data.stories.filter(story => user.bookmarkedStories.includes(story._id));
          setBookmarkedStories(filtered);
        } else {
          setBookmarkedStories([]);
        }
      } catch (error) {
        console.error('Failed to fetch bookmarks', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 mb-8">
            <BookmarkIcon className="w-3.5 h-3.5 text-indigo-400" />
            Saved Stories
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#e2e8f0] tracking-tight mb-6">
            Sign in to view bookmarks
          </h1>
          <p className="text-base md:text-lg text-slate-400 font-normal leading-relaxed mb-12">
            Create a free account to securely save Hacker News stories and access them anywhere, anytime. Never lose an important article again.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-3 rounded-xl border border-white/5 bg-[#111827] text-white hover:bg-white/5 transition-colors text-sm font-semibold">
              Login
            </Link>
            <Link to="/register" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20">
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      
      {/* Header Section */}
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 mb-8">
          <BookmarkIcon className="w-3.5 h-3.5 text-indigo-400" />
          Saved Stories
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#e2e8f0] tracking-tight mb-6">
          Your Bookmarks
        </h1>
        <p className="text-base md:text-lg text-slate-400 font-normal leading-relaxed mb-12">
          Access your curated collection of the best tech news. Keep track of what matters to you.
        </p>
      </div>

      {!loading && bookmarkedStories.length > 0 && (
        <div className="mb-6 text-sm text-slate-400">
          Showing <span className="font-semibold text-white">{bookmarkedStories.length}</span> saved stories
        </div>
      )}

      {/* Feed Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      ) : bookmarkedStories.length === 0 ? (
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-16 text-center max-w-2xl mx-auto mt-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookmarkIcon className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No bookmarks yet</h3>
          <p className="text-slate-400 mb-8 text-sm max-w-sm mx-auto">
            Stories you bookmark will appear here. Start exploring the front page to find interesting reads.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-white text-sm font-semibold transition-colors">
            <LayoutGrid className="w-4 h-4" />
            Browse top stories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedStories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
