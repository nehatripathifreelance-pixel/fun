
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Wallet, 
  Truck, 
  MessageSquare, 
  User, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  MapPin, 
  Phone, 
  ChevronRight,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supportService } from '../services/support-service';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  img: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingId: string;
  deliverySlot?: string;
}

interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  fullAddress: string;
  isDefault: boolean;
}

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  addresses: Address[];
  rewardPoints: number;
}

interface Offer {
  id: string;
  code: string;
  description: string;
  discount: number;
  type: 'percentage' | 'flat';
}

const CustomerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shop' | 'orders' | 'wallet' | 'support' | 'profile'>('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [walletBalance, setWalletBalance] = useState(1250);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-7821',
      date: '2024-03-05',
      items: [{ id: 1, name: 'Pure Cow Milk', price: 65, unit: '1L', img: '', category: 'Milk', quantity: 2 }],
      total: 130,
      status: 'Out for Delivery',
      trackingId: 'TRK-992811',
      deliverySlot: '06:00 AM - 08:00 AM'
    }
  ]);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@example.in',
    rewardPoints: 450,
    addresses: [
      { 
        id: '1', 
        type: 'Home', 
        fullAddress: 'Flat 402, Green Valley Apartments, Sector 45, Gurgaon, Haryana - 122003',
        isDefault: true 
      }
    ]
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [feedback, setFeedback] = useState({ type: 'Feedback', message: '' });
  
  // New states for requested features
  const [selectedSlot, setSelectedSlot] = useState('06:00 AM - 08:00 AM');
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState({ type: 'Home' as const, fullAddress: '' });
  const [editProfileForm, setEditProfileForm] = useState({ name: '', phone: '', email: '' });

  const timeSlots = [
    '06:00 AM - 08:00 AM',
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '05:00 PM - 07:00 PM',
    '07:00 PM - 09:00 PM'
  ];

  const offers: Offer[] = [
    { id: '1', code: 'FRESH20', description: '20% off on first order', discount: 20, type: 'percentage' },
    { id: '2', code: 'MILK50', description: 'Flat ₹50 off on orders above ₹500', discount: 50, type: 'flat' },
    { id: '3', code: 'DAIRY10', description: '10% off on all dairy products', discount: 10, type: 'percentage' },
  ];

  const products: Product[] = [
    { id: 1, name: 'Pure Cow Milk', price: 65, unit: '1L', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400', category: 'Milk' },
    { id: 2, name: 'Fresh Paneer', price: 120, unit: '250g', img: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&q=80&w=400', category: 'Dairy' },
    { id: 3, name: 'Buffalo Ghee', price: 650, unit: '1kg', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=400', category: 'Dairy' },
    { id: 4, name: 'Set Curd', price: 45, unit: '400g', img: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=400', category: 'Dairy' },
    { id: 5, name: 'Unsalted Butter', price: 110, unit: '200g', img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400', category: 'Dairy' },
    { id: 6, name: 'Flavored Milk', price: 30, unit: '200ml', img: 'https://images.unsplash.com/photo-1563636619-e9107da5a19b?auto=format&fit=crop&q=80&w=400', category: 'Milk' },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  
  const cartTotal = useMemo(() => {
    let total = cartSubtotal;
    if (appliedOffer) {
      if (appliedOffer.type === 'percentage') {
        total = total * (1 - appliedOffer.discount / 100);
      } else {
        total = Math.max(0, total - appliedOffer.discount);
      }
    }
    return Math.round(total);
  }, [cartSubtotal, appliedOffer]);

  const handleCheckout = () => {
    if (walletBalance < cartTotal) {
      alert('Insufficient wallet balance. Please recharge.');
      return;
    }
    setWalletBalance(prev => prev - cartTotal);
    
    // Add reward points (1 point for every ₹10 spent)
    const earnedPoints = Math.floor(cartTotal / 10);
    setProfile(prev => ({ ...prev, rewardPoints: prev.rewardPoints + earnedPoints }));

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: cartTotal,
      status: 'Processing',
      trackingId: `TRK-${Math.floor(Math.random() * 1000000)}`,
      deliverySlot: selectedSlot
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setAppliedOffer(null);
    setShowCheckout(false);
    setActiveTab('orders');
  };

  const handleUpdateProfile = () => {
    setProfile(prev => ({
      ...prev,
      name: editProfileForm.name,
      phone: editProfileForm.phone,
      email: editProfileForm.email
    }));
    setIsEditingProfile(false);
  };

  const handleAddAddress = () => {
    if (!newAddress.fullAddress) return;
    const address: Address = {
      id: Math.random().toString(36).substr(2, 9),
      type: newAddress.type,
      fullAddress: newAddress.fullAddress,
      isDefault: profile.addresses.length === 0
    };
    setProfile(prev => ({
      ...prev,
      addresses: [...prev.addresses, address]
    }));
    setNewAddress({ type: 'Home', fullAddress: '' });
    setIsAddingAddress(false);
  };

  const handleDeleteAddress = (id: string) => {
    setProfile(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id)
    }));
  };

  const handleSetDefaultAddress = (id: string) => {
    setProfile(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({ ...a, isDefault: a.id === id }))
    }));
  };

  const handleRecharge = () => {
    const amount = parseFloat(rechargeAmount);
    if (isNaN(amount) || amount <= 0) return;
    setWalletBalance(prev => prev + amount);
    setRechargeAmount('');
    setShowRecharge(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Top Navigation */}
      <div className="flex overflow-x-auto gap-2 mb-8 p-1 bg-white rounded-2xl border border-slate-200 sticky top-0 z-30 no-scrollbar">
        {[
          { id: 'shop', icon: ShoppingBag, label: 'Shop' },
          { id: 'orders', icon: Truck, label: 'Orders' },
          { id: 'wallet', icon: Wallet, label: 'Wallet' },
          { id: 'support', icon: MessageSquare, label: 'Support' },
          { id: 'profile', icon: User, label: 'Profile' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
            {tab.id === 'shop' && cart.length > 0 && (
              <span className="bg-blue-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'shop' && (
          <motion.div 
            key="shop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Promo Banner */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="relative z-10 max-w-md">
                <h2 className="text-4xl font-black mb-4 leading-tight">Fresh from Farm to Your Doorstep!</h2>
                <p className="text-blue-100 mb-8 text-lg font-medium opacity-90">Subscribe to our daily milk delivery and get 20% cashback in your wallet.</p>
                <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-xl shadow-blue-900/20 hover:scale-105 transition-transform">
                  Subscribe Daily
                </button>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/10 backdrop-blur-3xl -skew-x-12 translate-x-1/2"></div>
              <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400" alt="Milk" className="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-64 object-cover rounded-3xl shadow-2xl border-4 border-white/20 rotate-6 hidden md:block" />
            </div>

            {/* Offers Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <Star className="text-amber-500 fill-amber-500" size={24} />
                Exclusive Offers
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {offers.map(offer => (
                  <div key={offer.id} className="min-w-[300px] bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {offer.code}
                      </div>
                      <button 
                        onClick={() => {
                          setAppliedOffer(offer);
                          alert(`Offer ${offer.code} applied!`);
                        }}
                        className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                      >
                        APPLY
                      </button>
                    </div>
                    <h4 className="font-black text-slate-900 mb-1">{offer.description}</h4>
                    <p className="text-xs text-slate-400 font-medium">Valid on all dairy products</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden group hover:shadow-2xl hover:shadow-slate-200 transition-all">
                  <div className="h-56 overflow-hidden relative">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black text-slate-900">{product.name}</h3>
                      <span className="text-slate-400 font-bold text-sm">{product.unit}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                      <span className="text-[10px] font-bold text-slate-400 ml-1">(4.8)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                      >
                        <Plus size={16} />
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div 
            key="orders"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black text-slate-900 mb-8">My Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-[2.5rem] text-center border border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">No orders yet</h3>
                <p className="text-slate-500 mb-8">Start shopping to see your orders here.</p>
                <button onClick={() => setActiveTab('shop')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black">Browse Products</button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden">
                  <div className="p-6 bg-slate-50 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ORDER ID</p>
                        <p className="font-black text-slate-900">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">DELIVERY SLOT</p>
                        <p className="font-black text-slate-900">{order.deliverySlot || 'Early Morning'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                      <button className="text-slate-400 hover:text-slate-900 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1 space-y-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">🥛</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-900">{item.name}</h4>
                              <p className="text-xs text-slate-500">{item.quantity} x ₹{item.price}</p>
                            </div>
                            <p className="font-black text-slate-900">₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>
                      <div className="w-full md:w-64 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">TRACKING INFO</p>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="text-xs font-bold text-slate-900">{order.trackingId}</p>
                          </div>
                          <div className="relative pl-4 space-y-4 border-l-2 border-slate-200">
                            <div className="relative">
                              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                              <p className="text-xs font-bold text-slate-900">Order Placed</p>
                              <p className="text-[10px] text-slate-400">10:30 AM</p>
                            </div>
                            <div className="relative">
                              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                              <p className="text-xs font-bold text-slate-900">Processing</p>
                              <p className="text-[10px] text-slate-400">11:15 AM</p>
                            </div>
                            <div className="relative opacity-50">
                              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-300 rounded-full border-2 border-white shadow-sm"></div>
                              <p className="text-xs font-bold text-slate-900">Shipped</p>
                              <p className="text-[10px] text-slate-400">Pending</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'wallet' && (
          <motion.div 
            key="wallet"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8 opacity-60">
                    <Wallet size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Smart Dairy Wallet</span>
                  </div>
                  <p className="text-slate-400 text-sm font-bold mb-2">Current Balance</p>
                  <h2 className="text-6xl font-black mb-12 tabular-nums">₹{walletBalance.toLocaleString()}</h2>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowRecharge(true)}
                      className="flex-1 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-blue-500 hover:text-white transition-all"
                    >
                      RECHARGE
                    </button>
                    <button className="flex-1 py-4 bg-white/10 backdrop-blur text-white rounded-2xl font-black text-sm border border-white/10 hover:bg-white/20 transition-all">
                      HISTORY
                    </button>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900">Quick Recharge</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[500, 1000, 2000, 5000, 10000, 25000].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => {
                        setRechargeAmount(amt.toString());
                        setShowRecharge(true);
                      }}
                      className="p-6 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center text-xl shadow-lg shadow-blue-200">🎁</div>
                  <div>
                    <h4 className="font-black text-blue-900 text-sm">Recharge Offer!</h4>
                    <p className="text-blue-700 text-xs font-medium">Get extra 5% on recharges above ₹2,000.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900">Recent Transactions</h3>
                <button className="text-blue-600 font-black text-xs uppercase tracking-widest">View All</button>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { type: 'Order Payment', id: '#ORD-7821', amt: -130, date: 'Today, 10:30 AM', status: 'Success' },
                  { type: 'Wallet Recharge', id: '#TXN-9921', amt: 500, date: 'Yesterday, 04:20 PM', status: 'Success' },
                  { type: 'Order Payment', id: '#ORD-7712', amt: -450, date: '04 Mar 2024', status: 'Success' },
                ].map((txn, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        txn.amt > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                      }`}>
                        {txn.amt > 0 ? <Plus size={20} /> : <Minus size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{txn.type}</h4>
                        <p className="text-xs text-slate-400 font-medium">{txn.id} • {txn.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-lg tabular-nums ${txn.amt > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {txn.amt > 0 ? '+' : ''}₹{Math.abs(txn.amt)}
                      </p>
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{txn.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'support' && (
          <motion.div 
            key="support"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-black text-slate-900 mb-2">How can we help?</h2>
                <p className="text-slate-500 mb-10 font-medium">Send us your feedback, complaints, or support requests.</p>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    {['Feedback', 'Complaint', 'Support', 'Request'].map(type => (
                      <button
                        key={type}
                        onClick={() => setFeedback({ ...feedback, type })}
                        className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                          feedback.type === type 
                            ? 'bg-slate-900 text-white shadow-lg' 
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Your Message</label>
                    <textarea 
                      rows={6}
                      value={feedback.message}
                      onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                      placeholder="Describe your issue or share your thoughts..."
                      className="w-full px-8 py-6 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium text-slate-800 shadow-inner resize-none"
                    ></textarea>
                  </div>

                  <button 
                    onClick={() => {
                      if (!feedback.message) return;
                      supportService.addRequest({
                        user: profile.name,
                        type: feedback.type as any,
                        message: feedback.message
                      });
                      alert('Thank you! Your request has been submitted.');
                      setFeedback({ ...feedback, message: '' });
                    }}
                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                  >
                    SUBMIT REQUEST
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200">
                <h4 className="text-xl font-black mb-4">24/7 Support</h4>
                <p className="text-blue-100 text-sm font-medium mb-8 opacity-90">Our team is always here to help you with your orders and subscriptions.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10">
                    <Phone size={20} />
                    <div>
                      <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">CALL US</p>
                      <p className="font-black">1800-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10">
                    <MessageSquare size={20} />
                    <div>
                      <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">WHATSAPP</p>
                      <p className="font-black">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
                <h4 className="text-lg font-black text-slate-900 mb-6">Common FAQs</h4>
                <div className="space-y-4">
                  {[
                    'How to cancel subscription?',
                    'Payment failed but amount deducted',
                    'Delivery timing for my area',
                    'Quality concern report'
                  ].map((faq, i) => (
                    <button key={i} className="w-full text-left p-4 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all flex justify-between items-center">
                      {faq}
                      <ChevronRight size={14} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div 
            key="profile"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm text-center">
              <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl border-4 border-white shadow-xl">👤</div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">{profile.name}</h2>
              <p className="text-slate-400 font-bold text-sm mb-4">{profile.email}</p>
              
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-8">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">REWARD POINTS</p>
                <div className="flex items-center justify-center gap-2">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span className="text-2xl font-black text-amber-900">{profile.rewardPoints}</span>
                </div>
              </div>

              <div className="flex justify-center gap-4 mb-10">
                <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Gold Member</div>
                <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Verified</div>
              </div>
              
              <button 
                onClick={() => {
                  setEditProfileForm({ name: profile.name, phone: profile.phone, email: profile.email });
                  setIsEditingProfile(true);
                }}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
              >
                EDIT PROFILE
              </button>
            </div>

            <div className="md:col-span-2 space-y-8">
              {isEditingProfile ? (
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                  <h3 className="text-xl font-black text-slate-900 mb-8">Edit Profile</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                        <input 
                          type="text" 
                          value={editProfileForm.name}
                          onChange={e => setEditProfileForm({...editProfileForm, name: e.target.value})}
                          className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Phone Number</label>
                        <input 
                          type="text" 
                          value={editProfileForm.phone}
                          onChange={e => setEditProfileForm({...editProfileForm, phone: e.target.value})}
                          className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                      <input 
                        type="email" 
                        value={editProfileForm.email}
                        onChange={e => setEditProfileForm({...editProfileForm, email: e.target.value})}
                        className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                      />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                      <button 
                        onClick={() => setIsEditingProfile(false)}
                        className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleUpdateProfile}
                        className="px-10 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <Phone size={24} className="text-blue-500" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Primary Phone</label>
                      <div className="px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-800">{profile.phone}</div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Email Address</label>
                      <div className="px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-800">{profile.email}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <MapPin size={24} className="text-blue-500" />
                    Address Management
                  </h3>
                  <button 
                    onClick={() => setIsAddingAddress(true)}
                    className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
                  >
                    <Plus size={16} />
                    ADD NEW
                  </button>
                </div>

                {isAddingAddress && (
                  <div className="mb-8 p-8 bg-blue-50 rounded-[2rem] border border-blue-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h4 className="text-sm font-black text-blue-900 mb-6">Add New Address</h4>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        {(['Home', 'Work', 'Other'] as const).map(type => (
                          <button
                            key={type}
                            onClick={() => setNewAddress({ ...newAddress, type })}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                              newAddress.type === type 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-slate-400 border border-slate-200'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      <textarea 
                        placeholder="Enter full address with landmark and pincode..."
                        value={newAddress.fullAddress}
                        onChange={e => setNewAddress({ ...newAddress, fullAddress: e.target.value })}
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700 resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => setIsAddingAddress(false)}
                          className="px-6 py-2 bg-white text-slate-500 rounded-lg font-bold text-xs"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleAddAddress}
                          className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs shadow-lg shadow-blue-600/20"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {profile.addresses.map(address => (
                    <div key={address.id} className={`p-8 rounded-[2rem] border relative group transition-all ${
                      address.isDefault ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{address.type}</span>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[8px] font-black uppercase tracking-widest">DEFAULT</span>
                          )}
                        </div>
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!address.isDefault && (
                            <button 
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                            >
                              SET DEFAULT
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:underline"
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-800 font-bold leading-relaxed">{address.fullAddress}</p>
                    </div>
                  ))}
                  
                  {profile.addresses.length === 0 && (
                    <div className="md:col-span-2 p-12 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-300">
                      <MapPin size={32} className="mx-auto text-slate-300 mb-4" />
                      <p className="text-slate-500 font-medium">No addresses saved yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Floating Bar */}
      {cart.length > 0 && activeTab === 'shop' && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-2xl z-50 flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl relative">
              🛒
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-slate-900">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CART TOTAL</p>
              <p className="text-2xl font-black tabular-nums">₹{cartTotal.toLocaleString()}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCheckout(true)}
            className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-3"
          >
            CHECKOUT
            <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="p-10 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-900">Checkout</h3>
              <button onClick={() => setShowCheckout(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <div className="p-10 max-h-[60vh] overflow-y-auto space-y-8 no-scrollbar">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">DELIVERY TIME SLOT</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border ${
                        selectedSlot === slot 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">ORDER SUMMARY</p>
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl">🥛</div>
                      <div>
                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-blue-600"><Minus size={14} /></button>
                          <span className="text-sm font-black text-slate-900 w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-blue-600"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">₹{item.price * item.quantity}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 mt-1"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>

              {appliedOffer && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-xs">🏷️</div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">OFFER APPLIED</p>
                      <p className="text-xs font-bold text-emerald-900">{appliedOffer.code} - {appliedOffer.description}</p>
                    </div>
                  </div>
                  <button onClick={() => setAppliedOffer(null)} className="text-emerald-600 hover:text-emerald-700">
                    <Plus size={16} className="rotate-45" />
                  </button>
                </div>
              )}

              <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-900">Subtotal</span>
                  <span className="font-black text-blue-900">₹{cartSubtotal.toLocaleString()}</span>
                </div>
                {appliedOffer && (
                  <div className="flex justify-between items-center text-emerald-600">
                    <span className="text-sm font-bold">Discount</span>
                    <span className="font-black">-₹{cartSubtotal - cartTotal}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-900">Wallet Balance</span>
                  <span className="font-black text-blue-900">₹{walletBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-blue-200">
                  <span className="text-lg font-black text-blue-900">Total Payable</span>
                  <span className="text-2xl font-black text-blue-900">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">SHIPPING TO</p>
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <MapPin size={20} className="text-slate-400 mt-1" />
                  <p className="text-sm font-bold text-slate-800 leading-relaxed">
                    {profile.addresses.find(a => a.isDefault)?.fullAddress || 'No default address selected'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-10 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={handleCheckout}
                className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                PAY FROM WALLET
                <CreditCard size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Recharge Modal */}
      {showRecharge && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="p-10 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-900">Recharge Wallet</h3>
              <button onClick={() => setShowRecharge(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Enter Amount (₹)</label>
                <input 
                  type="number" 
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="e.g. 1000"
                  className="w-full px-8 py-6 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-900 text-3xl tabular-nums shadow-inner" 
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[500, 1000, 2000].map(amt => (
                  <button 
                    key={amt}
                    onClick={() => setRechargeAmount(amt.toString())}
                    className="py-3 bg-slate-50 rounded-xl font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-200"
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleRecharge}
                className="w-full py-6 bg-blue-500 text-white rounded-[2rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 hover:bg-blue-600 transition-all active:scale-95"
              >
                PROCEED TO PAY
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CustomerPanel;
