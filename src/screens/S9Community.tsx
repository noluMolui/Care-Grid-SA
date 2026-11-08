import { useCallback, useEffect, useState } from 'react'
import { createPost, deletePost, listPosts } from '../lib/repositories'
import type { Post } from '../lib/supabase'
import { useAppContext } from '../context/AppContext'

export function S9Community() {
  const { authUser } = useAppContext()
  const [posts, setPosts] = useState<Post[]>([])
  const [open, setOpen] = useState(false)
  const [anonymous, setAnonymous] = useState(true)
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<'General' | 'Nursing' | 'CHW' | 'Night Shift Support' | 'CHW Community'>('General')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try { setPosts(await listPosts()) } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to load posts.') } finally { setLoading(false) }
  }, [])
  useEffect(() => {
    const timer = window.setTimeout(() => { void load() }, 0)
    return () => window.clearTimeout(timer)
  }, [load])
  const publish = async () => {
    if (!authUser || !body.trim()) return
    setSaving(true)
    setError(null)
    try {
      const post = await createPost({ author_id: authUser.id, body: body.trim(), category, is_anonymous: anonymous })
      setPosts(current => [post, ...current])
      setBody('')
      setOpen(false)
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to publish post.') } finally { setSaving(false) }
  }
  const remove = async (post: Post) => {
    try { await deletePost(post.id, authUser?.id ?? ''); setPosts(current => current.filter(item => item.id !== post.id)) } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to delete post.') }
  }
  return <main className="screen community-screen"><div className="review-strip"><span>⌁ Live peer circle</span><strong>{loading ? 'Loading' : 'Connected'}</strong><span>Empty</span><span>Error</span></div><div className="community-heading"><div><h1>Community Feed</h1><p>Anonymous peer debriefing</p></div><button className="button button--primary" onClick={() => setOpen(true)}>+ New Post</button></div><div className="privacy-banner">♢ &nbsp; <strong>STRICT POPIA ANONYMITY</strong><small>All posts are scrubbed of identifying details.</small></div><div className="filter-row"><span className="chip chip--active">All Posts</span><span className="chip">Night Shift Support</span><span className="chip">CHW Community</span></div>{error && <div className="error-card" role="alert">{error}<button className="button button--secondary" onClick={() => void load()}>Retry</button></div>}{loading && <div className="card">Loading posts…</div>}{!loading && !error && posts.length === 0 && <div className="empty-card">No posts yet. Start a safe debrief with your peer circle.</div>}<section className="stack">{posts.map(post => <article className="post-card card" key={post.id}><div className="post-meta"><strong>{post.is_anonymous ? 'Anonymous peer' : post.author_id === authUser?.id ? 'You' : 'Peer clinician'}</strong><span>{new Date(post.created_at).toLocaleString()} · Encrypted</span></div><p>{post.body}</p><footer>{post.category} · <button className="text-button" onClick={() => void remove(post)}>Delete</button></footer></article>)}</section>{open && <div className="modal" role="dialog" aria-modal="true"><div className="card stack"><h2>Publish Debrief</h2><textarea className="field__control" placeholder="Share a safe clinical decompression" value={body} onChange={event => setBody(event.target.value)} /><label className="field">Circle<select className="field__control" value={category} onChange={event => setCategory(event.target.value as typeof category)}><option>General</option><option>Nursing</option><option>CHW</option><option>Night Shift Support</option><option>CHW Community</option></select></label><label className="checkbox"><input type="checkbox" checked={anonymous} onChange={event => setAnonymous(event.target.checked)} /> Post anonymously</label><button className="button button--primary" disabled={saving || !body.trim()} onClick={() => void publish()}>{saving ? 'Publishing…' : 'Publish Debrief'}</button><button className="button button--secondary" onClick={() => setOpen(false)}>Cancel</button></div></div>}</main>
}
