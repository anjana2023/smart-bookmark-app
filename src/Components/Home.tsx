'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Home() {
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) router.push('/login')
      else {
    setUser(data.user)
     toast.success(`Welcome ${data.user.user_metadata.full_name || 'back'} 🎉`)
      }
      setLoading(false)
    }

    getUser()
  }, [])

  useEffect(() => {
    if (!user) return

    fetchBookmarks()

const channel = supabase
  .channel('bookmarks-realtime')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'bookmarks',
      filter: `user_id=eq.${user.id}`
    },
    payload => {
      setBookmarks(prev => [payload.new, ...prev])
    }
  )
  .on(
    'postgres_changes',
    {
      event: 'DELETE',
      schema: 'public',
      table: 'bookmarks',
      filter: `user_id=eq.${user.id}`
    },
    payload => {
      setBookmarks(prev =>
        prev.filter(b => b.id !== payload.old.id)
      )
    }
  )
  .subscribe()



    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

const addBookmark = async () => {
  if (!user || !title || !url) {
    toast.error('Please enter title and URL')
    return
  }

  const { error } = await supabase.from('bookmarks').insert({
    title,
    url,
    user_id: user.id
  })

  if (!error) toast.success('Bookmark added 🚀')
  else toast.error(error.message)

  setTitle('')
  setUrl('')
}



const deleteBookmark = async (id: string) => {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', id)

  if (!error) toast.success('Bookmark deleted 🗑️')
  else toast.error(error.message)
}


const logout = async () => {
  await supabase.auth.signOut()
  toast.success('Logged out successfully 👋')
  router.push('/login')
}

  if (loading) return <p className="text-center mt-20">Loading...</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f192a] via-[#1e1b3b] to-[#4c1d95] text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide">
            🔖 Smart Bookmark App
          </h1>
          <button
            onClick={logout}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Bookmark Title"
            className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Website URL"
            className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={addBookmark}
            className="px-5 py-2 rounded bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 font-medium"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {bookmarks.map(b => (
            <li
              key={b.id}
              className="flex justify-between items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              <a
                href={b.url}
                target="_blank"
                className="font-medium text-indigo-300 hover:underline"
              >
                {b.title}
              </a>
              <button
                onClick={() => deleteBookmark(b.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}
