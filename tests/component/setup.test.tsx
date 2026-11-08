import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../../src/App'

describe('app foundation', () => {
  it('shows CareGrid SA at the root route', () => {
    window.history.replaceState({}, '', '/')
    render(<App />)
    expect(screen.getByText('CareGrid SA')).toBeInTheDocument()
  })
})
