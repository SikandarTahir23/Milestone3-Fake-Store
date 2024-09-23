"use client"
import { useEffect, useState, useContext } from "react";
import Navbar from "@/app/component/navbar";
import axios from "axios"
import { CounterContext } from "@/context/cartContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Link from "next/link";
import Image from "next/image";
import Footer from "./component/footer";

export default function Home() {
  const [product, setProduct] = useState([])
  const { state, dispatch } = useContext(CounterContext); // Destructure as object
  console.log(state);


  const fetchProduct = async () => {
    try {
      let { data } = await axios.get("https://fakestoreapi.com/products")
      console.log(data);

      setProduct(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [])


  const addToCart = (product: any) => {
    console.log("working");
    let spread = [...state.cart]
    let checkCart = spread.some(pro => pro.id == product.id)
    console.log(checkCart);
    if (!checkCart) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      localStorage.setItem("cartState", JSON.stringify([...state.cart, product]))
      toast.success(
        <div>
          <p>Item added to cart</p>
          <p>You have {state.cart.length + 1} items</p>
        </div>,
        {
          position: "top-right",
          autoClose: 1500,
          style: {
            zIndex: 99999999 // Adjust the zIndex value as needed
          }
        }
      );
    } else {
      toast.warn(
        <div>
          <p>Item already added</p>
        </div>,
        {
          position: "top-right",
          autoClose: 1500,
        }
      );
    }
  };



  return (
    <main className="min-h-screen w-full">
  <ToastContainer />
  <Navbar />
  <main className="w-full min-h-[90vh] flex justify-center">
    <div className="w-[90%] min-h-[90vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
      {product.map((item: any, index) => {
        return (
          <Link key={item.id} href={`/product/${item.id}`}>
            <div className="relative max-h-96 m-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-transform hover:scale-105">
              <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <Image
                  className="object-contain w-full h-full"
                  src={item.image}
                  alt="product image"
                  width={300}
                  height={300}
                />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{index + 1}% OFF</span>
              </a>
              <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl tracking-tight text-slate-900">{item.title}</h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">${item.price}</span>
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCart(item);
                  }}
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  </main>
  <Footer />
</main>

  );
}
