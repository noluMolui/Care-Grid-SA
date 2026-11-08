import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SelectField } from '../../src/components/SelectField'

describe('SelectField', () => {
  it('renders its options', () => {
    render(<SelectField label="Role" value="" onChange={() => undefined} options={['Nurse', 'Doctor']} />)
    expect(screen.getByRole('option', { name: 'Nurse' })).toBeInTheDocument()
  })
})
