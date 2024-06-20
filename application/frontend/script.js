document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts');

  // Function to fetch posts from backend API and render them
  const fetchAndRenderPosts = () => {
    fetch('/api/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then(posts => {
        postsContainer.innerHTML = ''; // Clear existing posts
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
  };

  // Initial fetch and render posts on page load
  fetchAndRenderPosts();

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
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create post');
        }
        return response.json();
      })
      .then(data => {
        console.log('Post created:', data);
        fetchAndRenderPosts(); // Fetch and render posts again after successful submission
        form.reset(); // Optionally clear the form after submission
      })
      .catch(error => console.error('Error creating post:', error));
    });
  }
});
