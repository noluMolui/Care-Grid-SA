import type { SelectHTMLAttributes } from 'react'

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[]; error?: string }

export function SelectField({ label, options, error, id, ...props }: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replaceAll(' ', '-')
  return <label className="field" htmlFor={fieldId}><span className="field__label">{label}</span><select id={fieldId} className="field__control" {...props}><option value="">Select</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select>{error && <span className="field__error">{error}</span>}</label>
}
