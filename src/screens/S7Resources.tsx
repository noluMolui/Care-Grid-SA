import { useCallback, useEffect, useState } from 'react'
import { listResources, setResourceBookmark } from '../lib/repositories'
import type { Resource, ResourceCategory } from '../lib/supabase'
import { useAppContext } from '../context/AppContext'

const categories: Array<ResourceCategory | 'All'> = ['All', 'Burnout', 'Legal Rights', 'Safety', 'Mental Health']

export function S7Resources() {
  const { authUser } = useAppContext()
  const [resources, setResources] = useState<Resource[]>([])
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ResourceCategory | 'All'>('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const load = useCallback(async () => {
    if (!authUser) return
    setLoading(true)
    setError(null)
    try {
      const result = await listResources(authUser.id, category === 'All' ? undefined : category, query)
      setResources(result.resources)
      setBookmarkedIds(result.bookmarkedIds)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to load resources.')
    } finally {
      setLoading(false)
    }
  }, [authUser, category, query])
  useEffect(() => {
    const timer = window.setTimeout(() => { void load() }, 0)
    return () => window.clearTimeout(timer)
  }, [load])
  const toggleBookmark = async (resource: Resource) => {
    if (!authUser) return
    const bookmarked = bookmarkedIds.has(resource.id)
    try {
      await setResourceBookmark(authUser.id, resource.id, !bookmarked)
      setBookmarkedIds(current => {
        const next = new Set(current)
        if (bookmarked) next.delete(resource.id)
        else next.add(resource.id)
        return next
      })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to update bookmark.')
    }
  }
  return <main className="screen resources-list-screen"><div className="review-strip"><span>⌁ Live resources</span><strong>{loading ? 'Loading' : 'Connected'}</strong><span>Empty</span><span>Error</span></div><h1>Support &amp; Crisis Directory</h1><p>Zero-rated, 24/7 confidential mental health, clinical debriefing, and legal protection helplines for SA healthcare workers.</p><input className="field__control" placeholder="⌕  Search by issue (e.g. burnout, legal)" value={query} onChange={event => setQuery(event.target.value)} /><div className="filter-row">{categories.map(item => <button className={`chip ${category === item ? 'chip--active' : ''}`} key={item} onClick={() => setCategory(item)}>{item === 'All' ? 'All Helplines' : item}</button>)}</div>{error && <div className="error-card" role="alert">{error}<button className="button button--secondary" onClick={() => void load()}>Retry</button></div>}{loading && <div className="card">Loading resources…</div>}{!loading && !error && resources.length === 0 && <div className="empty-card">No resources found for this search.</div>}<div className="stack">{resources.map(resource => <article className="card resource-row" key={resource.id}><div><span className="resource-kicker">{resource.category}</span><strong>{resource.title}</strong><span>{resource.description}</span></div><button aria-label={`${bookmarkedIds.has(resource.id) ? 'Remove bookmark from' : 'Bookmark'} ${resource.title}`} onClick={() => void toggleBookmark(resource)}>{bookmarkedIds.has(resource.id) ? 'Saved' : 'Save'}</button></article>)}</div><div className="resource-footer">End-to-End Client Telephony · RSA Health Tech Act §14</div></main>
}
