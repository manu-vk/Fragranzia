import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {

  const {
    addToCart,
    navigate,
    addToWish,
    wishItems
  } = useContext(AppContext)

  const isWishlisted = wishItems.some(
    item => item.id === product._id
  );

  return product && (

    <div className="w-[220px] p-3 relative">

      {/* wishlist button */}

      <button
        onClick={() => addToWish(product._id)}
        className="absolute top-5 right-5 z-20 bg-white p-2 rounded-full shadow cursor-pointer"
      >
        <FaHeart
          className={`text-lg transition ${
            isWishlisted
              ? "text-red-500"
              : "text-gray-300"
          }`}
        />
      </button>

      {/* image */}

      <div
        onClick={() => {
          navigate(`/products/${product._id}`);
          scrollTo(0, 0)
        }}
        className="group flex justify-center items-center w-full h-[200px] shadow-[0_0_3px_1px_#24242453] rounded-[24px_0_24px_0] transition-all duration-300 ease-linear hover:rounded-[0_24px_0_24px] overflow-hidden"
      >

        <img
          src={`http://localhost:5000/uploads/${product?.image?.[0]}`}
          alt={product.title}
          className="w-[160px] h-[160px] object-contain transition-transform duration-300 ease-linear group-hover:scale-110"
        />

      </div>

      {/* title */}

      <div className="mt-2">
        <p className="text-sm font-medium">
          {product.title}
        </p>
      </div>

      {/* price */}

      <div className="flex items-center gap-3 mt-2">

        <p className="font-bold">
          ₹{product.offerPrice}
        </p>

        <del className="text-[12px] text-[#595959]">
          ₹{product.price}
        </del>

      </div>

      {/* cart button */}

      <button
        onClick={() => addToCart(product._id)}
        className="w-full cursor-pointer mt-3 p-2 text-white bg-primary rounded-sm hover:bg-primary-dull transition"
      >
        Add to Cart
      </button>

    </div>
  )
}

export default ProductCard