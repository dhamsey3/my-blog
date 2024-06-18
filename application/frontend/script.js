document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts');

  // Fetch posts from backend API
  fetch('http://backend-server-public-ip/api/posts')
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error fetching posts:', error));
});
