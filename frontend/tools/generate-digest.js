
const fs = require('fs')
const path = require('path')

const logPath = path.join(__dirname, '..', 'logs', 'usage-log.json')
const outPath = path.join(__dirname, '..', 'reports', 'weekly-digest.json')

// Load and parse log
if (!fs.existsSync(logPath)) {
  console.error('No usage log found.')
  process.exit(1)
}
const raw = fs.readFileSync(logPath, 'utf8')
const entries = JSON.parse(raw)

const now = new Date()
const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

const weekly = entries.filter(e => new Date(e.time) >= oneWeekAgo)

const countBySlug = {}
const countByDay = {}

weekly.forEach(e => {
  const day = e.time.slice(0, 10)
  countBySlug[e.slug] = (countBySlug[e.slug] || 0) + 1
  countByDay[day] = (countByDay[day] || 0) + 1
})

const top = Object.entries(countBySlug)
  .sort((a, b) => b[1] - a[1])
  .map(([slug, count]) => ({ slug, count }))

const days = Object.entries(countByDay)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([date, count]) => ({ date, count }))

const summary = {
  generatedAt: now.toISOString(),
  totalViews: weekly.length,
  topCalculators: top.slice(0, 5),
  dailyViews: days
}

if (!fs.existsSync(path.dirname(outPath))) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
}

fs.writeFileSync(outPath, JSON.stringify(summary, null, 2))
console.log('✅ Weekly digest written to reports/weekly-digest.json')
