/** @jest-environment jsdom */

describe('render', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="games"></ul>
      <ul id="predictions"></ul>
      <ul id="challenges"></ul>
      <ul id="leaderboard"></ul>
    `;
  });

  afterEach(() => {
    delete global.fetchList;
    jest.resetModules();
  });

  test('populates lists and shows errors', async () => {
    global.fetchList = jest.fn((path) => {
      if (path === 'games') {
        return Promise.resolve([{ name: 'Trivia' }]);
      }
      return Promise.reject(new Error('fail'));
    });

    const { render } = require('../app');
    await render();

    expect(document.querySelector('#games li').textContent).toBe('Trivia');
    expect(document.querySelector('#predictions li').textContent).toBe('Failed to load predictions.');
  });
});
