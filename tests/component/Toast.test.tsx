import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Toast } from '../../src/components/Toast'

describe('Toast', () => {
  it('shows a visible message', () => {
    render(<Toast message="Saved" />)
    expect(screen.getByRole('status')).toHaveTextContent('Saved')
  })
})
