"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from "react";
// import ProductGallery from "@/components/ProductGallery";

const BACKEND_URL = 'https://sahu-final.onrender.com';

interface ProductItemProps {
  product: {
    _id: string;
    image?: string;
    additionalImages?: string[];
    title: string;
    description?: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { _id, image, additionalImages, title } = product;

  const getFullImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return '/placeholder.png';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = [image, ...(additionalImages || [])].filter((img): img is string => !!img);

  return (
    <Link href={`/products/${_id}`} className="block group">
      <div className="bg-muted/60 dark:bg-card rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col items-center p-4 h-full">
        <div
          className="w-full h-72 flex items-center justify-center mb-3 rounded cursor-pointer"
          style={{ backgroundColor: 'var(--background-color)' }}
        >
          {images[selectedImageIndex] && (
            <Image
              src={getFullImageUrl(images[selectedImageIndex])}
              alt={title}
              width={320}
              height={280}
              className="object-contain w-auto h-64"
              onError={(e: any) => {
                e.target.src = '/placeholder.png';
              }}
            />
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 flex-wrap justify-center mb-3" onClick={(e) => e.stopPropagation()}>
            {images.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedImageIndex(index);
                }}
                className={`border rounded p-1 transition ${selectedImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                style={{ outline: 'none' }}
              >
                <Image
                  src={getFullImageUrl(img)}
                  alt={`${title} View ${index + 1}`}
                  width={48}
                  height={36}
                  className="object-contain w-12 h-9"
                />
              </button>
            ))}
          </div>
        )}
        <div className="w-full border-t border-gray-300 dark:border-gray-600 my-2"></div>
        <div className="w-full text-center">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem; 