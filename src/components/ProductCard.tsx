import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onAddToCart(product)}
            className="bg-white text-indigo-600 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <span className="font-bold text-indigo-600">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-900 py-2.5 rounded-xl font-medium hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
