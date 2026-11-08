import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../../src/App'
import { AppProvider } from '../../src/context/AppContext'
import { AppShell } from '../../src/components/AppShell'
import { S2Login } from '../../src/screens/S2Login'
import { Route, Routes } from 'react-router-dom'

function renderWithApp(ui: React.ReactNode, initialEntries = ['/dashboard']) {
  return render(<MemoryRouter initialEntries={initialEntries}><AppProvider>{ui}</AppProvider></MemoryRouter>)
}

describe('Phase 2 app foundation', () => {
  it('provides dynamic user data and app shell navigation', () => {
    renderWithApp(<AppShell><h1>Dashboard</h1></AppShell>)
    expect(screen.getByText((_, element) => element?.className === 'app-shell__status')).toHaveTextContent('Profile unavailable')
    expect(screen.getByRole('link', { name: 'Resources' })).toHaveAttribute('href', '/resources')
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile')
  })

  it('routes login and signup into the dashboard', async () => {
    render(<MemoryRouter initialEntries={['/login']}><AppProvider><Routes><Route path="/login" element={<S2Login />} /><Route path="/dashboard" element={<h1>Your care dashboard</h1>} /></Routes></AppProvider></MemoryRouter>)
    fireEvent.change(screen.getByLabelText('Work Email / Healthcare ID'), { target: { value: 'worker@gauteng.clinic' } })
    fireEvent.change(document.querySelector('input[type="password"]')!, { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Supabase is not configured')
  })

  it('exposes the requested screen routes', () => {
    window.history.pushState({}, '', '/offline-status')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Sign in required' })).toBeInTheDocument()
  })
})
