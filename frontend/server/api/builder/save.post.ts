
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = nanoid(8)
  const filePath = join(process.cwd(), 'drafts', `${id}.calcbundle.json`)

  await writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8')
  return { success: true, id }
})
