"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/layout/sections/footer";
import { ExternalLink, ArrowUp, Phone, MessageCircle } from "lucide-react";

const API_URL = 'https://sahu-final.onrender.com';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedImageIndices, setSelectedImageIndices] = useState<{ [key: string]: number }>({});
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getFullImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return '/placeholder.png';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_URL}${imageUrl}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        if (data && data.data) {
          setProducts(data.data);
          setError(null);
        } else {
          setError('Invalid data format received');
        }
      } catch (err) {
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleImageClick = (productId: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedImageIndices(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  const toggleContact = (productId: string) => {
    setExpandedContact(expandedContact === productId ? null : productId);
  };

  if (loading) {
    return (
      <div className="container py-16 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return <div className="container py-16 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <section className="container py-12 md:py-16">
        <p className="text-primary text-center mb-2 tracking-wider">Products</p>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-8">Our Products</h2>
        <div className="flex flex-col gap-12">
          {products.map((product, idx) => {
            const images = [product.image, ...(product.additionalImages || [])].filter((img): img is string => !!img);
            const selectedIndex = selectedImageIndices[product._id] || 0;

            return (
              <div
                key={product._id}
                className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Product Image */}
                <div className="flex flex-col items-center">
                  <Link href={`/products/${product._id}`} className="w-full">
                    <div className="w-full h-64 flex items-center justify-center mb-4 bg-[#e6ffe6] rounded-lg cursor-pointer hover:bg-[#d6ffd6] transition-colors">
                      {images[selectedIndex] && (
                        <Image
                          src={getFullImageUrl(images[selectedIndex])}
                          alt={product.title}
                          width={100}
                          height={190}
                          className="object-contain w-auto h-56"
                        />
                      )}
                    </div>
                  </Link>
                  
                  <div className="flex gap-2 flex-wrap justify-center">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleImageClick(product._id, index, e)}
                        className={`border rounded p-1 transition ${selectedIndex === index ? 'border-primary' : 'border-transparent'}`}
                        style={{ outline: 'none' }}
                      >
                        <Image
                          src={getFullImageUrl(img)}
                          alt={`${product.title} View ${index + 1}`}
                          width={48}
                          height={36}
                          className="object-contain w-12 h-9"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                {/* Product Details */}
                <div>
                  <h3 className="text-2xl font-bold mb-1">{product.title || 'Product Title'}</h3>
                  <p className="text-sm mb-2 text-gray-700">
                    {product.description || 'Product discription should be added here. Some brief of the products for the quick overview of the product.'}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => toggleContact(product._id)}
                      className="px-4 py-1 rounded bg-primary text-white text-sm shadow hover:bg-primary/80 transition flex items-center gap-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contact Us
                    </button>
                    {expandedContact === product._id && (
                      <>
                        <a
                          href="https://wa.me/919829961487?text=I%20have%20enquiry"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1 rounded bg-green-500 text-white text-sm shadow hover:bg-green-600 transition flex items-center gap-1"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                        <a
                          href="tel:+919829961487"
                          className="px-4 py-1 rounded bg-blue-500 text-white text-sm shadow hover:bg-blue-600 transition flex items-center gap-1"
                        >
                          <Phone className="w-4 h-4" />
                          Call Us
                        </a>
                      </>
                    )}
                    {product.link && (
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1 rounded bg-blue-500 text-white text-sm shadow hover:bg-blue-600 transition flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Brochure
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
      <FooterSection />
    </>
  );
} 