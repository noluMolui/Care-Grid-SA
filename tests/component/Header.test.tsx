import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from '../../src/components/Header'

describe('Header', () => {
  it('shows title and optional back control', () => {
    render(<Header title="Create Account" showBack onBack={() => undefined} />)
    expect(screen.getByText('Create Account')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
})
