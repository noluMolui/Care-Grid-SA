export function Header({ title, showBack = false, onBack }: { title: string; showBack?: boolean; onBack?: () => void }) {
  return <header className="header">{showBack && <button className="header__back" aria-label="Back" onClick={onBack}>←</button>}<h1 className="header__title">{title}</h1></header>
}
