import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { SelectField } from '../components/SelectField'
import { TextField } from '../components/TextField'

export function S3Signup() {
  const navigate = useNavigate()
  return <main className="auth-screen auth-screen--signup"><div className="auth-topline"><a href="/">← Back</a><span>Step 1 of 1</span></div><h1>Create Account</h1><p className="auth-lede">Build your secure, anonymous clinician profile.</p>
    <form className="stack" onSubmit={(event) => { event.preventDefault(); navigate('/dashboard') }}>
      <TextField label="Full name" placeholder="Your name" required />
      <SelectField label="Facility / Role" options={['Community Health Worker', 'Nurse', 'Clinic Support', 'Facilitator']} required />
      <TextField label="Email / Phone" placeholder="name@facility.co.za" required />
      <TextField label="Password" type="password" placeholder="At least 8 characters" minLength={8} required />
      <label className="checkbox"><input type="checkbox" required /> I agree to the POPIA Privacy Terms</label>
      <Button type="submit">Sign Up</Button>
    </form>
    <p className="auth-footer">Already registered? <a href="/login">Log In</a></p>
  </main>
}
