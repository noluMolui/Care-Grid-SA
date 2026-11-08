import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { S1Welcome } from '../../src/screens/S1Welcome'

describe('S1 Welcome', () => {
  it('shows the required welcome content', () => {
    render(<S1Welcome />)
    expect(screen.getByText('CareGrid SA')).toBeInTheDocument()
    expect(screen.getByText('Operational Wellness for SA Healthcare Workers')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument()
  })

  it('shows the offline crisis-lines banner when offline', () => {
    render(<S1Welcome offline />)
    expect(screen.getByText('Offline mode -- emergency crisis lines active')).toBeInTheDocument()
  })
})
