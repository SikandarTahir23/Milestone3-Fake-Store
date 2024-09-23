"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const SingleProduct = ({ params }: { params: { id: any } }) => {
    const [product, setProduct] = useState<any>(null);

    const fetchProduct = async () => {
        try {
            let { data } = await axios.get(
                `https://fakestoreapi.com/products/${params.id}`
            );
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
            <div className="bgwhite shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row items-center md:items-start transition-all">
                <div className="md:w-1/2 w-full flex justify-center bg-gray-100 p-4">
                    <Image
                        src={product.image}
                        alt={product.title}
                        className="w-full max-w-sm h-auto object-contain"
                        width={100}
                        height={100} />
                </div>

                <div className="md:w-1/2 w-full p-6 md:p-8 lg:p-12">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                        {product.title}
                    </h1>
                    <p className="text-sm text-gray-500 uppercase mb-4">
                        Category: {product.category}
                    </p>
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="flex items-center mb-4">
                        <span className="text-yellow-500 text-2xl font-semibold mr-2">
                            {product.rating.rate}★
                        </span>
                        <span className="text-gray-600">
                            ({product.rating.count} reviews)
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-6">
                        ${product.price}
                    </div>

                </div>
            </div>
        </div>
        
    );
};

export default SingleProduct;
