import { Banner } from '../components/Banner'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'

export function S1Welcome({ offline = false }: { offline?: boolean }) {
  const navigate = useNavigate()
  return <main className="welcome stack">
    {offline && <Banner variant="offline">Offline mode -- emergency crisis lines active</Banner>}
    <section className="welcome__hero">
      <div className="welcome__mark" aria-hidden="true">✚</div>
      <div className="welcome__eyebrow">South African Healthcare Support</div>
      <div className="welcome__logo">CareGrid SA</div>
      <p>Clinical sanctuary for nurses, doctors &amp; community practitioners under load</p>
    </section>
    <section className="card welcome__proposition">
      <div className="section-label">Frontline Care</div>
      <h2>Operational Wellness for SA Healthcare Workers</h2>
      <p>Built specifically for frontline nurses, doctors, and community care teams. Track daily operational strain, access confidential peer debriefing, and summon immediate clinical crisis care even when completely offline.</p>
    </section>
    <section className="stack">
      <div className="section-heading">Essential capabilities</div>
      <article className="card capability"><h3>Shift Check-in</h3><p>Rapid operational strain triage, vitals of cognitive fatigue, and calm handover reflection.</p></article>
      <article className="card capability"><h3>Peer Debrief</h3><p>Safe clinical debriefing circles with verified SA colleagues across provinces.</p></article>
      <article className="card capability capability--urgent"><h3>24/7 Crisis Support</h3><p>Dedicated telephonic psychological triage with trauma counselors via direct toll-free connection.</p></article>
    </section>
    <div className="welcome__actions">
      <Button onClick={() => navigate('/signup')}>Get Started</Button>
      <Button variant="secondary" onClick={() => navigate('/login')}>Log In</Button>
    </div>
  </main>
}
