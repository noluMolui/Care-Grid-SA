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
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signUp({ email, password, fullName, role, facility })
      navigate('/dashboard')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to create your account.')
    } finally {
      setSubmitting(false)
    }
  }
  return <main className="auth-screen auth-screen--signup"><div className="auth-topline"><a href="/">← Back</a><span>Step 1 of 1</span></div><h1>Create Account</h1><p className="auth-lede">Build your secure, anonymous clinician profile.</p>
    {(authError || error) && <div className="error-card" role="alert">{error ?? authError}</div>}
    <form className="stack" onSubmit={submit}>
      <TextField label="Full name" placeholder="Your name" value={fullName} onChange={event => setFullName(event.target.value)} required />
      <SelectField label="Facility / Role" options={['Community Health Worker', 'Nurse', 'Clinic Support', 'Facilitator']} value={role} onChange={event => setRole(event.target.value as typeof role)} required />
      <TextField label="Facility" placeholder="Gauteng Clinic" value={facility} onChange={event => setFacility(event.target.value)} required />
      <TextField label="Email / Phone" placeholder="name@facility.co.za" value={email} onChange={event => setEmail(event.target.value)} required />
      <TextField label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={event => setPassword(event.target.value)} minLength={8} required />
      <label className="checkbox"><input type="checkbox" required /> I agree to the POPIA Privacy Terms</label>
      <Button type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Sign Up'}</Button>
    </form>
    <p className="auth-footer">Already registered? <a href="/login">Log In</a></p>
  </main>
}
