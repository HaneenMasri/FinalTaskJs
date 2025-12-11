const apiUrl = "http://localhost:3000/blogs";
const blogsContainer = document.getElementById("blogs-container");
const blogForm = document.getElementById("blog-form");
const titleError = document.getElementById("title-error");
const descriptionError = document.getElementById("description-error");

// Fetch & Render blogs
async function getBlogs() {
  blogsContainer.innerHTML = "";

  const res = await fetch(apiUrl);//to call API 
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
      getBlogs();
    };
  });
}

// Validation
function validateTitle(title) {
  if (!title) return "Title is required.";
if (/[0-9]/.test(title)) return "Title cannot contain numbers,only English letters and spaces.";
if (/[^A-Za-z ]/.test(title)) return "Title cannot contain characters,Title only English letters and spaces.";
if (title.length > 50) return "Title must be less than 50 characters.";
if (!/^[A-Z]/.test(title)) return "Title must start with a capital letter.";
return;
}

function validateDescription(desc) {
  if (!desc) return "Description is required.";
if (/[0-9]/.test(desc)) return "Description cannot contain numbers,only English letters and spaces.";
if (/[^A-Za-z ]/.test(desc)) return "Description cannot contain special characters, only English letters and spaces.";
if (desc.length > 1000) return "Description must be less than 1000 characters.";

return;
}

// Submit form
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

// Reset previous errors
titleError.textContent = "";
descriptionError.textContent = "";

const titleMsg = validateTitle(title);
const descMsg = validateDescription(description);

if (titleMsg) titleError.textContent = titleMsg;
if (descMsg) descriptionError.textContent = descMsg;

if (titleMsg || descMsg) return;


  // Submit blog
  await fetch(apiUrl, {
    method: "POST",//to send new data to the server
    headers: { "Content-Type": "application/json" },//we are sending JSON data
    body: JSON.stringify({ title, description })//Convert the JS object into a JSON string to send
  });

  blogForm.reset();
  getBlogs();// Reload
});

// Initial load
getBlogs();
