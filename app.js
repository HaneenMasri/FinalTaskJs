const apiUrl = "http://localhost:3000/blogs";
const blogsContainer = document.getElementById("blogs-container");
const blogForm = document.getElementById("blog-form");
const formError = document.getElementById("form-error");

// Fetch and render blogs
async function getBlogs() {
  blogsContainer.innerHTML = "";
  const res = await fetch(apiUrl);
  const blogs = await res.json();

  blogs.forEach(blog => {
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blog-item");

// randomImg
    const randomImg = `https://picsum.photos/400/200?random=${Math.floor(Math.random() * 1000)}`;

    blogDiv.innerHTML = `
      <div class="img" style="background-image:url('${randomImg}')"></div>
      <div class="delete-icon" data-id="${blog.id}">X</div>
      <h3>${blog.title}</h3>
      <p>${blog.description}</p>
    `;
    blogsContainer.appendChild(blogDiv);
  });

  document.querySelectorAll(".delete-icon").forEach(icon => {
    icon.addEventListener("click", async () => {
      const id = icon.getAttribute("data-id");
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      getBlogs();
    });
  });
}

// Form validation regex
function validateTitle(title) {
  return /^[A-Z][A-Za-z ]{0,49}$/.test(title);
}

function validateDescription(desc) {
  return /^[A-Za-z ]{0,1000}$/.test(desc);
}

// Handle new blog submission
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!validateTitle(title)) {
    formError.textContent = "Title must start with capital, max 50 chars, only English letters and spaces.";
    return;
  }

  if (!validateDescription(description)) {
    formError.textContent = "Description max 1000 chars, only English letters and spaces.";
    return;
  }

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  blogForm.reset();
  formError.textContent = "";
  getBlogs();
});

// Initial load
getBlogs();
