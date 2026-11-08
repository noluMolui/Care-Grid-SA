import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'
import { useAppContext } from '../context/AppContext'

export function S2ForgotPassword() {
  const { resetPassword } = useAppContext()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus(null)
    setError(null)
    setSubmitting(true)
    try {
      await resetPassword(email)
      setStatus('If an account exists for this email, a secure password reset link has been sent.')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to send the reset link.')
    } finally {
      setSubmitting(false)
    }
  }
  return <main className="auth-screen"><div className="auth-topline"><Link to="/login">← Back to login</Link></div><h1>Reset password</h1><p>Enter your work email and we will send a secure recovery link.</p>{status && <div className="success-card" role="status">{status}</div>}{error && <div className="error-card" role="alert">{error}</div>}<form className="stack" onSubmit={submit}><TextField label="Work Email / Healthcare ID" type="email" value={email} onChange={event => setEmail(event.target.value)} required /><Button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send Reset Link'}</Button></form></main>
}
