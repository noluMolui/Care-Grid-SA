import { useAppContext } from '../context/AppContext'

export function S12OfflineStatus() {
  const { offline, setOffline } = useAppContext()
  return <main className="screen"><h1>Offline status</h1><section className={`connection-card ${offline ? 'connection-card--offline' : ''}`}><strong>{offline ? 'Offline' : 'Connected'}</strong><p>{offline ? 'Your saved resources remain available.' : 'CareGrid is connected and ready to sync.'}</p><button className="button button--secondary" onClick={() => setOffline(!offline)}>{offline ? 'Reconnect' : 'Simulate offline mode'}</button></section><section className="card"><h2>Cached resources</h2><ul><li>Crisis contacts</li><li>De-escalation tool</li><li>Wellness check-in</li></ul></section><section className="card"><h2>Pending sync queue</h2><p>0 items waiting to sync</p></section></main>
}
