import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextArea } from '../../src/components/TextArea'

describe('TextArea', () => {
  it('shows a character counter', () => {
    render(<TextArea label="Notes" value="hello" maxLength={10} onChange={() => undefined} />)
    expect(screen.getByText('5 / 10')).toBeInTheDocument()
  })
})
