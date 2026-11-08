import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
}>

export function Button({ children, variant = 'primary', loading = false, disabled, ...props }: ButtonProps) {
  return <button className={`button button--${variant}`} style={{ minHeight: '44px' }} disabled={disabled || loading} {...props}>{loading ? 'Loading...' : children}</button>
}
