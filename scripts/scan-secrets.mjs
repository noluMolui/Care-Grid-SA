import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ignored = new Set(['.git', 'node_modules', 'dist'])
const patterns = [/service_role/i, /eyJ[A-Za-z0-9_-]{20,}\./, /\.env$/]
const findings = []

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue
    const path = join(directory, entry)
    if (statSync(path).isDirectory()) walk(path)
    else if (path !== join(process.cwd(), 'scripts', 'scan-secrets.mjs')) {
      const text = readFileSync(path, 'utf8')
      if (patterns.some(pattern => pattern.test(text) || pattern.test(entry))) findings.push(path)
    }
  }
}

walk(process.cwd())
if (findings.length) {
  console.error(`Potential secrets found in: ${findings.join(', ')}`)
  process.exitCode = 1
} else {
  console.log('No secrets detected')
}
