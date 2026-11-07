const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const apiRequest = async (path, options) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    throw new Error(
      'The server returned a page instead of API data. Check that the backend is running and VITE_API_URL points to it.'
    );
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
};
