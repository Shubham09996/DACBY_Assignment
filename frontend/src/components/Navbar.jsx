import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Newspaper, Bookmark, Home, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left */}
          <div className="flex items-center w-1/3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                <Newspaper className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                HackerPulse
              </span>
            </Link>
          </div>
          
          {/* Main Navigation - Center */}
          <div className="hidden md:flex items-center justify-center w-1/3 gap-2">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Home
            </Link>
            <Link 
              to="/bookmarks" 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/bookmarks') ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              Bookmarks
            </Link>
          </div>

          {/* Auth - Right */}
          <div className="flex items-center justify-end w-1/3 gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-slate-300">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-5 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
