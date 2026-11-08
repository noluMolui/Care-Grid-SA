import { BrowserRouter, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AppProvider } from './context/AppContext'
import { AppShell } from './components/AppShell'
import { S1Welcome } from './screens/S1Welcome'
import { S2Login } from './screens/S2Login'
import { S2ForgotPassword } from './screens/S2ForgotPassword'
import { S3Signup } from './screens/S3Signup'
import { S4Dashboard } from './screens/S4Dashboard'
import { S5PeerSupport } from './screens/S5PeerSupport'
import { S6CrisisHelp } from './screens/S6CrisisHelp'
import { S7Resources } from './screens/S7Resources'
import { S8WellnessTracker } from './screens/S8WellnessTracker'
import { S9Community } from './screens/S9Community'
import { S10Escalate } from './screens/S10Escalate'
import { S11Profile } from './screens/S11Profile'
import { S12OfflineStatus } from './screens/S12OfflineStatus'
import { useAppContext } from './context/AppContext'
import './index.css'

function ShellRoute({ children }: { children: ReactNode }) {
  const { authLoading, authUser, authError } = useAppContext()
  if (authLoading) return <main className="screen"><div className="card">Loading secure session…</div></main>
  if (!authUser) return <main className="auth-screen"><h1>Sign in required</h1><p>{authError ?? 'Your secure session has expired. Sign in to continue.'}</p><a className="button button--primary" href="/login">Go to Log In</a></main>
  return <AppShell>{children}</AppShell>
}

export default function App() {
  return <BrowserRouter><AppProvider><div className="app"><Routes>
    <Route path="/" element={<S1Welcome />} />
    <Route path="/login" element={<S2Login />} />
    <Route path="/signup" element={<S3Signup />} />
    <Route path="/dashboard" element={<ShellRoute><S4Dashboard /></ShellRoute>} />
    <Route path="/peer-support" element={<ShellRoute><S5PeerSupport /></ShellRoute>} />
    <Route path="/crisis-help" element={<ShellRoute><S6CrisisHelp /></ShellRoute>} />
    <Route path="/resources" element={<ShellRoute><S7Resources /></ShellRoute>} />
    <Route path="/wellness-tracker" element={<ShellRoute><S8WellnessTracker /></ShellRoute>} />
    <Route path="/community" element={<ShellRoute><S9Community /></ShellRoute>} />
    <Route path="/escalate" element={<ShellRoute><S10Escalate /></ShellRoute>} />
    <Route path="/profile" element={<ShellRoute><S11Profile /></ShellRoute>} />
    <Route path="/offline-status" element={<ShellRoute><S12OfflineStatus /></ShellRoute>} />
    <Route path="/forgot-password" element={<S2ForgotPassword />} />
    <Route path="*" element={<S1Welcome />} />
  </Routes></div></AppProvider></BrowserRouter>
}
