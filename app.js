//stars dom
const stars = document.getElementById("stars");

//object for star image
const starObject = [
  {
    id: 1,
    image: '/images/Vector.svg',
  },
  {
    id: 2,
    image: '/images/Vector.svg',
  },
  {
    id: 3,
    image: '/images/Vector.svg',
  },
  {
    id: 4,
    image: '/images/star-half.svg',
  },
  {
    id: 5,
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
  // Check if a size is selected
  if (!selectedSize) {
    alert("Please select a wrist size!");
    return;
  }

  // Check if quantity is greater than 0
  if (quantity === 0) {
    alert("Please select at least one quantity!");
    return;
  }

  // Fetch the price based on the selected size
  const price = Array.from(sizeOptions).find((btn) => btn.dataset.size === selectedSize)?.dataset.price || 79;

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
  checkoutBtn.innerHTML = `<p class="cursor-pointer	"> Checkout <span class="bg-white px-2 rounded-[5px] w-[19px] h-[19px] mx-2">${cart.length}</span></p>`;


  // Reset Quantity and Size
  quantity = 0;
  quantityInput.value = 0;

  sizeOptions.forEach((btn) => btn.classList.remove("border-blue-500")); // Reset size button highlights
  selectedSize = null;


  // Open Cart Modal and Render Cart Items
  openCartModal();
});

checkoutBtn.addEventListener("click", () => {
  openCartModal();
})

// Function to open the cart modal and display items
function openCartModal() {
  const cartModal = document.getElementById("cartModal");
  const cartItemsList = document.getElementById("cartItems");
  const totalPriceElem = document.getElementById("totalPrice"); // Select total price element
  const totalQuantity = document.getElementById("totalQnt");

  // Clear previous items
  cartItemsList.innerHTML = "";

  // Initialize total price
  let totalPrice = 0;

  let totalQnt =0;

  // Render each cart item
  cart.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.classList.add("border-b", "pb-2", "flex", "justify-between", "text-sm");
    
    
    const itemTotal = item.price * item.quantity; // Calculate total for this item
    totalPrice += itemTotal; // Add to total price

    totalQnt += item.quantity;
    
    listItem.innerHTML = `
    <ul class="grid grid-cols-8 relative items-center gap-4 text-[14px] font-normal text-[#364A63] py-2">
      <li class="col-span-1">
        <img src="images/${item.color}.png" alt="${item.name}" class="w-[50px] h-[50px] rounded-lg object-cover">
      </li>
      <li class="col-span-3 font-normal">${item.name}</li>
      <li class="col-span-1">${item.color}</li>
      <li class="col-span-1 font-bold">${item.size}</li>
      <li class="col-span-1 font-bold">${item.quantity}</li>
      <li class="col-span-1 font-bold absolute right-0">$${itemTotal.toFixed(2)}</li>
    </ul>
  `;

    cartItemsList.appendChild(listItem);
  });

 totalQuantity.textContent = totalQnt;
  // Update total price display
  totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;

  // Show the modal
  cartModal.classList.remove("hidden");
}


// Close cart modal
document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("cartModal").classList.add("hidden");
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

// Proceed to Checkout Functionality
const proceedToCheckoutBtn = document.getElementById("proceed");

proceedToCheckoutBtn.addEventListener("click", () => {

  document.getElementById("cartModal").classList.add("hidden");
  cart = [];
  checkoutBtn.textContent = "";
  checkoutBtn.classList.add("hidden");
});
