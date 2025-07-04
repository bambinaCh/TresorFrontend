// FRONTEND – src/api.js
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("jwt");

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  return fetch(url, { ...options, headers });
}
