document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts');
  const postForm = document.getElementById('postForm');

  // Fetch all posts and display them
  fetch('http://backend-server-public-ip/api/posts')
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error fetching posts:', error));

  // Handle form submission
  postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    fetch('http://backend-server-public-ip/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: postTitle, content: postContent }),
    })
    .then(response => response.json())
    .then(newPost => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3>${newPost.title}</h3>
        <p>${newPost.content}</p>
      `;
      postsContainer.appendChild(postElement);
      postForm.reset(); // Clear form inputs after successful submission
    })
    .catch(error => console.error('Error creating post:', error));
  });
});
