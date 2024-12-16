import React, { useState } from "react";
import PurpleImage from './assets/images/purple.png';
import CyanImage from './assets/images/cyan.png';
import BlueImage from './assets/images/blue.png';
import BlackImage from './assets/images/black.png';
import StarImage from './assets/images/Vector.svg';
import StarHalfImage from './assets/images/star-half.svg';
import EmptyImage from './assets/images/empty-star.svg';

const starData = [
  { id: 1, image: StarImage },
  { id: 2, image: StarImage },
  { id: 3, image: StarImage },
  { id: 4, image: StarHalfImage },
  { id: 5, image: EmptyImage},
];

const thumbnailMap = {
  purple: PurpleImage,
  cyan: CyanImage,
  blue: BlueImage,
  black: BlackImage,
};

const SmartWatchStore = () => {
  const [mainThumbnail, setMainThumbnail] = useState(thumbnailMap.purple);
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  // Update thumbnail based on selected color
  const updateThumbnail = (color) => {
    setSelectedColor(color);
    setMainThumbnail(thumbnailMap[color]);
  };

  // Update size selection
  const updateSize = (size) => setSelectedSize(size);

  // Update quantity
  const updateQuantity = (value) => {
    setQuantity((prev) => Math.max(0, prev + value));
  };

  // Add item to cart
  const addToCart = () => {
    if (!selectedSize) return alert("Please select a wrist size!");
    if (quantity === 0) return alert("Please select at least one quantity!");

    const price = { S: 69, M: 79, L: 89, XL: 99 }[selectedSize];
    const newItem = {
      name: "Classy Modern Smart Watch",
      color: selectedColor,
      size: selectedSize,
      price,
      quantity,
    };
    setCart((prev) => [...prev, newItem]);
    setQuantity(0);
  };

  // Calculate total price and quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Render stars
  const renderStars = () =>
    starData.map(({ id, image }) => (
      <img key={id} src={image} alt={`Star ${id}`} className="w-[18px]" />
    ));

  return (
    <div className="container mx-auto p-12 max-w-[1320px]">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Thumbnail */}
        <div className="max-w-[630px]">
          <img src={mainThumbnail} alt="Main Thumbnail" className="w-full rounded-[4px]" />
        </div>

        {/* Product Details */}
        <div className="max-w-[630px]">
          <h1 className="font-bold text-[#364A63] text-[30px] sm:text-[40px]">Classy Modern Smart Watch</h1>

          {/* Stars and Reviews */}
          <div className="flex gap-2 items-center py-4">
            <div className="flex gap-2">{renderStars()}</div>
            <p className="text-[#8091A7] text-[14px]">(2 Reviews)</p>
          </div>

          {/* Price */}
          <div className="flex gap-3">
            <p className="text-[#8091A7] line-through">$99.00</p>
            <p className="text-[#6576FF] font-bold">$79.00</p>
          </div>

          {/* Band Color */}
          <div className="mt-5">
            <p className="font-bold text-[18px] mb-2">Band Color</p>
            <div className="flex gap-3">
              {Object.keys(thumbnailMap).map((color) => (
                <div
                  key={color}
                  onClick={() => updateThumbnail(color)}
                  className={`w-[24px] h-[24px] rounded-full border cursor-pointer ${
                    selectedColor === color ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div
                    className={`w-[16px] h-[16px] rounded-full mx-auto`}
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Wrist Size */}
          <div className="mt-5">
            <p className="font-bold text-[18px] mb-2">Wrist Size</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => updateSize(size)}
                  className={`border px-4 py-1 rounded ${
                    selectedSize === size ? "border-blue-500" : ""
                  }`}
                >
                  {size} ${69 + (size.charCodeAt(0) - "S".charCodeAt(0)) * 10}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5 flex gap-3 items-center">
            <div className="flex border rounded">
              <button onClick={() => updateQuantity(-1)} className="px-3 py-2">
                −
              </button>
              <input
                value={quantity}
                readOnly
                className="w-14 text-center border-l border-r"
              />
              <button onClick={() => updateQuantity(1)} className="px-3 py-2">
                +
              </button>
            </div>
            <button
              onClick={addToCart}
              className="bg-[#6576FF] text-white px-4 py-2 rounded font-bold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Floating Checkout */}
      {cart.length > 0 && (
        <div
          onClick={() => setCartVisible(true)}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FFBB5A] px-6 py-3 rounded-full shadow-lg cursor-pointer"
        >
          Checkout ({totalQuantity})
        </div>
      )}

      {/* Cart Modal */}
      {cartVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-[600px] w-full">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <div>
                    {item.name} - {item.color} - {item.size}
                  </div>
                  <div>
                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 font-bold">
              <span>Total Quantity: {totalQuantity}</span>
              <span>Total Price: ${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setCartVisible(false)} className="border px-4 py-2 rounded">
                Close
              </button>
              <button
                onClick={() => {
                  setCart([]);
                  setCartVisible(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartWatchStore;
