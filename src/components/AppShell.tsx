import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export function AppShell({ children }: PropsWithChildren) {
  const { user, offline } = useAppContext()
  return <div className="app-shell">
    <header className="app-shell__header">
      <Link className="app-shell__brand" to="/dashboard">CareGrid SA</Link>
      <a className="app-shell__crisis" href="tel:0800212223">Crisis: 0800 212 223</a>
    </header>
    <div className="app-shell__status">{offline ? 'Offline mode' : 'Connected'} · {user.name} · {user.role} · {user.facility}</div>
    <main className="app-shell__main">{children}</main>
    <nav className="app-shell__tabs" aria-label="App navigation">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/peer-support">Peer Support</Link>
      <Link to="/resources">Resources</Link>
      <Link to="/wellness-tracker">Wellness</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  </div>
}
