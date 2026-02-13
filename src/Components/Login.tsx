'use client'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#4c1d95]">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-2xl w-[90%] max-w-md text-center">
        
        <h1 className="text-3xl font-bold text-white mb-2">
          Smart Bookmark App
        </h1>

        <p className="text-gray-300 mb-8">
          Save, manage & sync your bookmarks in real-time
        </p>

        <button
          onClick={signIn}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl
          bg-gradient-to-r from-indigo-500 to-purple-600
          text-white font-semibold text-lg shadow-lg
          hover:scale-[1.02] transition-all"
        >
          <svg className="w-6 h-6" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.8l5.7-5.7C33.3 6.3 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.2-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 16.1 18.8 13 24 13c2.8 0 5.3 1 7.2 2.8l5.7-5.7C33.3 6.3 28.9 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"/>
            <path fill="#4CAF50" d="M24 44c4.8 0 9.3-1.8 12.7-4.8l-6-4.9c-1.7 1.3-4 2.1-6.7 2.1-5.3 0-9.8-3.6-11.4-8.5l-6.6 5.1C9.4 39.4 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.3 6.9l6 4.9c3.5-3.2 5.6-7.9 5.6-13.3 0-1.1-.1-2.2-.4-3.5z"/>
          </svg>
          Sign in with Google
        </button>

      </div>
    </div>
  )
}
