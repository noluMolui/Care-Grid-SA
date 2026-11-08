import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextField } from '../../src/components/TextField'

describe('TextField', () => {
  it('shows its label, placeholder, and an error', () => {
    render(<TextField label="Email" placeholder="work@hospital.co.za" error="Required" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', 'work@hospital.co.za')
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
