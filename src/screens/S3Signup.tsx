import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { SelectField } from '../components/SelectField'
import { TextField } from '../components/TextField'
import { useAppContext } from '../context/AppContext'

export function S3Signup() {
  const navigate = useNavigate()
  const { signUp, authError } = useAppContext()
  const [fullName, setFullName] = useState('')
  const [facility, setFacility] = useState('')
  const [role, setRole] = useState<'Community Health Worker' | 'Nurse' | 'Clinic Support' | 'Facilitator'>('Community Health Worker')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    if (!fullName.trim() || !facility.trim() || !email.trim() || password.length < 8 || !termsAccepted) {
      setError('Complete all fields, use a password with at least 8 characters, and accept the POPIA Privacy Terms.')
      return
    }
    setSubmitting(true)
    try {
      await signUp({ email, password, fullName, role, facility })
      navigate('/dashboard')
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : 'Unable to create your account.'
      if (message.startsWith('Account created.')) setSuccess(message)
      else setError(message)
    } finally {
      setSubmitting(false)
    }
  }
  return <main className="auth-screen auth-screen--signup"><div className="auth-topline"><a href="/">← Back</a><span>Step 1 of 1</span></div><h1>Create Account</h1><p className="auth-lede">Build your secure, anonymous clinician profile.</p>
    {(authError || error) && <div className="error-card" role="alert">{error ?? authError}</div>}
    {success && <div className="success-card" role="status">{success} <a href="/login">Go to Log In</a></div>}
    <form className="stack" onSubmit={submit} noValidate>
      <TextField label="Full name" placeholder="Your name" value={fullName} onChange={event => setFullName(event.target.value)} />
      <SelectField label="Facility / Role" options={['Community Health Worker', 'Nurse', 'Clinic Support', 'Facilitator']} value={role} onChange={event => setRole(event.target.value as typeof role)} />
      <TextField label="Facility" placeholder="Gauteng Clinic" value={facility} onChange={event => setFacility(event.target.value)} />
      <TextField label="Email / Healthcare ID" type="email" placeholder="name@facility.co.za" value={email} onChange={event => setEmail(event.target.value)} />
      <TextField label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={event => setPassword(event.target.value)} minLength={8} />
      <label className="checkbox"><input type="checkbox" checked={termsAccepted} onChange={event => setTermsAccepted(event.target.checked)} /> I agree to the POPIA Privacy Terms</label>
      <Button type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Sign Up'}</Button>
    </form>
    <p className="auth-footer">Already registered? <a href="/login">Log In</a></p>
  </main>
}
