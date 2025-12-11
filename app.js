const apiUrl = "http://localhost:3000/blogs";
const blogsContainer = document.getElementById("blogs-container");
const blogForm = document.getElementById("blog-form");
const formError = document.getElementById("form-error");

// Fetch & Render blogs
async function getBlogs() {
  blogsContainer.innerHTML = "";

  const res = await fetch(apiUrl);
  const blogs = await res.json();

  blogs.forEach(blog => {
    const randomImg = `https://picsum.photos/400/200?random=${Math.floor(Math.random() * 1000)}`;

    const div = document.createElement("div");
    div.classList.add("blog-item");

    div.innerHTML = `
      <div class="img" style="background-image:url('${randomImg}')"></div>
      <div class="delete-icon" data-id="${blog.id}">X</div>
      <h3>${blog.title}</h3>
      <p>${blog.description}</p>
    `;

    blogsContainer.appendChild(div);
  });

  // Delete event
  document.querySelectorAll(".delete-icon").forEach(icon => {
    icon.onclick = async () => {
      const id = icon.dataset.id;

      if (!confirm("Are you sure you want to delete this blog?")) return;

      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      getBlogs(); // reload
    };
  });
}

// Validation
function validateTitle(t) {
  return /^[A-Z][A-Za-z ]{0,49}$/.test(t); //First character must be uppercase,Next characters can be letters or spaces, max 49 characters
}
function validateDescription(d) {
  return /^[A-Za-z ]{0,1000}$/.test(d);//Only letters and spaces allowed, max 1000 characters
}

// Submit form
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();// Prevent the default form submission (page reload)

    // Get values from input fields and remove extra spaces
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!validateTitle(title)) {
    formError.textContent = "Title must start with a capital letter, max 50 chars.";
    return;
  }

  if (!validateDescription(description)) {
    formError.textContent = "Description max 1000 chars.";
    return;
  }
    // Send the new blog data to the server
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
