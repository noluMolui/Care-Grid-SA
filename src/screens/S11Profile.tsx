import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { Button } from '../components/Button'

export function S11Profile() {
  const { user } = useAppContext()
  const navigate = useNavigate()
  return <main className="screen"><h1>Profile</h1><section className="card profile-card"><h2>{user.name}</h2><p>{user.role}</p><span>{user.facility}</span></section><section className="card stack"><label className="checkbox"><input type="checkbox" defaultChecked /> Peer support notifications</label><label className="checkbox"><input type="checkbox" defaultChecked /> Wellness reminders</label><label className="field">Theme<select className="field__control" defaultValue="Light"><option>Light</option><option>System</option></select></label></section><Button variant="secondary" onClick={() => navigate('/')}>Log Out</Button></main>
}
