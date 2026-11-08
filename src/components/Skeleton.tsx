export function Skeleton({ label = 'Loading' }: { label?: string }) {
  return <div aria-label={label} className="card" style={{ minHeight: 44, opacity: .5 }} />
}
