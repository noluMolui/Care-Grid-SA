import { useState } from 'react'

export function S8WellnessTracker() {
  const [fatigue, setFatigue] = useState(3)
  const [mood, setMood] = useState(3)
  const risk = fatigue + (6 - mood)
  return <main className="screen"><h1>Wellness tracker</h1><p>Record a quick check-in for your own wellbeing.</p><section className="card stack"><label className="field">Fatigue today: {fatigue}<input type="range" min="1" max="5" value={fatigue} onChange={event => setFatigue(Number(event.target.value))} /></label><label className="field">Mood today: {mood}<input type="range" min="1" max="5" value={mood} onChange={event => setMood(Number(event.target.value))} /></label><label className="field">Hours worked<input className="field__control" type="number" min="0" max="24" placeholder="8" /></label></section><section className={`risk-card risk-card--${risk >= 7 ? 'high' : 'steady'}`}><h2>{risk >= 7 ? 'High stress risk' : 'Steady risk'}</h2><p>Your private tracker suggests taking a restorative pause.</p></section></main>
}
