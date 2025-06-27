export function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.')
    const { exp } = JSON.parse(atob(payload))
    return Date.now() >= exp * 1000
  } catch {
    return true
  }
}