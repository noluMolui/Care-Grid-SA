import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export function S10Escalate() {
  const navigate = useNavigate()
  return <main className="screen escalate-screen"><div className="review-strip"><span>⌁ Reviewer State Preview</span><strong>Normal</strong><span>Error</span><span>Submitted</span></div><h1>Escalate Safely</h1><p>For acute safety or mental health events requiring immediate attention.</p><div className="escalate-warning">⚠ If there is immediate danger, call Emergency Services on 10111.</div><form className="card stack" onSubmit={event => { event.preventDefault(); navigate('/dashboard') }}><label className="field">Incident type<select className="field__control" required defaultValue=""><option value="" disabled>Select incident type</option><option>Acute safety concern</option><option>Mental health concern</option></select></label><label className="field">What happened?<textarea className="field__control" required placeholder="Describe the event without patient-identifying details." rows={6} /></label><label className="checkbox"><input type="checkbox" required /> I confirm this report is accurate</label><Button type="submit">Submit Secure Report</Button></form></main>
}
