import { useCallback, useEffect, useState } from 'react'
import { createPost, deletePost, listPosts, reportPost } from '../lib/repositories'
import type { Post } from '../lib/supabase'
import { useAppContext } from '../context/AppContext'

export function S9Community() {
  const { authUser } = useAppContext()
  const [posts, setPosts] = useState<Post[]>([])
  const [open, setOpen] = useState(false)
  const [anonymous, setAnonymous] = useState(true)
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<'General' | 'Nursing' | 'CHW' | 'Night Shift Support' | 'CHW Community'>('General')
  const [filter, setFilter] = useState<'All' | Post['category']>('All')
  const [reporting, setReporting] = useState<Post | null>(null)
  const [reportReason, setReportReason] = useState('')
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
  const filteredPosts = filter === 'All' ? posts : posts.filter(post => post.category === filter)
  const submitReport = async () => {
    if (!authUser || !reporting || reportReason.trim().length < 10) return
    try {
      await reportPost({ post_id: reporting.id, reporter_id: authUser.id, reason: reportReason.trim() })
      setReporting(null)
      setReportReason('')
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to submit report.') }
  }
  return <main className="screen community-screen"><div className="review-strip"><span>⌁ Live peer circle</span><strong>{loading ? 'Loading' : 'Connected'}</strong><span>Empty</span><span>Error</span></div><div className="community-heading"><div><h1>Community Feed</h1><p>Anonymous peer debriefing</p></div><button className="button button--primary" onClick={() => setOpen(true)}>+ New Post</button></div><div className="privacy-banner">♢ &nbsp; <strong>STRICT POPIA ANONYMITY</strong><small>All posts are scrubbed of identifying details.</small></div><div className="filter-row">{(['All', 'Night Shift Support', 'CHW Community', 'Nursing'] as const).map(item => <button className={`chip ${filter === item ? 'chip--active' : ''}`} key={item} onClick={() => setFilter(item)}>{item === 'All' ? 'All Posts' : item}</button>)}</div>{error && <div className="error-card" role="alert">{error}<button className="button button--secondary" onClick={() => void load()}>Retry</button></div>}{loading && <div className="card">Loading posts…</div>}{!loading && !error && filteredPosts.length === 0 && <div className="empty-card">No posts in this circle yet.</div>}<section className="stack">{filteredPosts.map(post => <article className="post-card card" key={post.id}><div className="post-meta"><strong>{post.is_anonymous ? 'Anonymous peer' : post.author_id === authUser?.id ? 'You' : 'Peer clinician'}</strong><span>{new Date(post.created_at).toLocaleString()} · Encrypted</span></div><p>{post.body}</p><footer>{post.category} · {post.author_id === authUser?.id && <button className="text-button" onClick={() => void remove(post)}>Delete</button>} {post.author_id !== authUser?.id && <button className="text-button" onClick={() => setReporting(post)}>Report</button>}</footer></article>)}</section>{open && <div className="modal" role="dialog" aria-modal="true"><div className="card stack"><h2>Publish Debrief</h2><textarea className="field__control" placeholder="Share a safe clinical decompression" value={body} onChange={event => setBody(event.target.value)} /><label className="field">Circle<select className="field__control" value={category} onChange={event => setCategory(event.target.value as typeof category)}><option>General</option><option>Nursing</option><option>CHW</option><option>Night Shift Support</option><option>CHW Community</option></select></label><label className="checkbox"><input type="checkbox" checked={anonymous} onChange={event => setAnonymous(event.target.checked)} /> Post anonymously</label><button className="button button--primary" disabled={saving || !body.trim()} onClick={() => void publish()}>{saving ? 'Publishing…' : 'Publish Debrief'}</button><button className="button button--secondary" onClick={() => setOpen(false)}>Cancel</button></div></div>}{reporting && <div className="modal" role="dialog" aria-modal="true"><div className="card stack"><h2>Report post</h2><p>Reports are reviewed privately by the CareGrid moderation team.</p><textarea className="field__control" minLength={10} value={reportReason} onChange={event => setReportReason(event.target.value)} placeholder="Tell us what concerns you about this post." /><button className="button button--danger" disabled={reportReason.trim().length < 10} onClick={() => void submitReport()}>Submit Report</button><button className="button button--secondary" onClick={() => setReporting(null)}>Cancel</button></div></div>}</main>
}
