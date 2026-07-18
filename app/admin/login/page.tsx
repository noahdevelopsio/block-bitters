export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-forest-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-forest-800/10 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-700 text-xl font-serif">
            BB
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Admin Portal</h1>
          <p className="text-xs text-ink-900/60 uppercase tracking-widest">Sign in to manage storefront</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
              placeholder="admin@blockbitters.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-900/60 uppercase mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full border border-forest-800/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-forest-950 hover:bg-forest-800 text-cream-100 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
