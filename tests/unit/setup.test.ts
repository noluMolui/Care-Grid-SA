import { describe, expect, it } from 'vitest'
import { tokens } from '../../src/theme/tokens'

describe('design tokens', () => {
  it('uses the CareGrid palette', () => {
    expect(tokens.color.primary).toBe('#0B7A6B')
    expect(tokens.color.accent).toBe('#E8F5E9')
    expect(tokens.color.background).toBe('#F8FAFC')
    expect(tokens.color.text).toBe('#1E293B')
    expect(tokens.color.error).toBe('#DC2626')
  })
})
