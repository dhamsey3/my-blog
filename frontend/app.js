async function render() {
  const appendList = (id, items, formatter) => {
    const ul = document.getElementById(id);
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = formatter(item);
      ul.appendChild(li);
    });
  };

  const displayError = (id, message) => {
    const ul = document.getElementById(id);
    const li = document.createElement('li');
    li.textContent = message;
    ul.appendChild(li);
  };

  const sections = [
    { id: 'games', path: 'games', formatter: g => g.name, error: 'Failed to load games.' },
    { id: 'predictions', path: 'predictions', formatter: p => p.question, error: 'Failed to load predictions.' },
    { id: 'challenges', path: 'challenges', formatter: c => `${c.name} – ${c.reward}`, error: 'Failed to load challenges.' },
    { id: 'leaderboard', path: 'leaderboard', formatter: u => `${u.user}: ${u.points}`, error: 'Failed to load leaderboard.' }
  ];

  await Promise.all(
    sections.map(async ({ id, path, formatter, error }) => {
      try {
        const items = await fetchList(path, 1);
        appendList(id, items, formatter);
      } catch (err) {
        console.error(error, err);
        displayError(id, error);
      }
    })
  );
}

render();
