import { useMemo, useState } from 'react'

const resources = [['Burnout reset', 'Burnout'], ['Know your workplace rights', 'Legal Rights'], ['Safety planning', 'Safety'], ['Mental health first aid', 'Mental Health']]
export function S7Resources() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const filtered = useMemo(() => resources.filter(([title, type]) => (category === 'All' || type === category) && title.toLowerCase().includes(query.toLowerCase())), [category, query])
  return <main className="screen"><h1>Resources</h1><input className="field__control" placeholder="Search resources" value={query} onChange={event => setQuery(event.target.value)} /><div className="filter-row">{['All', 'Burnout', 'Legal Rights', 'Safety', 'Mental Health'].map(item => <button className="chip" key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="stack">{filtered.map(([title, type]) => <article className="card resource-row" key={title}><div><strong>{title}</strong><span>{type}</span></div><button aria-label={`Bookmark ${title}`} onClick={() => setBookmarks(current => current.includes(title) ? current.filter(item => item !== title) : [...current, title])}>{bookmarks.includes(title) ? 'Saved' : 'Save'}</button></article>)}</div></main>
}
