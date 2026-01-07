'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CreditCard, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { events } from '../data/events';
import { useUser } from '../context/UserContext';

interface CheckoutPageProps {
  cart: string[];
  removeFromCart: (id: string) => void;
  onCheckoutComplete?: () => void;
}

export default function CheckoutPage({ cart, removeFromCart, onCheckoutComplete }: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addEvent } = useUser();

  // Filter events that are in the cart
  const cartItems = events.filter(event => cart.includes(event.id));

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const platformFee = Math.round(subtotal * 0.05); // 5% fee
  const total = subtotal + platformFee;

  const handleCheckout = async () => {
    setIsProcessing(true);

    // Simulate backend API call
    const payload = {
      items: cartItems.map(item => ({ id: item.id, price: item.price })),
      totalAmount: total,
      currency: 'INR',
      timestamp: new Date().toISOString()
    };

    console.log('Processing Transaction...', payload);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Determine successful transaction and grant access
    cartItems.forEach(item => addEvent(item.id));

    setIsProcessing(false);
    setIsSuccess(true);

    // Optional: clear cart or redirect after delay
    if (onCheckoutComplete) {
      setTimeout(onCheckoutComplete, 3000);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-12 text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-green-100/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Transaction Secure</h2>
          <p className="text-slate-500 mb-8">
            Your slots have been reserved on the blockchain. Welcome to the grid.
          </p>
          <div className="p-4 bg-slate-100/50 rounded-lg text-xs font-mono text-slate-400 break-all mb-8">
            TXN_ID: 0x71C...{Math.random().toString(36).substring(7).toUpperCase()}
          </div>
          <button
            onClick={() => window.location.reload()} // Simple reset for now
            className="btn-primary w-full"
          >
            Return to Hub
          </button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Sparkles size={32} className="text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Neural Link Empty</h2>
        <p className="text-slate-500 max-w-md">
          No protocols selected. Return to the event dossiers to initiate selection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-12 pb-24">
      <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-8 tracking-tight">
        Secure <span className="text-blue-600">Checkout</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
            <span>Selected Protocols</span>
            <span>{cart.length} Items</span>
          </div>

          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel p-4 md:p-6 flex items-start md:items-center justify-between group hover:border-blue-300/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold
                                         ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      item.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'}
                                     `}>
                    {item.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{item.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <span className="font-bold text-slate-700">₹{item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Panel */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="glass-panel p-8 sticky top-24">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <CreditCard size={20} className="text-blue-500" />
              Payment Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Fee (5%)</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="flex justify-between text-lg font-black text-slate-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="btn-primary w-full py-4 text-lg shadow-xl relative overflow-hidden group"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Pay ₹{total} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}

              {/* Shiny effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Lock size={12} />
              <span>Encrypted & Secured via 256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
