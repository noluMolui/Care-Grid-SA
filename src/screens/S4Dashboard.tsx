import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { listCheckIns, listPosts } from '../lib/repositories'
import type { CheckIn, Post } from '../lib/supabase'

export function S4Dashboard() {
  const { user } = useAppContext()
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [now] = useState(() => Date.now())
  const loadDashboard = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const [savedCheckIns, savedPosts] = await Promise.all([listCheckIns(user.id), listPosts()])
      setCheckIns(savedCheckIns)
      setPosts(savedPosts)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to load your dashboard data.')
    } finally {
      setLoading(false)
    }
  }, [user])
  useEffect(() => {
    const timer = window.setTimeout(() => { void loadDashboard() }, 0)
    return () => window.clearTimeout(timer)
  }, [loadDashboard])
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
  const recentCheckIns = checkIns.filter(item => new Date(item.created_at).getTime() >= sevenDaysAgo)
  const average = recentCheckIns.length ? (recentCheckIns.reduce((total, item) => total + item.fatigue, 0) / recentCheckIns.length).toFixed(1) : null
  const loggedDays = new Set(checkIns.map(item => new Date(item.created_at).toDateString()))
  let streak = 0
  const streakDate = new Date()
  while (loggedDays.has(streakDate.toDateString())) {
    streak += 1
    streakDate.setDate(streakDate.getDate() - 1)
  }
  if (!user) return <main className="screen"><div className="error-card" role="alert">Your profile could not be loaded.</div></main>
  return <main className="screen dashboard-screen"><div className="review-strip"><span>⌁ Live dashboard</span><span>{loading ? 'Loading' : error ? 'Error' : 'Connected'}</span></div>{error && <div className="error-card" role="alert">{error}<button className="button button--secondary" onClick={() => void loadDashboard()}>Retry</button></div>}<section className="dashboard-welcome card"><span className="status-pill">● {user.facility}</span><h1>Welcome back, <em>Peer-Care Worker</em></h1><p>{user.role} · {user.facility}</p><div className="streak-card">🔥 <strong>{streak}-Day Check-in Streak</strong><span>{checkIns.length ? `${checkIns.length} saved private check-in${checkIns.length === 1 ? '' : 's'}` : 'Start your first private check-in'}</span></div></section><section className="primary-action card"><span className="eyebrow">SHIFT HANDOVER &amp; WELLNESS</span><h2>Post-Shift Stress Check</h2><p>Record your mental and operational fatigue before heading home.</p><Link className="button button--primary" to="/wellness-tracker">☷ &nbsp; Log Today's Shift Stress</Link></section><section className="trend-card card"><div><h2>7-Day Stress Trend</h2><p>Average: <strong>{average ?? '—'}</strong>{average ? ` · ${recentCheckIns.length} logged in the last 7 days` : ' · No check-ins saved yet'}</p></div><div className="chart-placeholder" aria-label="7-day stress trend"><i /><i /><i /><i className="chart-high" /><i /><i /><i /></div></section><section><div className="section-heading"><strong>Recent Peer Circles</strong><Link to="/community">View All →</Link></div>{posts.length === 0 && !loading && <div className="empty-card">No peer posts yet.</div>}<div className="stack">{posts.slice(0, 2).map(post => <Link className="card recent-card" to="/community" key={post.id}><strong>{post.is_anonymous ? 'Anonymous peer' : 'Peer clinician'}</strong><span>{post.category}</span><p>{post.body}</p></Link>)}</div></section><Link className="dashboard-sos" to="/crisis-help">☎ Need urgent decompression? Call 0800 212 223</Link></main>
}
