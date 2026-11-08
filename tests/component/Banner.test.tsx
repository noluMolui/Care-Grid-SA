import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Banner } from '../../src/components/Banner'

describe('Banner', () => {
  it('shows its message and variant', () => {
    render(<Banner variant="offline">Offline mode</Banner>)
    expect(screen.getByText('Offline mode')).toHaveClass('banner--offline')
  })
})
