// components/CartCard.js
import { useCart } from "@/app/context/CartContext"; // Import useCart hook

export function CartCard() {
    const { cartItems, removeFromCart } = useCart();  // Get cart items and removeFromCart from context

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 px-5 sm:px-10 lg:px-20">
            {cartItems.length > 0 ? (
                cartItems.map((shoe) => (
                    <div
                        key={shoe.id}
                        className="bg-white dark:bg-neutral-800 shadow-lg rounded-2xl p-4 hover:shadow-2xl transition duration-200 ease-in-out"
                    >
                        <div className="relative w-full h-60 mb-4">
                            <Image src={shoe.image} alt={shoe.name} layout="fill" objectFit="cover" className="rounded-xl" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">{shoe.name}</h3>
                            <p className="text-xl font-bold text-neutral-700 dark:text-white">{shoe.price}</p>
                            <button
                                onClick={() => removeFromCart(shoe.id)}
                                className="mt-4 px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md"
                            >
                                Remove from Cart
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center col-span-3">
                    <p className="text-lg font-semibold text-neutral-600 dark:text-neutral-200">
                        Your cart is empty.
                    </p>
                </div>
            )}
        </div>
    );
}
