import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'
import { useAppContext } from '../context/AppContext'

export function S2Login() {
  const navigate = useNavigate()
  const { signIn, authError } = useAppContext()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to sign in.')
    } finally {
      setSubmitting(false)
    }
  }
  return <main className="auth-screen auth-screen--login"><div className="auth-brand"><span className="auth-brand__mark">✚</span><strong>CareGrid SA</strong><small>CLINICIAN SUPPORT</small></div><div className="state-strip"><span>Secure sign-in</span><span>POPIA protected</span></div><h1>Welcome Back</h1><p className="auth-lede">Access your confidential operational wellness space.</p>
    {(authError || error) && <div className="error-card" role="alert">{error ?? authError}</div>}
    <form className="stack" onSubmit={submit}>
      <TextField label="Work Email / Healthcare ID" type="email" placeholder="name@facility.co.za" value={email} onChange={event => setEmail(event.target.value)} required />
      <label className="field"><span className="field__label">Password</span><span className="input-with-action"><input className="field__control" type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} required /><button type="button" className="input-action" onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Hide' : 'Show'}</button></span></label>
      <label className="checkbox"><input type="checkbox" /> Remember me</label>
      <Link className="auth-link" to="/forgot-password">Forgot Password?</Link>
      <Button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Log In'}</Button>
    </form>
    <p className="auth-footer">New to CareGrid? <Link to="/signup">Create an account</Link></p>
  </main>
}
