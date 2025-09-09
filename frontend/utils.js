async function fetchList(path, limit) {
  const res = await fetch(`/api/${path}?limit=${limit}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

if (typeof module !== 'undefined') {
  module.exports = { fetchList };
} else {
  window.fetchList = fetchList;
}
