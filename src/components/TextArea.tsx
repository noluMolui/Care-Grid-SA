import type { TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; maxLength?: number }

export function TextArea({ label, id, maxLength, value, ...props }: TextAreaProps) {
  const fieldId = id ?? label.toLowerCase().replaceAll(' ', '-')
  const length = typeof value === 'string' ? value.length : 0
  return <label className="field" htmlFor={fieldId}><span className="field__label">{label}</span><textarea id={fieldId} className="field__control" maxLength={maxLength} value={value} {...props} />{maxLength !== undefined && <span className="field__error" style={{ color: length > maxLength ? '#DC2626' : '#1E293B' }}>{length} / {maxLength}</span>}</label>
}
