import { useState } from 'react'

const facilitators = ['Naledi · Nursing support', 'Sipho · Community care', 'Amina · Mental health first aid']
export function S5PeerSupport() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)
  return <main className="screen"><h1>Peer Support</h1><p>Connect with a trained peer facilitator.</p><select className="field__control" value={filter} onChange={event => setFilter(event.target.value)}><option>All</option><option>Nursing</option><option>Community</option></select><div className="stack">{facilitators.map(name => <article className="card" key={name}><h2>{name}</h2><p>Available for a confidential check-in.</p><button className="button button--primary" onClick={() => setSelected(name)}>Request a match</button></article>)}</div>{selected && <div className="modal" role="dialog"><div className="card"><h2>Request peer match</h2><p>Send a confidential request to {selected}?</p><button className="button button--primary" onClick={() => setSelected(null)}>Send request</button><button className="button button--secondary" onClick={() => setSelected(null)}>Cancel</button></div></div>}</main>
}
