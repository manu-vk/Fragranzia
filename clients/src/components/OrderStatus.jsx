import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom";

export const SuccessStatus = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full z-50 ">
                <div className="flex flex-col justify-center items-center lg:w-2/4 p-6 text-center mx-auto gap-4">
                    <img src={assets.successIcon} alt="" className="w-28 h-28" />
                    <h3 className="font-medium">Thank You for Ordering!</h3>
                    <p>Your order has been successfully placed. We're preparing it for shipment</p>
                    <div className="flex gap-3 justify-center mt-4 w-full">
                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 p-2 border-2 border-[#00354B] rounded-sm hover:bg-primary hover:text-white transition"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate("/order-tracking")}
                            className="flex-1 p-2 text-white bg-primary rounded-sm hover:bg-primary-dull transition"
                        >
                            Track Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export const ErrorStatus = () => {
    return (
        <>
            <div>
                <div className="flex flex-col justify-center items-center lg:w-2/4 p-6 text-center mx-auto gap-4">
                    <img src={assets.errorIcon} alt="" className="w-28 h-28" />
                    <h3 className="font-medium">Your order has failed!</h3>
                    <p>Your order cant be completed Please check your internet connection!</p>
                    <div className="flex gap-3 justify-center mt-4 w-full">
                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 p-2 border-2 border-[#00354B] rounded-sm hover:bg-primary hover:text-white transition"
                        >
                            Back to Home
                        </button>
                        <button className="flex-1 p-2 text-white bg-primary rounded-sm hover:bg-primary-dull transition">Retry</button>
                    </div>
                </div>
            </div>
        </>
    )
}