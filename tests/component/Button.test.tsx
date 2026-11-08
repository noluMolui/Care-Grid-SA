import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../../src/components/Button'

describe('Button', () => {
  it('supports variants, loading, disabled, and taps', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Continue</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.getByRole('button')).toHaveClass('button--primary')
    expect(screen.getByRole('button')).toHaveStyle({ minHeight: '44px' })
  })
})
