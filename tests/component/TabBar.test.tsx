import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TabBar } from '../../src/components/TabBar'

describe('TabBar', () => {
  it('shows the four primary tabs', () => {
    render(<TabBar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Circles')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })
})
