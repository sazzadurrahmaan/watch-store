//stars dom
const stars = document.getElementById("stars");

//object for star image
const starObject= [
{
    id:1,
    image: '/images/Vector.svg',
},
{
    id:2,
    image: '/images/Vector.svg',
},
{
    id:3,
    image: '/images/Vector.svg',
},
{
    id:4,
    image: '/images/star-half.svg',
},
{
    id:5,
    image: '/images/empty-star.svg',
},

]
// Create an img element for each star
starObject.map(star => {
    
    const img = document.createElement('img');
    img.src = star.image; 
    img.alt = `Star ${star.id}`; 
    img.className = 'w-[18px]'; 
    
    stars.appendChild(img);
});

// Elements
const mainThumbnail = document.getElementById("mainThumbnail");
const bandColors = document.querySelectorAll(".band-option");
const sizeOptions = document.querySelectorAll(".size-option");
const quantityInput = document.getElementById("quantity");
const decreaseQtyBtn = document.getElementById("decreaseQty");
const increaseQtyBtn = document.getElementById("increaseQty");
const addToCartBtn = document.getElementById("addToCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartModal = document.getElementById("cartModal");
const closeModalBtn = document.getElementById("closeModal");
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceElem = document.getElementById("totalPrice");

// Cart Data
let selectedColor = "Purple";
let selectedSize = "M";
let quantity = 0;
let cart = [];

// --- Functionality ---

// 1. Change Thumbnail Based on Band Color
bandColors.forEach((color) => {
  color.addEventListener("click", (e) => {
    // Update thumbnail and selected color
    selectedColor = e.target.dataset.color || "purple";
    mainThumbnail.src = `images/${selectedColor}.png`;

    // Highlight selected color
    bandColors.forEach((item) => item.classList.remove("ring-2", "ring-blue-500"));
    color.classList.add("ring-2", "ring-blue-500");
  });
});

// 2. Select Wrist Size
sizeOptions.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSize = button.dataset.size;
    sizeOptions.forEach((btn) => btn.classList.remove("border-blue-500"));
    button.classList.add("border-blue-500");
  });
});

// 3. Increase/Decrease Quantity
increaseQtyBtn.addEventListener("click", () => {
  quantity++;
  quantityInput.value = quantity;
});

decreaseQtyBtn.addEventListener("click", () => {
  if (quantity > 0) quantity--;
  quantityInput.value = quantity;
});

// 4. Add to Cart
addToCartBtn.addEventListener("click", () => {
  if (quantity === 0) {
    alert("Please select at least one quantity!");
    return;
  }

  const price = sizeOptions.find((btn) => btn.dataset.size === selectedSize)?.dataset.price || 79;

  // Add item to cart
  cart.push({
    name: "Classy Modern Smart Watch",
    color: selectedColor,
    size: selectedSize,
    price: price,
    quantity: quantity,
  });

  // Update Checkout Button
  checkoutBtn.classList.remove("hidden");
  checkoutBtn.textContent = `Checkout (${cart.length})`;

  // Reset Quantity
  quantity = 0;
  quantityInput.value = 0;

  alert("Item added to cart!");
});

// 5. Open Cart Modal
checkoutBtn.addEventListener("click", () => {
  cartItemsContainer.innerHTML = ""; // Clear previous items
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.name} (${item.size})</td>
        <td class="capitalize">${item.color}</td>
        <td>$${item.price} x ${item.quantity}</td>
      </tr>
    `;
    totalPrice += item.price * item.quantity;
    cartItemsContainer.insertAdjacentHTML("beforeend", row);
  });

  totalPriceElem.textContent = `Total: $${totalPrice}`;
  cartModal.classList.remove("hidden");
});

// 6. Close Cart Modal
closeModalBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Band Color Selection Logic
const bandOptions = document.querySelectorAll('.band-option');

// Mapping color options to corresponding thumbnail images
const thumbnailMap = {
  purple: 'images/purple.png',
  turquoise: 'images/cyan.png',
  blue: 'images/blue.png',
  black: 'images/black.png',
};

bandOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Remove border from all band options
    bandOptions.forEach(opt => opt.classList.remove('border-2', 'border-[#816BFF]'));

    // Add border to the selected band option
    option.classList.add('border-2', 'border-[#816BFF]');

    // Update the main thumbnail based on the selected band color
    const selectedColor = option.dataset.color; // Get color from data attribute
    if (thumbnailMap[selectedColor]) {
      mainThumbnail.src = thumbnailMap[selectedColor];
    }
  });
});
