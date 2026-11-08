import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { SelectField } from '../components/SelectField'
import { TextField } from '../components/TextField'

export function S3Signup() {
  const navigate = useNavigate()
  return <main className="auth-screen"><h1>Create your account</h1><p>Join confidential support for frontline care teams.</p>
    <form className="stack" onSubmit={(event) => { event.preventDefault(); navigate('/dashboard') }}>
      <TextField label="Full name" placeholder="Your name" required />
      <SelectField label="Facility / Role" options={['Community Health Worker', 'Nurse', 'Clinic Support', 'Facilitator']} required />
      <TextField label="Email / Phone" placeholder="name@facility.co.za" required />
      <TextField label="Password" type="password" placeholder="At least 8 characters" minLength={8} required />
      <label className="checkbox"><input type="checkbox" required /> I agree to the POPIA privacy terms</label>
      <Button type="submit">Sign Up</Button>
    </form>
    <p>Already registered? <a href="/login">Log in</a></p>
  </main>
}
