import { Banner } from '../components/Banner'
import { Button } from '../components/Button'

export function S1Welcome({ offline = false }: { offline?: boolean }) {
  const navigate = (path: string) => window.history.pushState({}, '', path)
  return <main className="welcome stack">
    {offline && <Banner variant="offline">Offline mode -- emergency crisis lines active</Banner>}
    <section className="welcome__hero">
      <div className="welcome__logo">CareGrid SA</div>
      <p>Clinical sanctuary for nurses, doctors &amp; community practitioners under load</p>
    </section>
    <section className="card">
      <h2>Operational Wellness for SA Healthcare Workers</h2>
      <p>Track daily operational strain, access confidential peer debriefing, and summon immediate clinical crisis care.</p>
    </section>
    <section className="stack">
      <article className="card"><h3>Shift Check-in</h3><p>Rapid operational strain triage and reflection.</p></article>
      <article className="card"><h3>Peer Debrief</h3><p>Safe clinical debriefing with verified colleagues.</p></article>
      <article className="card"><h3>24/7 Crisis Support</h3><p>Immediate confidential crisis care.</p></article>
    </section>
    <div className="welcome__actions">
      <Button onClick={() => navigate('/signup')}>Get Started</Button>
      <Button variant="secondary" onClick={() => navigate('/login')}>Log In</Button>
    </div>
  </main>
}
