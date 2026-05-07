import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Activity, Newspaper } from 'lucide-react';
import { resetPasswordApi } from '../api';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const res = await resetPasswordApi(token, password);
      const data = await res.json();
      
      if (res.ok) {
        setMessage('Password updated successfully. Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(data.message || 'Invalid or expired token');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex w-full bg-[#0a0f1c]">
      {/* Left Column - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center p-16 border-r border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 mb-12">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 mb-8">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              Built for builders
            </div>
            
            <h1 className="text-5xl font-bold text-[#e2e8f0] tracking-tight leading-tight mb-6">
              The pulse of tech, in a single dashboard.
            </h1>
            
            <p className="text-lg text-slate-400 font-normal leading-relaxed mb-12">
              Real-time Hacker News stories — beautifully presented, easily searchable, and saved across devices.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-white font-bold mb-1">10k+</div>
                <div className="text-xs text-slate-500">Stories indexed</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-white font-bold mb-1">Real-time</div>
                <div className="text-xs text-slate-500">Updates</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-white font-bold mb-1">1-click</div>
                <div className="text-xs text-slate-500">Bookmarks</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-16 text-xs text-slate-600 z-10">
          © 2026 HackerPulse. Crafted with care.
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="max-w-md w-full relative z-10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white tracking-tight">Set new password</h2>
            <p className="mt-2 text-sm text-slate-400 font-normal">
              Your new password must be different from previously used passwords.
            </p>
          </div>
          
          <div className="bg-[#111827]/50 border border-white/5 rounded-3xl p-8">
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl mb-6 shadow-inner">{error}</div>}
            {message && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm p-4 rounded-xl mb-6 shadow-inner">{message}</div>}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-12 py-3.5 bg-[#111827] border border-white/5 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-600 transition-colors sm:text-sm outline-none"
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#111827] border border-white/5 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-600 transition-colors sm:text-sm outline-none"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 focus:outline-none transition-all shadow-lg shadow-indigo-500/20 mt-6 disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          </div>
          
          <p className="text-center text-sm text-slate-400 mt-8">
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Back to log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
