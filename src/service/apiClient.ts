import { auth } from '../lib/firebase'

const BASE_URL = 'http://localhost:3000'

async function getUserId() {
  return auth.currentUser?.uid
}

async function request<T>(
  url: string,
  options?: RequestInit,
  includeUser = false
): Promise<T> {
  let finalUrl = `${BASE_URL}${url}`
  let body = options?.body ? JSON.parse(options.body as string) : undefined

  const userId = await getUserId()

  // 👉 הוספת userId ל־GET (query param)
  if (includeUser && userId && (!options || options.method === 'GET')) {
    const separator = finalUrl.includes('?') ? '&' : '?'
    finalUrl += `${separator}userId=${userId}`
  }

  // 👉 הוספת userId ל־POST / PATCH
  if (includeUser && userId && body) {
    body.userId = userId
  }

  // PRODUCTION:
  // instead of userId in - query/body,
  // we send Firebase token:
  //
  // const token = await auth.currentUser?.getIdToken()
  // headers: {
  //   Authorization: `Bearer ${token}`
  // }
  //
  // server recognizes user by - token, not by userId in body/query

  const res = await fetch(finalUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
    body: body ? JSON.stringify(body) : options?.body,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'API Error')
  }

  return res.json()
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url, { method: 'GET' }, true),

  post: <T>(url: string, body: unknown) =>
    request<T>(url, { method: 'POST', body: JSON.stringify(body) }, true),

  patch: <T>(url: string, body: unknown) =>
    request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }, true),

  delete: <T>(url: string) =>
    request<T>(url, { method: 'DELETE' }, true),
}