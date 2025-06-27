
import jwt from 'jsonwebtoken'

const USERS = {
  admin: { password: 'admin123', role: 'admin' },
  editor: { password: 'editme', role: 'editor' }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  const user = USERS[username]
  if (!user || user.password !== password) {
    return { error: 'Invalid credentials' }
  }

  const token = jwt.sign({ username, role: user.role }, 'socal-secret', { expiresIn: '2h' })
  return { token, role: user.role }
})
