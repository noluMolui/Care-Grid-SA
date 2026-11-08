import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export function S4Dashboard() {
  const { user } = useAppContext()
  const actions = [['Peer Support', '/peer-support'], ['Crisis Hotline', '/crisis-help'], ['Shift Check-in', '/wellness-tracker'], ['Resources', '/resources']]
  return <main className="screen"><section className="welcome-banner"><p>Good morning, {user.name}</p><h1>Your care dashboard</h1><span>{user.role} · {user.facility}</span></section><section className="quick-actions">{actions.map(([label, path]) => <Link className="action-card" to={path} key={path}><strong>{label}</strong><span>Open support</span></Link>)}</section><section className="card"><h2>Operational updates</h2><p>New peer facilitators are available today.</p><p>Take a two-minute wellbeing check before your next shift.</p></section></main>
}
