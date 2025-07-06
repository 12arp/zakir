"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Phone, Mail, Clock } from "lucide-react";
import { FooterSection } from "@/components/layout/sections/footer";

const BACKEND_URL = 'https://sahu-final.onrender.com';

const formSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(10).max(15),
  message: z.string().min(10),
});

const getFullImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${BACKEND_URL}${imageUrl}`;
};

interface Product {
  _id: string;
  image?: string;
  title: string;
  description?: string;
  additionalImages?: string[];
  features?: string[];
  specifications?: {
    name: string;
    value: string;
  }[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, phone, message } = values;
    const mailToLink = `mailto:info@sahumetals.com?subject=Product Enquiry: ${product?.title}&body=Hello, I am ${name}, my Email is ${email}, my Phone number is ${phone}. %0D%0A%0D%0AProduct: ${product?.title}%0D%0A%0D%0AMessage: ${message}`;
    window.location.href = mailToLink;
    setShowEnquiryForm(false);
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-red-500 py-12">Product not found</div>;
  }

  const images = [product.image, ...(product.additionalImages || [])].filter((img): img is string => !!img);

  return (
    <>
      <div className="container py-2 md:py-4 mt-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-background rounded shadow p-4 flex flex-col items-center">
              <div className="w-full h-80 flex items-center justify-center mb-4 bg-[#e6ffe6] rounded">
                {images[selectedImageIndex] && (
                  <Image
                    src={getFullImageUrl(images[selectedImageIndex])}
                    alt={product.title}
                    width={400}
                    height={320}
                    className="object-contain w-auto h-72"
                  />
                )}
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`border rounded p-1 transition ${selectedImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                    style={{ outline: 'none' }}
                  >
                    <Image
                      src={getFullImageUrl(img)}
                      alt={`${product.title} View ${index + 1}`}
                      width={64}
                      height={48}
                      className="object-contain w-16 h-12"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            {product.features && product.features.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                <ul className="list-disc pl-5">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.specifications && product.specifications.length > 0 && (
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                  onClick={() => document.getElementById('specifications')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Specifications
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                  onClick={() => setShowEnquiryForm(true)}
                >
                  Send Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
        {product.specifications && product.specifications.length > 0 && (
          <div id="specifications" className="mt-12 rounded shadow p-6 bg-muted text-foreground">
            <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border bg-background text-foreground">Name</th>
                    <th className="px-4 py-2 border bg-background text-foreground">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border bg-muted text-foreground">{spec.name}</td>
                      <td className="px-4 py-2 border bg-muted text-foreground">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Enquiry Form Modal */}
        {showEnquiryForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Send Enquiry</h2>
                <button
                  onClick={() => setShowEnquiryForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
                  <input type="hidden" name="access_key" value="4d9f7a62-4b12-487d-9ec3-199da11ea174" />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message"
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowEnquiryForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      name="submit"
                      className="!bg-green-600 !text-white"
                    >
                      Send Enquiry
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
      </div>
      <FooterSection />
    </>
  );
} 