import { Link } from 'react-router-dom';
import { Newspaper, Bookmark, Home, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">HackerPulse</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link to="/bookmarks" className="flex items-center gap-2 px-4 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
              <Bookmark className="w-4 h-4" />
              <span className="text-sm font-medium">Bookmarks</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-blue-500/30">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
