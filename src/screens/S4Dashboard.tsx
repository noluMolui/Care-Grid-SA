import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { listCheckIns } from '../lib/repositories'
import type { CheckIn } from '../lib/supabase'

export function S4Dashboard() {
  const { user } = useAppContext()
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [error, setError] = useState<string | null>(null)
  const loadCheckIns = useCallback(async () => {
    if (!user) return
    try { setCheckIns(await listCheckIns(user.id)) } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to load your check-in history.') }
  }, [user])
  useEffect(() => {
    const timer = window.setTimeout(() => { void loadCheckIns() }, 0)
    return () => window.clearTimeout(timer)
  }, [loadCheckIns])
  const average = checkIns.length ? (checkIns.reduce((total, item) => total + item.fatigue, 0) / checkIns.length).toFixed(1) : null
  if (!user) return <main className="screen"><div className="error-card" role="alert">Your profile could not be loaded.</div></main>
  const actions = [['Peer Support', '/peer-support'], ['Crisis Hotline', '/crisis-help'], ['Shift Check-in', '/wellness-tracker'], ['Resources', '/resources']]
  return <main className="screen dashboard-screen"><div className="review-strip"><span>⌁ Live dashboard</span><span>{error ? 'Error' : 'Connected'}</span></div><section className="dashboard-welcome card"><span className="status-pill">● {user.facility}</span><h1>Welcome back, <em>Peer-Care Worker</em></h1><p>{user.role} · {user.facility}</p><div className="streak-card">🔥 <strong>{checkIns.length} Shift Check-in{checkIns.length === 1 ? '' : 's'}</strong><span>{checkIns.length ? 'Your private wellness history' : 'Start your first private check-in'}</span></div></section><section className="primary-action card"><span className="eyebrow">SHIFT HANDOVER &amp; WELLNESS</span><h2>Post-Shift Stress Check</h2><p>Record your mental and operational fatigue before heading home.</p><Link className="button button--primary" to="/wellness-tracker">☷ &nbsp; Log Today's Shift Stress</Link></section><section className="trend-card card"><div><h2>7-Day Stress Trend</h2><p>Average: <strong>{average ?? '—'}</strong>{average ? ' · Based on saved check-ins' : ' · No check-ins saved yet'}</p></div><div className="chart-placeholder" aria-label="7-day stress trend"><i /><i /><i /><i className="chart-high" /><i /><i /><i /></div></section><section><div className="section-heading"><strong>Recent Peer Circles</strong><Link to="/peer-support">View All →</Link></div><div className="stack">{actions.slice(0, 2).map(([label, path]) => <Link className="card recent-card" to={path} key={path}><strong>{label}</strong><span>Anonymous Circle</span><p>Handover reflections and support from your care community.</p></Link>)}</div></section><Link className="dashboard-sos" to="/crisis-help">☎ Need urgent decompression? Call 0800 212 223</Link></main>
}
