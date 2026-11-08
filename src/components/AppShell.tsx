import { useState, type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { SosDrawer } from './SosDrawer'

export function AppShell({ children }: PropsWithChildren) {
  const { user, offline } = useAppContext()
  const [sosOpen, setSosOpen] = useState(false)
  return <div className="app-shell">
    <header className="app-shell__header">
      <Link className="app-shell__brand" to="/dashboard">CareGrid SA</Link>
      <button className="app-shell__crisis" onClick={() => setSosOpen(true)}>Crisis: 0800 212 223</button>
    </header>
    <div className="app-shell__status">{offline ? 'Offline mode' : 'Connected'} · {user ? `${user.full_name} · ${user.role} · ${user.facility}` : 'Profile unavailable'}</div>
    <main className="app-shell__main">{children}</main>
    <nav className="app-shell__tabs" aria-label="App navigation">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/peer-support">Peer Support</Link>
      <Link to="/resources">Resources</Link>
      <Link to="/wellness-tracker">Wellness</Link>
      <Link to="/profile">Profile</Link>
    </nav>
    {sosOpen && <SosDrawer onClose={() => setSosOpen(false)} />}
  </div>
}
