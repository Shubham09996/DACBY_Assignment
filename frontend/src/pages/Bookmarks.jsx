import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark as BookmarkIcon } from 'lucide-react';
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
        // Simple approach: fetch all stories and filter. 
        // In a real app with many stories, we'd have a specific backend endpoint like GET /api/stories/bookmarked
        const res = await fetch('/api/stories');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const filtered = data.filter(story => user.bookmarkedStories.includes(story._id));
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-12 text-center max-w-2xl mx-auto mt-12">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookmarkIcon className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Sign in to view bookmarks</h2>
          <p className="text-slate-400 mb-8">Create a free account to bookmark stories and access them anywhere.</p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="px-6 py-2 rounded-full border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-colors">
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Your Bookmarks</h1>
        <p className="text-slate-400">Manage your saved stories.</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : bookmarkedStories.length === 0 ? (
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-12 text-center">
          <BookmarkIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No bookmarks yet</h3>
          <p className="text-slate-400 mb-6">Stories you bookmark will appear here.</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
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
