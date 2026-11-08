import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { S1Welcome } from './screens/S1Welcome'
import './index.css'

function Placeholder({ title }: { title: string }) {
  return <main className="app"><h1>{title}</h1></main>
}

export default function App() {
  return <BrowserRouter><div className="app"><Routes><Route path="/" element={<S1Welcome />} /><Route path="/signup" element={<Placeholder title="Create Account" />} /><Route path="/login" element={<Placeholder title="Welcome Back" />} /><Route path="*" element={<Placeholder title="CareGrid SA" />} /></Routes></div></BrowserRouter>
}
