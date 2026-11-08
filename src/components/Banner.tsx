import type { PropsWithChildren } from 'react'

export function Banner({ children, variant = 'info' }: PropsWithChildren<{ variant?: 'info' | 'warning' | 'error' | 'offline' }>) {
  return <div className={`banner banner--${variant}`} role="status">{children}</div>
}
