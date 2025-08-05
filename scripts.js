document.addEventListener('DOMContentLoaded', function () {
  // Load header dynamically
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      // theme toggle setup here
      const themeToggle = document.getElementById('theme-toggle');
      const body = document.body;

      if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
      }

      themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
          themeToggle.textContent = '☀️';
        } else {
          localStorage.setItem('theme', 'light');
          themeToggle.textContent = '🌙';
        }
      });
    })
    .catch(error => console.error('Error loading header:', error));

  // Load footer dynamically
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));


  // Load blog posts dynamically
  const blogList = document.getElementById('blog-list');
  if (blogList) {
    fetch('data/posts.json')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          const postElement = document.createElement('article');
          postElement.classList.add('post');

          postElement.innerHTML = `
            <header>
              <h2>${post.title}</h2>
              <time datetime="${post.date}">${new Date(post.date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}</time>
            </header>
            <p>${post.content}</p>
          `;

          blogList.appendChild(postElement);
        });
      })
      .catch(error => console.error('Error loading blog posts:', error));
  }
});
