import { render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { S1Welcome } from '../../src/screens/S1Welcome'

function LocationProbe() {
  return <output data-testid="location">{useLocation().pathname}</output>
}

describe('S1 Welcome', () => {
  it('shows the required welcome content', () => {
    render(<MemoryRouter><S1Welcome /></MemoryRouter>)
    expect(screen.getByText('CareGrid SA')).toBeInTheDocument()
    expect(screen.getByText('Operational Wellness for SA Healthcare Workers')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument()
  })

  it('shows the offline crisis-lines banner when offline', () => {
    render(<MemoryRouter><S1Welcome offline /></MemoryRouter>)
    expect(screen.getByText('Offline mode -- emergency crisis lines active')).toBeInTheDocument()
  })

  it('navigates to sign up and log in', async () => {
    const { fireEvent } = await import('@testing-library/react')
    const { rerender } = render(<MemoryRouter><S1Welcome /><LocationProbe /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Get Started' }))
    expect(screen.getByTestId('location')).toHaveTextContent('/signup')
    rerender(<MemoryRouter initialEntries={['/']}><S1Welcome /><LocationProbe /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }))
    expect(screen.getByTestId('location')).toHaveTextContent('/login')
  })
})
