const createFetchError = res =>
  new Error(`Failed to fetch(${res.status}): ${res.statusText}`)

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const response = await fetch(url);
  if (!response.ok) throw createFetchError(response)
  return response.arrayBuffer();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw createFetchError(response)
  return response.json();
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const response = await fetch (url, {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream',
    },  
  });
  if (!response.ok) throw createFetchError(response)
  return response;
  console.log(response.json());
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);

  const response = await fetch(url, {
    method: 'POST',
    body: jsonString,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw createFetchError(response)
  return response.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
