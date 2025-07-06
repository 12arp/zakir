'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";

const BACKEND_URL = 'https://sahu-final.onrender.com';

const getFullImageUrl = (imageUrl: string) => {
  if (!imageUrl) return '';
  return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl}`;
};

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  additionalImages: string[];
  features: string[];
  specifications: { name: string; value: string }[];
  link: string;
}

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    image: string;
    additionalImages: string[];
    features: string[];
    specifications: { name: string; value: string }[];
    link: string;
  }>({
    title: '',
    description: '',
    image: '',
    additionalImages: [],
    features: [''],
    specifications: [{ name: '', value: '' }],
    link: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('Failed to fetch products');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      image: product.image,
      additionalImages: product.additionalImages || [],
      features: product.features || [''],
      specifications: product.specifications || [{ name: '', value: '' }],
      link: product.link || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/upload`, {
          method: 'POST',
          body: formDataUpload
        });
        const data = await res.json();
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            image: data.data.url || data.data.path
          }));
          setError(null);
        } else {
          setError('Failed to upload image');
        }
      } catch (error) {
        setError('Failed to upload image. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/upload`, {
          method: 'POST',
          body: formDataUpload
        });
        const data = await res.json();
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            additionalImages: [...prev.additionalImages, data.data.url || data.data.path]
          }));
        } else {
          setError('Failed to upload image');
        }
      } catch (error) {
        setError('Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleAddSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };

  const handleRemoveSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const handleSpecificationChange = (index: number, field: 'name' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => i === index ? { ...spec, [field]: value } : spec)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formattedFeatures = formData.features.filter(feature => feature.trim() !== '').map(feature => feature.trim());
      const formattedSpecifications = formData.specifications.filter(spec => spec.name.trim() !== '' && spec.value.trim() !== '').map(spec => ({ name: spec.name.trim(), value: spec.value.trim() }));
      const productData = { ...formData, features: formattedFeatures, specifications: formattedSpecifications };
      let res;
      if (editingProduct) {
        res = await fetch(`${BACKEND_URL}/api/products/${editingProduct}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
      } else {
        res = await fetch(`${BACKEND_URL}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
      }
      const data = await res.json();
      if (data.success) {
        setSuccess(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setFormData({
          title: '',
          description: '',
          image: '',
          additionalImages: [],
          features: [''],
          specifications: [{ name: '', value: '' }],
          link: ''
        });
        setEditingProduct(null);
        fetchProducts();
      } else {
        setError(data.message || 'Failed to save product');
      }
    } catch (error) {
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      additionalImages: [],
      features: [''],
      specifications: [{ name: '', value: '' }],
      link: ''
    });
    setError(null);
    setSuccess(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setSuccess('Product deleted successfully!');
          fetchProducts();
        } else {
          setError('Failed to delete product');
        }
      } catch (error) {
        setError('Failed to delete product');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h1>
        {error && <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-md">{error}</div>}
        {success && <div className="text-green-600 mb-4 p-3 bg-green-50 rounded-md">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block font-semibold">Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Product Link</label>
              <input 
                type="url" 
                name="link" 
                value={formData.link} 
                onChange={handleChange} 
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                placeholder="https://example.com/product"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full border rounded-md px-4 py-2 min-h-[100px] focus:ring-2 focus:ring-primary/20 focus:border-primary" 
              required 
            />
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block font-semibold">Main Image</label>
              <input 
                type="file" 
                onChange={handleImageUpload} 
                accept="image/*" 
                required={!editingProduct} 
                className="w-full p-2 border rounded-md" 
              />
              {formData.image && (
                <div className="mt-2">
                  <Image
            src={getFullImageUrl(formData.image)}
            alt="Preview"
            width={300}
            height={200}
                    className="w-full max-w-[200px] h-auto object-contain rounded-md border"
                  />
                </div>
              )}
        </div>

            <div className="space-y-2">
              <label className="block font-semibold">Additional Images</label>
              <input 
                type="file" 
                onChange={handleAdditionalImageUpload} 
                accept="image/*" 
                className="w-full p-2 border rounded-md" 
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
            {formData.additionalImages.map((img, index) => (
                  <div key={index} className="relative group">
                <Image
                  src={getFullImageUrl(img)}
                  alt={`Additional ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-24 object-contain border rounded-md"
                />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setFormData(prev => ({ ...prev, additionalImages: prev.additionalImages.filter((_, i) => i !== index) }))}
                    >
                      ✕
                    </button>
              </div>
            ))}
          </div>
        </div>
          </div>

          <div className="space-y-4">
            <label className="block font-semibold">Features</label>
            <div className="space-y-2">
          {formData.features.map((feature, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={e => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-600 transition-colors whitespace-nowrap"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full sm:w-auto bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors"
              onClick={handleAddFeature}
            >
              Add Feature
            </button>
        </div>

          <div className="space-y-4">
            <label className="block font-semibold">Specifications</label>
            <div className="space-y-2">
          {formData.specifications.map((spec, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={spec.name}
                    onChange={e => handleSpecificationChange(index, 'name', e.target.value)}
                    placeholder="Name"
                    className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={spec.value}
                      onChange={e => handleSpecificationChange(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-600 transition-colors whitespace-nowrap"
                      onClick={() => handleRemoveSpecification(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full sm:w-auto bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors"
              onClick={handleAddSpecification}
            >
              Add Specification
            </button>
        </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 text-white rounded-md px-6 py-2 hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
            </button>
            {editingProduct && (
              <button
                type="button"
                className="w-full sm:w-auto bg-gray-400 text-white rounded-md px-6 py-2 hover:bg-gray-500 transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
        </div>
      </form>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Existing Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map(product => (
              <div key={product._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square relative mb-4 bg-gray-50 rounded-md overflow-hidden">
              <Image
                src={getFullImageUrl(product.image)}
                alt={product.title}
                    fill
                    className="object-contain p-2"
              />
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="w-full bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="w-full bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 