const { fetchList } = require('../utils');

describe('fetchList', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('calls fetch with correct URL and returns data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1 }])
      })
    );
    const data = await fetchList('games', 2);
    expect(global.fetch).toHaveBeenCalledWith('/api/games?limit=2');
    expect(data).toEqual([{ id: 1 }]);
  });

  test('throws on non-ok response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    await expect(fetchList('games', 1)).rejects.toThrow('Network response was not ok');
  });
});
