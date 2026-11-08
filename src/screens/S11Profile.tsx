import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { Button } from '../components/Button'
import { DeleteAccountModal } from '../components/DeleteAccountModal'

export function S11Profile() {
  const { user } = useAppContext()
  const navigate = useNavigate()
  const [deleteOpen, setDeleteOpen] = useState(false)
  return <main className="screen profile-screen"><div className="review-strip"><span>⚗ Reviewer UX State Simulator</span><strong>Normal</strong><span>Processing</span></div><h1>Account &amp; Anonymity</h1><p>POPIA-compliant anonymous clinician identity.</p><section className="card profile-card"><div className="profile-identity"><span className="profile-avatar">♧</span><div><h2>{user.name}</h2><p>{user.role}</p></div><span className="status-pill">Strict Shield</span></div><div className="profile-token"><strong>Verified Clinician Token</strong><span>Token: CG-ZA-89104 · Blinded ZK-Proof Hash</span></div><div className="profile-grid"><span>Clinical Cadre<strong>{user.role}</strong></span><span>Province / Zone<strong>Gauteng Pub/Priv</strong></span></div></section><section className="card stack"><h2>Shift &amp; Well-Being Rhythm</h2><label className="checkbox"><input type="checkbox" defaultChecked /> Shift changeover pulse check</label><label className="checkbox"><input type="checkbox" defaultChecked /> High-acuity debrief calls</label><label className="checkbox"><input type="checkbox" defaultChecked /> Wellness reminders</label></section><section className="card stack danger-zone"><h2>Danger Zone</h2><p>Irreversible: all anonymized tokens and offline notes will be cryptographically shredded.</p><Button variant="secondary" onClick={() => navigate('/')}>Log Out of Session</Button><Button variant="danger" onClick={() => setDeleteOpen(true)}>▣ Delete Account &amp; Erase All Traces</Button></section>{deleteOpen && <DeleteAccountModal onClose={() => setDeleteOpen(false)} />}</main>
}
