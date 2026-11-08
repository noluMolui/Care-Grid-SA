import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'

export function S2Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  return <main className="auth-screen auth-screen--login"><div className="auth-brand"><span className="auth-brand__mark">✚</span><strong>CareGrid SA</strong><small>CLINICIAN SUPPORT</small></div><div className="state-strip"><span>Secure sign-in</span><span>POPIA protected</span></div><h1>Welcome Back</h1><p className="auth-lede">Access your confidential operational wellness space.</p>
    <form className="stack" onSubmit={(event) => { event.preventDefault(); navigate('/dashboard') }}>
      <TextField label="Work Email / Healthcare ID" type="email" placeholder="name@facility.co.za" required />
      <label className="field"><span className="field__label">Password</span><span className="input-with-action"><input className="field__control" type={showPassword ? 'text' : 'password'} required /><button type="button" className="input-action" onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Hide' : 'Show'}</button></span></label>
      <label className="checkbox"><input type="checkbox" /> Remember me</label>
      <Link className="auth-link" to="/forgot-password">Forgot Password?</Link>
      <Button type="submit">Log In</Button>
    </form>
    <p className="auth-footer">New to CareGrid? <Link to="/signup">Create an account</Link></p>
  </main>
}
