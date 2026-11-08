import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }

export function TextField({ label, error, id, ...props }: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replaceAll(' ', '-')
  return <label className="field" htmlFor={fieldId}><span className="field__label">{label}</span><input id={fieldId} aria-label={label} className="field__control" {...props} />{error && <span className="field__error">{error}</span>}</label>
}
