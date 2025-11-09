// Admin login system
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");
const adminSection = document.getElementById("adminSection");
let isAdmin = false;

adminLoginBtn.addEventListener("click", () => {
  const password = prompt("Enter admin password:");
  if (password === "focusarc2025") {
    alert("Admin login successful!");
    isAdmin = true;
    adminSection.style.display = "block";
    adminLoginBtn.style.display = "none";
    adminLogoutBtn.style.display = "inline-block";
  } else {
    alert("Incorrect password!");
  }
});

adminLogoutBtn.addEventListener("click", () => {
  isAdmin = false;
  adminSection.style.display = "none";
  adminLoginBtn.style.display = "inline-block";
  adminLogoutBtn.style.display = "none";
  alert("Logged out successfully.");
});

// Product catalog
let products = [];

const catalog = document.getElementById("catalog");

// Add product form
document.getElementById("addProductForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const imageFile = document.getElementById("pimage").files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const image = reader.result;
    const product = { name, price, image };
    products.push(product);
    displayProducts(products);
    e.target.reset();
  };
  reader.readAsDataURL(imageFile);
});

// Display products
function displayProducts(list) {
  catalog.innerHTML = "";
  list.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>LKR ${p.price}</p>
      <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
    `;
    catalog.appendChild(div);
  });
}

// Delete product
function deleteProduct(index) {
  products.splice(index, 1);
  displayProducts(products);
}

// Search products
function searchProducts() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}
