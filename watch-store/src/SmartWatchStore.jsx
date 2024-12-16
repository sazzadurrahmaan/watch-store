import React, { useState } from "react";
import PurpleImage from './assets/images/purple.png';
import CyanImage from './assets/images/cyan.png';
import BlueImage from './assets/images/blue.png';
import BlackImage from './assets/images/black.png';
import StarImage from './assets/images/Vector.svg';
import StarHalfImage from './assets/images/star-half.svg';
import EmptyImage from './assets/images/empty-star.svg';
import HeartImage from './assets/images/heart.svg';



const starData = [
  { id: 1, image: StarImage },
  { id: 2, image: StarImage },
  { id: 3, image: StarImage },
  { id: 4, image: StarHalfImage },
  { id: 5, image: EmptyImage },
];

// Updated color-to-thumbnail mapping
const thumbnailMap = {
  purple: { colorCode: "#816BFF", image: PurpleImage },
  cyan: { colorCode: "#1FCEC9", image: CyanImage },
  blue: { colorCode: "#4B97D3", image: BlueImage },
  black: { colorCode: "#3B4747", image: BlackImage },
};

const SmartWatchStore = () => {
  const [mainThumbnail, setMainThumbnail] = useState(thumbnailMap.purple.image);
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  // Update thumbnail based on selected color
  const updateThumbnail = (color) => {
    setSelectedColor(color);
    setMainThumbnail(thumbnailMap[color].image);
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
    setCartVisible(true)
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
          <div className="flex items-center gap-3 leading-[30px]">
            <p className="text-[#8091A7] line-through text-[15px] sm:text-[20px] font-normal">$99.00</p>
            <p className="text-[#6576FF] text-[18px]  sm:text-[24px] font-bold">$79.00</p>
          </div>

          <p className="mt-2 leading-[30px] font-normal text-[15px] sm:text-[18px] text-[#8091A7] py-2">
            I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you
            a complete account of the system, and expound the actual teaching.
          </p>

          <div className="text-[#8091A7] flex gap-5 py-5">
            <p className="font-normal text-[12px] sm:text-[14px] leading-[23px] flex flex-col">Type<span
              className="font-bold text-[14px] sm:text-[16px] text-[#364A63]">Watch </span> </p>
            <p className="font-normal text-[12px] sm:text-[14px]  leading-[23px] flex flex-col">Model Number<span
              className="font-bold text-[16px] text-[#364A63]">Forerunner 290XT</span> </p>
          </div>
       
          {/* Band Color */}
          <div className="mb-4 text-[#364A63]">
            <p className="font-bold text-[16px] sm:text-[18px] mb-2">Band Color</p>
            <div className="flex gap-3 items-center">
              {Object.keys(thumbnailMap).map((color) => (
                <div
                  key={color}
                  onClick={() => updateThumbnail(color)}
                  className={`w-[24px] h-[24px] rounded-full border cursor-pointer ${selectedColor === color ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: thumbnailMap[color].colorCode }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Wrist Size */}
          <div className="mt-5">
            <p className="text-[16px] sm:text-[18px] font-bold mb-2 text-[#364A63]">Wrist Size</p>
            <div className="flex gap-2 font-bold text-[#364A63] ">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => updateSize(size)}
                  className={`border  px-4 py-1 rounded-[3px] ${selectedSize === size ? "border-blue-500" : ""
                    }`}
                >
                  {size} <span className="text-[#8091A7]">${69 + (size.charCodeAt(0) - "S".charCodeAt(0)) * 10}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5 flex gap-3 items-center">
            <div className="flex border rounded">
              <button onClick={() => updateQuantity(-1)} className="px-3 py-2 flex items-center border text-[18px] rounded-[3px] overflow-hidden  text-[#8091A7]">
                −
              </button>
              <input
                value={quantity}
                readOnly
                className="text-[#364A63] w-14 px-3 py-2 text-center border-l border-r focus:outline-none"
              />
              <button onClick={() => updateQuantity(1)} className="px-3 py-2 flex items-center border text-[18px] rounded-[3px] overflow-hidden  text-[#8091A7]">
                +
              </button>
            </div>
            <button
              onClick={addToCart}
              className="bg-[#6576FF] text-white px-4 py-2 rounded-md font-bold text-[13px] leading-[20px]"
            >
              Add to Cart
            </button>
            <button class="w-[17px] sm:w-[20px] h-[17px] sm:h-[20px]">
              <img src={HeartImage} alt="heartimage" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Checkout */}
      {cart.length > 0 && (
        <div
          onClick={() => setCartVisible(true)}
          className="flex items-center text-[15px] sm:text-[18px] justify-center gap-4 bg-[#FFBB5A] text-[#364A63]  font-bold px-6 py-3  rounded-full shadow-lg fixed bottom-0 sm:bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          Checkout <span className="bg-white px-4 rounded-[5px] w-[19px] h-[19px">{totalQuantity}</span>
        </div>
      )}

      {/* Cart Modal */}
      {cartVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white max-w-[90%] sm:max-w-[651px] rounded-lg shadow-lg p-8 relative">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <ul class="grid grid-cols-8 items-center justify-center border-b py-5 gap-4 text-[12px] sm:text-[14px] font-normal text-[#8091A7]">
              <li class="col-span-4">Item</li>
              <li class="col-span-1">Color</li>
              <li class="col-span-1">Size</li>
              <li class="col-span-1">Qnt</li>
              <li class="col-span-1">Price</li>
            </ul>

            {cart.map((item, index) => (
              <ui key={index} className="grid grid-cols-8 relative border-b items-center gap-4 text-[12px] sm:text-[14px] font-normal text-[#364A63] py-2">
                <li class="col-span-1 list-none">
                  <img
                   src={thumbnailMap[item.color]?.image} // Fetch the correct image based on color
                    alt={`${item.color} watch`}
                    className="w-[40px] h-[40px] rounded-md"
                  />
                </li>
                <li class="col-span-3 list-none">{item.name}</li>
                <li class="col-span-1 list-none">{item.color}</li>
                <li class="col-span-1 font-bold list-none">{item.size}</li>
                <li class="col-span-1 font-bold list-none">{item.quantity}</li>
                <li class="col-span-1 font-bold list-none absolute right-0">{item.price}</li>
              </ui>
            ))}

            <div className="grid grid-cols-8 relative items-center py-5 justify-center text-[14px] sm:text-[16px] font-bold mt-2 text-[#364A63]">
              <span class="col-span-6">Total </span>
              <span class="col-span-1">{totalQuantity}</span>
              <span class="col-span-1">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setCartVisible(false)} className="border px-4 py-2 rounded">
                Continue Shopping
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
