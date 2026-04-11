import { auth } from '../lib/firebase'

const BASE_URL = import.meta.env.VITE_API_URL

async function waitForAuth() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

async function getAuthToken() {
  let user = auth.currentUser

  if (!user) {
    user = await waitForAuth() as any;
  }

  if (!user) return null

  try {
    return await user.getIdToken(false)
  } catch (error) {
    console.error("Error getting Firebase token:", error)
    return null
  }
}

async function request<T>(
  url: string,
  options?: RequestInit,
  includeUser = false
): Promise<T> {
  const finalUrl = `${BASE_URL}${url}`
  const headers = new Headers(options?.headers)

  headers.set('Content-Type', 'application/json')

  if (includeUser) {
    const token = await getAuthToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const res = await fetch(finalUrl, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    const error: any = new Error(errorData.error || errorData.message || 'שגיאת תקשורת');
    error.status = res.status;
    error.data = errorData;

    throw error;
  }

  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return res.json()
  }

  return {} as T
}

export const apiClient = {
  get: <T>(url: string) =>
    request<T>(url, { method: 'GET' }, true),

  post: <T>(url: string, body: unknown) =>
    request<T>(url, { method: 'POST', body: JSON.stringify(body) }, true),

  patch: <T>(url: string, body: unknown) =>
    request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }, true),

  delete: <T>(url: string) =>
    request<T>(url, { method: 'DELETE' }, true),
}