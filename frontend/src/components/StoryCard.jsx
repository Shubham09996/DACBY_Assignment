import { Bookmark, ExternalLink, TrendingUp, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toggleBookmarkApi } from '../api';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story }) => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Check if story is bookmarked
  const isBookmarked = user?.bookmarkedStories?.some(
    (s) => s === story._id || s._id === story._id
  );

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const res = await toggleBookmarkApi(story._id, user.token);
      const data = await res.json();
      
      if (res.ok) {
        updateUser({ ...user, bookmarkedStories: data.bookmarkedStories });
      } else {
        console.error('Failed to bookmark:', data.message);
      }
    } catch (error) {
      console.error('Error bookmarking:', error);
    }
  };

  const getDomain = (url) => {
    if (!url) return '';
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '');
    } catch (e) {
      return '';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      // Handle scraped dates with concatenated timestamps "2026-05-06T16:18:29 1778084309"
      const cleanDateString = dateString.split(' ')[0];
      const date = new Date(cleanDateString);
      
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return 'Just now';
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}h ago`;
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) return `${diffInDays}d ago`;
      
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return 'Recently';
    }
  };

  return (
    <div className="flex flex-col bg-[#111827] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-lg hover:shadow-black/20">
      <div className="p-5 flex-1 flex flex-col">
        {/* Top Row: Points & Domain */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-blue-500 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              {story.points}
            </div>
            <span className="text-slate-400 text-xs font-medium truncate max-w-[150px]">
              {getDomain(story.url)}
            </span>
          </div>
          <button 
            onClick={handleBookmark}
            type="button"
            className={`transition-all duration-200 ${isBookmarked ? 'text-indigo-500 scale-110' : 'text-slate-500 hover:text-slate-300 hover:scale-110'}`}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-6 leading-snug line-clamp-2 hover:text-blue-400 transition-colors cursor-pointer" onClick={() => window.open(story.url || `https://news.ycombinator.com/item?id=${story.hnId}`, '_blank')}>
          {story.title}
        </h3>

        {/* Author & Time */}
        <div className="mt-auto flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            <span className="font-medium">{story.author}</span>
          </div>
          <span className="font-medium">{formatDate(story.postedAt)}</span>
        </div>
      </div>

      {/* Read Article Button */}
      <a 
        href={story.url || `https://news.ycombinator.com/item?id=${story.hnId}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 border-t border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-xs font-semibold text-slate-300 transition-colors"
      >
        Read article
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

export default StoryCard;
