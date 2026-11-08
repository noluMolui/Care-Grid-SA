import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
vi.mock('../../src/lib/supabase', () => ({ supabase: null, supabaseConfigError: null }))
import App from '../../src/App'

describe('app foundation', () => {
  it('shows CareGrid SA at the root route', () => {
    window.history.replaceState({}, '', '/')
    render(<App />)
    expect(screen.getByText('CareGrid SA')).toBeInTheDocument()
  })
})
