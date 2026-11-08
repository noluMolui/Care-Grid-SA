import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'
import { useAppContext } from '../context/AppContext'

export function S2ResetPassword() {
  const { updatePassword } = useAppContext()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus(null)
    setError(null)
    if (password.length < 8) {
      setError('Use at least 8 characters for your new password.')
      return
    }
    if (password !== confirmation) {
      setError('The passwords do not match.')
      return
    }
    setSubmitting(true)
    try {
      await updatePassword(password)
      setStatus('Your password has been updated. You can now sign in securely.')
      setPassword('')
      setConfirmation('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to update your password.')
    } finally {
      setSubmitting(false)
    }
  }
  return <main className="auth-screen"><div className="auth-topline"><Link to="/login">← Back to login</Link></div><h1>Choose a new password</h1><p>Set a new password for your CareGrid SA account.</p>{status && <div className="success-card" role="status">{status}</div>}{error && <div className="error-card" role="alert">{error}</div>}<form className="stack" onSubmit={submit}><TextField label="New password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="new-password" required /><TextField label="Confirm new password" type="password" value={confirmation} onChange={event => setConfirmation(event.target.value)} autoComplete="new-password" required /><Button type="submit" disabled={submitting}>{submitting ? 'Updating…' : 'Update Password'}</Button></form></main>
}
