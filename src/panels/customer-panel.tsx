
import React from 'react';

const CustomerPanel: React.FC = () => {
  const products = [
    { name: 'Pure Cow Milk', price: 65, unit: '1L', img: 'https://picsum.photos/400/400?1' },
    { name: 'Fresh Paneer', price: 120, unit: '250g', img: 'https://picsum.photos/400/400?2' },
    { name: 'Buffalo Ghee', price: 650, unit: '1kg', img: 'https://picsum.photos/400/400?3' },
    { name: 'Set Curd', price: 45, unit: '400g', img: 'https://picsum.photos/400/400?4' },
    { name: 'Unsalted Butter', price: 110, unit: '200g', img: 'https://picsum.photos/400/400?5' },
    { name: 'Flavored Milk', price: 30, unit: '200ml', img: 'https://picsum.photos/400/400?6' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-pink-50 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between border border-pink-100 overflow-hidden relative">
        <div className="z-10">
          <h2 className="text-3xl font-black text-pink-900 mb-2">Morning Freshness!</h2>
          <p className="text-pink-700 font-medium mb-6">Subscribe now and get 15% off on your first month.</p>
          <button className="px-6 py-3 bg-pink-600 text-white rounded-2xl font-bold shadow-lg shadow-pink-200">Start Subscription</button>
        </div>
        <div className="w-48 h-48 bg-pink-100 rounded-full blur-3xl absolute -right-10 -top-10 opacity-50"></div>
        <img src="https://picsum.photos/300/200?abstract" alt="Promo" className="z-10 rounded-2xl mt-6 md:mt-0 shadow-xl border-4 border-white transform rotate-3" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Fresh Products</h3>
          <div className="flex gap-2">
            {['All', 'Milk', 'Dairy', 'Sweets'].map(cat => (
              <button key={cat} className="px-4 py-2 rounded-xl text-sm font-bold bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all">{cat}</button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-48 overflow-hidden relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-md">
                   ❤️
                </button>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-slate-800 text-lg mb-1">{p.name}</h4>
                <p className="text-slate-500 text-sm font-medium mb-4">{p.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900">₹{p.price}</span>
                  <button className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl text-white grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-4">
          <span className="text-4xl mb-4">🚚</span>
          <h4 className="font-bold text-lg mb-2">Free Delivery</h4>
          <p className="text-slate-400 text-sm">On orders above ₹500 or active subscriptions.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <span className="text-4xl mb-4">🛡️</span>
          <h4 className="font-bold text-lg mb-2">Quality Assured</h4>
          <p className="text-slate-400 text-sm">Every batch lab-tested at our processing units.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <span className="text-4xl mb-4">📱</span>
          <h4 className="font-bold text-lg mb-2">Live Tracking</h4>
          <p className="text-slate-400 text-sm">Real-time GPS tracking for your morning milk.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPanel;
