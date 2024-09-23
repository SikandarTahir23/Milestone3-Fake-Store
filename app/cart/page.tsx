"use client";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../app/component/navbar";
import { CounterContext } from "@/context/cartContext";
import Image from "next/image";

const CartPage: NextPage = () => {
    const { state, dispatch } = useContext(CounterContext);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const removeFromCart = (productId: string) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } });
    };

    if (!mounted) {
        return null; // Or a loading spinner
    }

    let totalPrice = state.cart.reduce((total: number, item: any) => {
        return total + item.price;
    }, 0);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                    Your Cart
                </h1>
                {state.cart.length === 0 ? (
                    <div className="text-center text-gray-500">
                        Your cart is empty.
                    </div>
                ) : (
                    <div className="bg-white min-h-[64vh] flex flex-col justify-between shadow sm:rounded-lg">
                        <div className="relative overflow-auto">
                            <ul className="divide-y divide-gray-200">
                                {state.cart.map((product: any, _index) => (
                                    <li key={product.id} className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between">
                                        <div className="flex items-center w-full sm:w-auto">
                                            <Image
                                                className="h-16 w-16 rounded-md object-cover"
                                                src={product.image}
                                                alt={product.title}
                                                width={100}
                                                height={100}
                                            />
                                            <div className="ml-4">
                                                <div className="text-lg font-medium text-gray-900">
                                                    {product.title}
                                                </div>
                                                <div className="text-sm text-gray-500">${product.price}</div>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0">
                                            <button
                                                onClick={() => removeFromCart(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="px-4 py-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
                            <div className="flex items-center gap-1 text-center sm:text-left">
                                <h1 className=" text-2xl sm:text-3xl font-semibold">
                                    Total Price :
                                </h1>
                                <span className=" text-red-900">
                                    <h1 className="text-2xl sm:text-3xl font-semibold">
                                        ${totalPrice}
                                    </h1>
                                </span>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <a href="/checkout">
                                    <button className="bg-blue-600 w-full sm:w-[300px] text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700">
                                        Details
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CartPage;
