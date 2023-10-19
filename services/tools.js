export const getHTTPFormat = async ({ url }) => {
  const res = await fetch(`/api${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const postHTTPFormat = async ({ url, newData }) => {
  const res = await fetch(`/api${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  return result
}

export const updateHTTPFormat = async ({ url, newData }) => {
  const res = await fetch(`/api${url}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  return result
}

export const deleteHTTPFormat = async ({ url }) => {
  const res = await fetch(`/api${url}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
export const hasBlankValue = array => {
  return array.some(value => /^\s*$/.test(value))
}