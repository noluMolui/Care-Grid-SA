import { Button } from './Button'

export function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  return <div className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className="card modal-card"><button className="modal-close" aria-label="Close" onClick={onClose}>×</button><div className="modal-icon">♢</div><h2 id="delete-title">Delete Account Permanently?</h2><p>This action cannot be undone. All personal check-in logs and drafts will be purged.</p><div className="modal-info"><strong>POPIA Section 14 Cryptographic Eradication</strong><span>Anonymous session hashes and notes will be shredded from local memory and encrypted servers.</span></div><div className="modal-warning">You will be logged out immediately and redirected to the welcome screen.</div><Button variant="danger" onClick={onClose}>▣ &nbsp; Confirm Deletion</Button><Button variant="secondary" onClick={onClose}>Cancel</Button></div></div>
}
