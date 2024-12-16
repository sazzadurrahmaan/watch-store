// DOM Elements
const stars = document.getElementById("stars");
const mainThumbnail = document.getElementById("mainThumbnail");
const bandColors = document.querySelectorAll(".band-option");
const sizeOptions = document.querySelectorAll(".size-option");
const quantityInput = document.getElementById("quantity");
const decreaseQtyBtn = document.getElementById("decreaseQty");
const increaseQtyBtn = document.getElementById("increaseQty");
const addToCartBtn = document.getElementById("addToCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartModal = document.getElementById("cartModal");
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceElem = document.getElementById("totalPrice");
const totalQuantityElem = document.getElementById("totalQnt");
const closeCartBtn = document.getElementById("closeCart");
const proceedToCheckoutBtn = document.getElementById("proceed");

// Data
const starData = [
  { id: 1, image: '/images/Vector.svg' },
  { id: 2, image: '/images/Vector.svg' },
  { id: 3, image: '/images/Vector.svg' },
  { id: 4, image: '/images/star-half.svg' },
  { id: 5, image: '/images/empty-star.svg' }
];

const thumbnailMap = {
  purple: 'images/purple.png',
  turquoise: 'images/cyan.png',
  blue: 'images/blue.png',
  black: 'images/black.png'
};

let selectedColor = "Purple";
let selectedSize = "M";
let quantity = 0;
let cart = [];

// --- Functions ---
// Render star images
function renderStars() {
  const fragment = document.createDocumentFragment();
  starData.forEach(({ id, image }) => {
    const img = document.createElement('img');
    img.src = image;
    img.alt = `Star ${id}`;
    img.className = 'w-[18px]';
    fragment.appendChild(img);
  });
  stars.appendChild(fragment);
}

// Update thumbnail
function updateThumbnail(color) {
  selectedColor = color;
  mainThumbnail.src = thumbnailMap[color] || `images/${color}.png`;
  bandColors.forEach(opt => opt.classList.remove('ring-2', 'ring-blue-500'));
  document.querySelector(`[data-color="${color}"]`)?.classList.add('ring-2', 'ring-blue-500');
}

// Update size selection
function updateSize(size) {
  selectedSize = size;
  sizeOptions.forEach(btn => btn.classList.remove('border-blue-500'));
  document.querySelector(`[data-size="${size}"]`)?.classList.add('border-blue-500');
}

// Update quantity
function updateQuantity(value) {
  quantity = Math.max(0, quantity + value);
  quantityInput.value = quantity;
}

// Add item to cart
function addToCart() {
  if (!selectedSize) return alert("Please select a wrist size!");
  if (quantity === 0) return alert("Please select at least one quantity!");

  const price = +document.querySelector(`[data-size="${selectedSize}"]`)?.dataset.price || 79;

  cart.push({ name: "Classy Modern Smart Watch", color: selectedColor, size: selectedSize, price, quantity });

  // Update checkout button
  checkoutBtn.classList.remove("hidden");
  checkoutBtn.innerHTML = `<p class="cursor-pointer	"> Checkout <span class="bg-white px-2 rounded-[5px] w-[19px] h-[19px] mx-2">${cart.length}</span></p>`;

  // Reset state
  quantity = 0;
  quantityInput.value = 0;
  updateSize(null);

  // Open cart modal
  openCartModal();
}

// Open cart modal
function openCartModal() {
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0, totalQnt = 0;

  cart.forEach(({ name, color, size, price, quantity }) => {
    const itemTotal = price * quantity;
    totalPrice += itemTotal;
    totalQnt += quantity;

    const item = document.createElement("div");
    item.className = "border-b pb-2 flex justify-between text-sm";
    item.innerHTML = `
      <ul class="grid grid-cols-8 relative items-center gap-4 text-[12px] sm:text-[14px] font-normal text-[#364A63] py-2">
        <li class="col-span-1">
          <img src="images/${color}.png" alt="${name}" class="w-[35px] sm:w-[50px] h-[35px] sm:h-[50px] rounded-lg object-cover">
        </li>
        <li class="col-span-3">${name}</li>
        <li class="col-span-1">${color}</li>
        <li class="col-span-1 font-bold">${size}</li>
        <li class="col-span-1 font-bold">${quantity}</li>
        <li class="col-span-1 font-bold absolute right-0">$${itemTotal.toFixed(2)}</li>
      </ul>`;
    cartItemsContainer.appendChild(item);
  });

  totalQuantityElem.textContent = totalQnt;
  totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
  cartModal.classList.remove("hidden");
}

// Close cart modal
function closeCartModal() {
  cartModal.classList.add("hidden");
}

// Proceed to checkout
function proceedToCheckout() {
  cart = [];
  checkoutBtn.classList.add("hidden");
  checkoutBtn.innerHTML = "";
  closeCartModal();
}

// --- Event Listeners ---
bandColors.forEach(color => color.addEventListener("click", () => updateThumbnail(color.dataset.color)));
sizeOptions.forEach(btn => btn.addEventListener("click", () => updateSize(btn.dataset.size)));
increaseQtyBtn.addEventListener("click", () => updateQuantity(1));
decreaseQtyBtn.addEventListener("click", () => updateQuantity(-1));
addToCartBtn.addEventListener("click", addToCart);
checkoutBtn.addEventListener("click", openCartModal);
closeCartBtn.addEventListener("click", closeCartModal);
proceedToCheckoutBtn.addEventListener("click", proceedToCheckout);

// --- Initialization ---
renderStars();
