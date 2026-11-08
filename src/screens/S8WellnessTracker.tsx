import { useEffect, useState } from 'react'
import { createCheckIn, deleteCheckIn, listCheckIns, updateCheckIn } from '../lib/repositories'
import type { CheckIn, ShiftType } from '../lib/supabase'
import { useAppContext } from '../context/AppContext'

export function S8WellnessTracker() {
  const { authUser } = useAppContext()
  const [fatigue, setFatigue] = useState(3)
  const [mood, setMood] = useState(3)
  const [shiftType, setShiftType] = useState<ShiftType>('Day Shift')
  const [hoursWorked, setHoursWorked] = useState('')
  const [notes, setNotes] = useState('')
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!authUser) return
    void listCheckIns(authUser.id).then(setCheckIns).catch(reason => setError(reason instanceof Error ? reason.message : 'Unable to load check-ins.')).finally(() => setLoading(false))
  }, [authUser])
  const latest = checkIns[0] ?? null
  const risk = fatigue + (6 - mood)
  const resetForm = () => {
    setEditingId(null)
    setFatigue(3)
    setMood(3)
    setShiftType('Day Shift')
    setHoursWorked('')
    setNotes('')
  }
  const editCheckIn = (checkIn: CheckIn) => {
    setEditingId(checkIn.id)
    setFatigue(checkIn.fatigue)
    setMood(checkIn.mood)
    setShiftType(checkIn.shift_type)
    setHoursWorked(checkIn.hours_worked?.toString() ?? '')
    setNotes(checkIn.notes ?? '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const removeCheckIn = async (checkIn: CheckIn) => {
    if (!authUser) return
    try {
      await deleteCheckIn(checkIn.id, authUser.id)
      setCheckIns(current => current.filter(item => item.id !== checkIn.id))
      if (editingId === checkIn.id) resetForm()
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to delete check-in.') }
  }
  const submit = async () => {
    if (!authUser) return
    setSaving(true)
    setError(null)
    try {
      const input = { fatigue, mood, hours_worked: hoursWorked ? Number(hoursWorked) : null, shift_type: shiftType, notes: notes || null }
      const checkIn = editingId
        ? await updateCheckIn(editingId, authUser.id, input)
        : await createCheckIn({ user_id: authUser.id, ...input })
      setCheckIns(current => editingId ? current.map(item => item.id === checkIn.id ? checkIn : item) : [checkIn, ...current])
      resetForm()
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save check-in.') } finally { setSaving(false) }
  }
  return <main className="screen tracker-screen"><div className="review-strip"><span>⌁ Live shift check-in</span><strong>{loading ? 'Loading' : latest ? 'Saved' : 'Ready'}</strong><span>History</span><span>Error</span></div><div className="tracker-title"><span>←</span><div><h1>{editingId ? 'Edit Shift Check-In' : 'Daily Shift Check-In'}</h1><p>Record a private wellness check-in</p></div></div>{error && <div className="error-card" role="alert">{error}</div>}<section className="card"><div className="tracker-question"><h2>How are you feeling right now? *</h2><span>Score: {fatigue}/5</span></div><div className="rating-row">{[1, 2, 3, 4, 5].map(score => <button className={fatigue === score ? 'rating rating--active' : 'rating'} key={score} onClick={() => setFatigue(score)}><strong>{score}</strong><small>{['Calm', 'Mild', 'Moderate', 'High', 'Crisis'][score - 1]}</small></button>)}</div><label className="field tracker-mood">Mood balance: {mood}/5<input type="range" min="1" max="5" value={mood} onChange={event => setMood(Number(event.target.value))} /></label><div className="checkin-note"><strong>{risk >= 7 ? 'High operational strain' : 'Mild Tension / Manageable Pace'}</strong><p>Your answers are private and visible only to you.</p></div></section><section className="card stack"><h2>Current Shift Type *</h2><div className="shift-row">{(['Day Shift', 'Night Shift', 'Overtime'] as ShiftType[]).map(item => <button key={item} className={`shift-card ${shiftType === item ? 'shift-card--active' : ''}`} onClick={() => setShiftType(item)}><strong>{item}</strong></button>)}</div><label className="field">Hours worked<input className="field__control" type="number" min="0" max="24" step="0.5" value={hoursWorked} onChange={event => setHoursWorked(event.target.value)} /></label><label className="field">Optional Notes<textarea className="field__control" maxLength={300} value={notes} onChange={event => setNotes(event.target.value)} placeholder="Personal context, without patient-identifying details" /></label></section><section className={`risk-card risk-card--${risk >= 7 ? 'high' : 'steady'}`}><h2>{risk >= 7 ? 'High stress risk' : 'Steady operational load'}</h2><p>{latest ? `Last saved ${new Date(latest.created_at).toLocaleString()}` : 'Submit your first shift check-in.'}</p></section><button className="button button--primary" disabled={saving || loading} onClick={() => void submit()}>◉ &nbsp; {saving ? 'Saving Shift Log…' : editingId ? 'Update Shift Log' : 'Submit Shift Log'}</button>{editingId && <button className="button button--secondary" onClick={resetForm}>Cancel Edit</button>}<section className="card stack"><h2>Recent Check-ins</h2>{loading && <p>Loading your private history…</p>}{!loading && checkIns.length === 0 && <p>No saved check-ins yet.</p>}{checkIns.map(checkIn => <article className="history-row" key={checkIn.id}><div><strong>{new Date(checkIn.created_at).toLocaleString()}</strong><span>Fatigue {checkIn.fatigue}/5 · Mood {checkIn.mood}/5 · {checkIn.shift_type}</span></div><div><button className="text-button" onClick={() => editCheckIn(checkIn)}>Edit</button><button className="text-button" onClick={() => void removeCheckIn(checkIn)}>Delete</button></div></article>)}</section></main>
}
