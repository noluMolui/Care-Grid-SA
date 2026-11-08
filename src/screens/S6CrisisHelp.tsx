import { useState } from 'react'

const contacts = [['SADAG Healthcare Line', '0800567567'], ['GBV Command Centre', '0800428428'], ['Emergency Services', '10111']]
export function S6CrisisHelp() {
  const [step, setStep] = useState(0)
  return <main className="screen"><h1>Crisis Help</h1><p>You are not alone. Immediate support is available.</p><div className="stack">{contacts.map(([label, number]) => <a className="resource-card" href={`tel:${number}`} key={number}><strong>{label}</strong><span>{number}</span></a>)}</div><section className="card"><h2>De-escalation tool</h2><p>{['Pause and place both feet on the floor.', 'Breathe in for four counts and out for six.', 'Name one safe person you can contact.'][step]}</p><button className="button button--secondary" onClick={() => setStep((step + 1) % 3)}>Next step</button></section></main>
}
