import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { FaHeart } from 'react-icons/fa'

const WishlistPage = () => {

    const {
        addToCart,
        addToWish,
        wishItems,
        fetchWishlist
    } = useContext(AppContext)

    // Fetch wishlist when component loads
    useEffect(() => {
        fetchWishlist()
    }, [])

    const handleRemoveFromWishlist = async (productId) => {
        await addToWish(productId)
        toast.success('Removed from wishlist')
    }

    const handleAddToCart = async (productId) => {
        await addToCart(productId)
    }

    const wishArray = wishItems && Array.isArray(wishItems) ? wishItems : [];

    return (

        <div className="p-4 md:p-6">

            <h1 className="text-primary text-2xl font-bold mb-6">
                My Wishlist ({wishArray.length})
            </h1>

            {wishArray.length === 0 ? (

                <div className="text-center py-12">

                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">

                        <FaHeart className="w-12 h-12 text-gray-300" />

                    </div>

                    <h3 className="text-primary text-lg font-medium mb-2">
                        Your wishlist is empty
                    </h3>

                    <p className="text-gray-500">
                        Add items you love to your wishlist
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                    {wishArray.map(item => (
                        <div
                            key={item.id}
                            className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-white"
                        >
                            <div className="relative mb-4">
                                <img
                                    src={
                                        item?.image?.[0]
                                            ? item.image[0].startsWith("http")
                                                ? item.image[0]
                                                : `http://localhost:5000/uploads/${item.image[0]}`
                                            : assets.placeholderImage
                                    }
                                    alt={item.title}
                                    className="w-full h-40 object-cover rounded-lg"
                                />

                                <button
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-50"
                                >
                                    <FaHeart className="text-red-500" />
                                </button>
                            </div>

                            <div>
                                <h3 className="font-medium text-sm line-clamp-2 mb-2">
                                    {item.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="font-semibold">
                                        ₹{item.offerPrice}
                                    </span>

                                    <span className="text-sm text-gray-500 line-through">
                                        ₹{item.price}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(item.id)}
                                    className="w-full bg-primary text-white py-2 rounded text-sm font-medium hover:bg-opacity-90 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

            )}

        </div>

    )
}

export default WishlistPage