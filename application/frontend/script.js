document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts');

  // Fetch posts from backend API
  fetch('/api/posts')
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          ${post.image ? `<img src="${post.image}" alt="Post image" class="img-fluid">` : ''}
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error fetching posts:', error));

  // Handle form submission for new posts
  const form = document.getElementById('compose-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);

      fetch('/api/posts', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Post created:', data);
        location.reload(); // Reload page to see the new post
      })
      .catch(error => console.error('Error creating post:', error));
    });
  }
});
