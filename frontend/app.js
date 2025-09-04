async function fetchList(path) {
  const res = await fetch(`http://localhost:3000/api/${path}`);
  return res.json();
}

async function render() {
  const [games, predictions, challenges, leaderboard] = await Promise.all([
    fetchList('games'),
    fetchList('predictions'),
    fetchList('challenges'),
    fetchList('leaderboard')
  ]);

  const appendList = (id, items, formatter) => {
    const ul = document.getElementById(id);
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = formatter(item);
      ul.appendChild(li);
    });
  };

  appendList('games', games, g => g.name);
  appendList('predictions', predictions, p => p.question);
  appendList('challenges', challenges, c => `${c.name} – ${c.reward}`);
  appendList('leaderboard', leaderboard, u => `${u.user}: ${u.points}`);
}

render();
