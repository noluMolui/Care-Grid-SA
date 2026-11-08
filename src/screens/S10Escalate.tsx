import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export function S10Escalate() {
  const navigate = useNavigate()
  return <main className="screen"><h1>Escalate an incident</h1><p>Report an acute safety or mental health concern.</p><form className="stack" onSubmit={event => { event.preventDefault(); navigate('/dashboard') }}><select className="field__control" required defaultValue=""><option value="" disabled>Incident type</option><option>Acute safety concern</option><option>Mental health concern</option></select><textarea className="field__control" required placeholder="What happened?" rows={6} /><label className="checkbox"><input type="checkbox" required /> I confirm this report is accurate</label><Button type="submit">Submit report</Button></form></main>
}
