import { describe, it, expect } from 'vitest'
import { parseQuizBlocks } from '@/utils/markdown'

describe('Quiz Block Parser', () => {
  it('parses a :::challenge block with MCQ', () => {
    const md = `
:::challenge
**What is 2 + 2?**
- [ ] 3
- [x] 4
- [ ] 5
:::
`
    const result = parseQuizBlocks(md)
    expect(result).toHaveLength(1)
    expect(result[0].question).toContain('2 + 2')
    expect(result[0].answers).toContainEqual({ text: '4', correct: true })
  })
})
