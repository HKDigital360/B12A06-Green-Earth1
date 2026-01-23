
// Spinner toggle
const showSpinner = (show) => {
  document.getElementById("spinner").classList.toggle("hidden", !show);
};

// Load all plants
const loadAllPlants = () => {
  showSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      showSpinner(false);
      displayPlants(data.plants);
    });
};

// Load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories));
};

// Display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("plant-category");
  categoryContainer.innerHTML = "";

  // All Tree button
  const allBtn = document.createElement("button");
  allBtn.className = "btn btn-wide w-full mt-3 bg-[#15803d] text-white justify-start";
  allBtn.textContent = "All Tree";
  allBtn.addEventListener("click", () => {
    setActiveButton(allBtn);
    loadAllPlants();
  });
  categoryContainer.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "btn btn-wide w-full mt-3 bg-[#15803d] text-white justify-start";
    btn.textContent = cat.category_name;

    btn.addEventListener("click", () => {
      setActiveButton(btn);
      loadPlantsByCategory(cat.id);
    });

    categoryContainer.appendChild(btn);
  });
};

// Active button highlight
const setActiveButton = (btn) => {
  document.querySelectorAll("#plant-category button")
    .forEach(b => b.classList.remove("bg-green-700"));
  btn.classList.add("bg-green-700");
};

// Load plants by category
const loadPlantsByCategory = (id) => {
  showSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      showSpinner(false);
      if (data.plants?.length) {
        displayPlants(data.plants);
      } else {
        document.getElementById("plant-container").innerHTML =
          `<div class="col-span-3 text-center text-red-600 font-semibold">No plants available</div>`;
      }
    });
};

// Display plants
const displayPlants = (plants) => {
  const container = document.getElementById("plant-container");
  container.innerHTML = "";

  plants.forEach(p => {
    const card = document.createElement("div");
    card.className = "w-full border p-3 bg-white rounded-xl shadow-md";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-cover rounded-lg mb-3">
      <h2 class="text-lg font-bold cursor-pointer text-green-900" onclick="loadPlantDetails(${p.id})">${p.name}</h2>
      <p class="text-sm text-gray-600">${p.description.slice(0,80)}...</p>
      <div class="flex justify-between items-center mt-2">
        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full">${p.category}</span>
        <span class="font-semibold">৳${p.price}</span>
      </div>
      <button class="btn btn-wide w-full mt-3 rounded-full bg-[#15803d] text-white" onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
};

// Load plant details
const loadPlantDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => showPlantModal(data.plants));
};

// Show plant modal
const showPlantModal = (plant) => {
  const modal = document.getElementById("plant-modal");
  modal.innerHTML = `
    <img src="${plant.image}" class="w-full h-60 object-cover rounded-lg mb-4">
    <h2 class="text-2xl text-white font-bold">${plant.name}</h2>
    <p class="text-white">${plant.description}</p>
    <div class="flex justify-between mt-3">
      <span class="px-3 py-1 bg-orange-300 rounded-full text-white">${plant.category}</span>
      <span class="font-semibold text-white">৳${plant.price}</span>
    </div>
  `;
  document.getElementById("plant-modal-wrapper").classList.add("modal-open");
};

const closeModal = () => {
  document.getElementById("plant-modal-wrapper").classList.remove("modal-open");
};

// Cart logic
let cart = [];

const addToCart = (id, name, price) => {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity++;
  else cart.push({ id, name, price, quantity: 1 });
  updateCart();
};

const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCart();
};

const updateCart = () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center";
    li.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>
        ৳${item.price * item.quantity}
        <button class="ml-2 text-red-600" onclick="removeFromCart(${item.id})">❌</button>
      </span>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `৳${total}`;
};

// Init
loadAllPlants();
loadCategories();
