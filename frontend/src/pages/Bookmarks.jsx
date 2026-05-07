const Bookmarks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Your Bookmarks</h1>
        <p className="text-slate-400">Sign in to start saving stories.</p>
      </div>
      
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-12 text-center">
        {/* Placeholder for unauthenticated state or list of bookmarks */}
        <div className="text-slate-400">Bookmarks feature coming soon...</div>
      </div>
    </div>
  );
};

export default Bookmarks;
