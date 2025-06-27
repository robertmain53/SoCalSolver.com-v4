const fs = require('fs')
const path = require('path')

const analyticsPath = path.resolve(__dirname, '../public/analytics/mock.json')
const reportPath = path.resolve(__dirname, '../public/analytics/weekly-report.json')

const raw = JSON.parse(fs.readFileSync(analyticsPath, 'utf-8'))
const totals = {}

for (const day of Object.keys(raw)) {
  for (const slug of Object.keys(raw[day])) {
    totals[slug] = (totals[slug] || 0) + raw[day][slug]
  }
}

const sorted = Object.entries(totals)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)

const report = {
  generatedAt: new Date().toISOString(),
  topCalculators: sorted.map(([slug, views]) => ({ slug, views }))
}

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8')
console.log('✅ Weekly report generated at:', reportPath)