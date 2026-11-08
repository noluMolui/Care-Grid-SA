import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { DeleteAccountModal } from '../components/DeleteAccountModal'
import { updateProfile } from '../lib/repositories'
import { useAppContext } from '../context/AppContext'

export function S11Profile() {
  const { user, authUser, refreshProfile, logout } = useAppContext()
  const navigate = useNavigate()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  if (!user || !authUser) return <main className="screen profile-screen"><h1>Account unavailable</h1><p>Sign in again to load your profile.</p></main>
  const saveNotifications = async (enabled: boolean) => {
    setSaving(true)
    setError(null)
    try { await updateProfile(authUser.id, { notifications_enabled: enabled }); await refreshProfile() } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save profile settings.') } finally { setSaving(false) }
  }
  const saveTheme = async (theme: 'system' | 'light' | 'dark') => {
    setSaving(true)
    setError(null)
    try { await updateProfile(authUser.id, { theme }); await refreshProfile() } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save theme preference.') } finally { setSaving(false) }
  }
  const signOut = async () => {
    try { await logout(); navigate('/') } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to log out.') }
  }
  return <main className="screen profile-screen"><div className="review-strip"><span>⌁ Live profile</span><strong>{saving ? 'Saving' : 'Connected'}</strong><span>Error</span></div><h1>Account &amp; Anonymity</h1><p>POPIA-compliant anonymous clinician identity.</p>{error && <div className="error-card" role="alert">{error}</div>}<section className="card profile-card"><div className="profile-identity"><span className="profile-avatar">♧</span><div><h2>{user.full_name}</h2><p>{user.role}</p></div><span className="status-pill">Strict Shield</span></div><div className="profile-token"><strong>Verified Clinician Token</strong><span>Authenticated account · {authUser.email}</span></div><div className="profile-grid"><span>Clinical Cadre<strong>{user.role}</strong></span><span>Facility<strong>{user.facility}</strong></span></div></section><section className="card stack"><h2>Shift &amp; Well-Being Rhythm</h2><label className="checkbox"><input type="checkbox" checked={user.notifications_enabled} disabled={saving} onChange={event => void saveNotifications(event.target.checked)} /> Wellness reminders and shift pulse checks</label><label className="field">Theme<select className="field__control" value={user.theme} disabled={saving} onChange={event => void saveTheme(event.target.value as typeof user.theme)}><option value="system">System default</option><option value="light">Light</option><option value="dark">Dark</option></select></label></section><section className="card stack danger-zone"><h2>Danger Zone</h2><p>Irreversible: all your check-ins, posts, bookmarks, and profile data will be deleted.</p><Button variant="secondary" onClick={() => void signOut()}>Log Out of Session</Button><Button variant="danger" onClick={() => setDeleteOpen(true)}>▣ Delete Account &amp; Erase All Traces</Button></section>{deleteOpen && <DeleteAccountModal onClose={() => setDeleteOpen(false)} />}</main>
}
