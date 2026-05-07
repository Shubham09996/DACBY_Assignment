import { Bookmark, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story }) => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const isBookmarked = user?.bookmarkedStories?.includes(story._id);

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`/api/stories/${story._id}/bookmark`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      
      if (res.ok) {
        updateUser({ ...user, bookmarkedStories: data.bookmarkedStories });
      }
    } catch (error) {
      console.error('Error bookmarking:', error);
    }
  };

  // Extract domain from URL
  const getDomain = (url) => {
    if (!url) return 'news.ycombinator.com';
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '');
    } catch (e) {
      return 'news.ycombinator.com';
    }
  };

  return (
    <a 
      href={story.url || `https://news.ycombinator.com/item?id=${story.hnId}`}
      target="_blank" 
      rel="noopener noreferrer"
      className="block group bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700 hover:border-slate-600 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              {story.points}
            </span>
            <span className="text-sm text-slate-500 truncate max-w-[200px]">
              {getDomain(story.url)}
            </span>
          </div>
          <button 
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
          {story.title}
        </h3>

        <div className="flex justify-between items-center text-sm text-slate-400 mt-auto pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
              {story.author?.charAt(0).toUpperCase()}
            </div>
            <span>{story.author}</span>
          </div>
          <span>{story.postedAt || 'Recently'}</span>
        </div>
      </div>
    </a>
  );
};

export default StoryCard;
