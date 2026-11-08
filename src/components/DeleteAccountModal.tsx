import { Button } from './Button'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const { removeAccount } = useAppContext()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeButton.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape' && !deleting) onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [deleting, onClose])
  const confirm = async () => {
    setDeleting(true)
    setError(null)
    try { await removeAccount(); navigate('/') } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to delete your account.') } finally { setDeleting(false) }
  }
  return <div className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className="card modal-card"><button ref={closeButton} className="modal-close" aria-label="Close delete account dialog" onClick={onClose}>×</button><div className="modal-icon">♢</div><h2 id="delete-title">Delete Account Permanently?</h2><p>This action cannot be undone. All personal check-in logs and drafts will be purged.</p><div className="modal-info"><strong>POPIA Section 14 Cryptographic Eradication</strong><span>Anonymous session hashes and notes will be shredded from local memory and encrypted servers.</span></div>{error && <div className="error-card" role="alert">{error}</div>}<div className="modal-warning">You will be logged out immediately and redirected to the welcome screen.</div><Button variant="danger" disabled={deleting} onClick={() => void confirm()}>▣ &nbsp; {deleting ? 'Deleting…' : 'Confirm Deletion'}</Button><Button variant="secondary" onClick={onClose}>Cancel</Button></div></div>
}
