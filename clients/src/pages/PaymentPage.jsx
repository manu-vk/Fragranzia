import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from "react-router-dom";
import { assets, customerFakeData } from '../assets/assets'
import { useParams } from 'react-router-dom'

const PaymentPage = () => {
    const { products, cartItems, updateCartItem, getCartCount } = useContext(AppContext)
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const navigate = useNavigate();
    const { id } = useParams()
    const product = products?.find(i => i._id === id || i.id === id);
    if (!product) return <h2>Loading...</h2>;
    const qty = cartItems[id] || 1
    const off = Math.round(((product.price - product.offerPrice) / product.price) * 100)
    const totalPrice = product.price * qty
    const totalOffer = product.offerPrice * qty
    const discount = totalPrice - totalOffer
    const handlePayment = () => {
        if (!paymentMethod) return;
    
        // example: COD flow
        if (paymentMethod === "cod") {
            navigate("/order-success");
        }

        // example: other payments (later Razorpay/UPI)
        else {
            navigate("/order-success");
        }
    };

    return product && (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 items-start">
                <div className="lg:col-span-2 flex flex-col gap-6">

                    <div className="shadow-[0_0_3px_#24242453] rounded-lg p-4 flex gap-4">
                        <img src={product.image[0]} className="w-24 h-24 object-contain" alt="" />

                        <div className="flex-1">
                            <h3 className="font-medium">{product.title}</h3>

                            <div className="flex items-center gap-2 text-sm">
                                <p>{product.rating}</p>
                                <img src={assets.ratingIcon} className="w-4 h-4" alt="" />
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <button onClick={() => updateCartItem(id, qty - 1)} className="border px-3">−</button>
                                <span>{qty}</span>
                                <button onClick={() => updateCartItem(id, qty + 1)} className="border px-3">+</button>
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-sm">
                                <p className="font-bold">₹{product.offerPrice}</p>
                                <del className="text-[#595959]">₹{product.price}</del>
                                <span className="text-green-600">{off}% off</span>
                            </div>
                            <div className="flex flex-col text-[13px]">
                                <p>Delivered by August 29, Free delivery</p>
                                <p className="text-green-600">7 day return policy</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="font-semibold mb-3">Personal Details</h3>
                        <div className='mt-3 flex flex-1 gap-4'>
                            <button className='bg-gray-200 p-2 rounded-sm text-primary'>Add address +</button>
                            <button className='bg-primary p-2 rounded-sm text-white'>Home</button>
                            <button className='bg-gray-200 p-2 rounded-sm text-primary'>Office</button>
                        </div>
                        <div className='mt-3 flex justify-between'>
                            <p>Address</p>
                            <p>Edit</p>
                        </div>
                        <div className='mt-3 flex flex-col gap-2 shadow-[0_0_3px_#24242453] rounded-lg p-4'>
                            <p>manu</p>
                            <p>House No. 12/45, Near Sreekrishna Temple, Near Sreekrishna Temple, Ernakulam, Kerala, India</p>
                            <p>+91 88480 17132</p>
                        </div>
                    </div>

                </div>

                <div>
                    <div className="shadow-[0_0_3px_#24242453] rounded-lg p-4 h-fit">
                        <h3 className="font-semibold mb-3">Price Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Price ({getCartCount()} items)</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="text-green-600">− ₹{discount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>₹{totalOffer}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 shadow-[0_0_3px_#24242453] rounded-lg p-4 h-fit">
                        <h3 className='font-semibold mb-3'>Payment Methods</h3>

                        {/* Google Pay */}
                        <div className='mt-3 flex flex-1 justify-between'>
                            <div className='flex gap-2'>
                                <img src={assets.googlepayIcon} alt="" className='w-6 h-6' />
                                <p>Google Pay</p>
                            </div>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "gpay"}
                                onChange={() => setPaymentMethod("gpay")}
                                className="w-4 h-4"
                            />
                        </div>

                        {/* COD */}
                        <div className='mt-3 flex flex-1 justify-between'>
                            <div className='flex gap-2'>
                                <img src={assets.codIcon} alt="" className='w-6 h-6' />
                                <p>Cash on delivery (cash/UPI)</p>
                            </div>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                                className="w-4 h-4"
                            />
                        </div>

                        {/* UPI */}
                        <div className='mt-3 flex flex-1 justify-between'>
                            <div className='flex gap-2'>
                                <img src={assets.upiIcon} alt="" className='w-6 h-6' />
                                <p>Paytm / PhonePe / Amazon Pay</p>
                            </div>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "upi"}
                                onChange={() => setPaymentMethod("upi")}
                                className="w-4 h-4"
                            />
                        </div>

                        {/* Card */}
                        <div className='mt-3 flex flex-1 justify-between'>
                            <div className='flex gap-2'>
                                <img src={assets.creditcardIcon} alt="" className='w-6 h-6' />
                                <p>Credit / Debit Card</p>
                            </div>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                                className="w-4 h-4"
                            />
                        </div>

                        {/* Net Banking */}
                        <div className='mt-3 flex flex-1 justify-between'>
                            <div className='flex gap-2'>
                                <img src={assets.netbankingIcon} alt="" className='w-6 h-6' />
                                <p>Net Banking</p>
                            </div>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "netbanking"}
                                onChange={() => setPaymentMethod("netbanking")}
                                className="w-4 h-4"
                            />
                        </div>

                        {/* Pay Now Button */}
                        <div className='flex justify-center mt-3'>
                            <button

                                className='w-full cursor-pointer mt-3 p-2 text-white bg-primary rounded-sm hover:bg-primary-dull transition'
                                onClick={handlePayment}
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default PaymentPage
