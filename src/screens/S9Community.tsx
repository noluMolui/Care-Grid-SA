import { useState } from 'react'

export function S9Community() {
  const [open, setOpen] = useState(false)
  const [anonymous, setAnonymous] = useState(true)
  return <main className="screen"><h1>Community</h1><div className="filter-row"><span className="chip">General</span><span className="chip">Nursing</span><span className="chip">CHW</span></div><section className="stack"><article className="card"><strong>Making space after a difficult shift</strong><p>Anonymous peer reflection · 6 replies</p></article><article className="card"><strong>Small ways to reset between visits</strong><p>Community Health Workers · 3 replies</p></article></section><button className="button button--primary" onClick={() => setOpen(true)}>Create a post</button>{open && <div className="modal" role="dialog"><div className="card stack"><h2>New community post</h2><textarea className="field__control" placeholder="Share what may help a peer" /><label className="checkbox"><input type="checkbox" checked={anonymous} onChange={event => setAnonymous(event.target.checked)} /> Post anonymously</label><button className="button button--primary" onClick={() => setOpen(false)}>Publish</button></div></div>}</main>
}
