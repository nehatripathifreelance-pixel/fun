
import React, { useState } from 'react';

const BoothPanel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const products = [
    { name: 'Standard Milk (500ml)', stock: 42, sold: 180, price: '₹32', icon: '🥛' },
    { name: 'Toned Milk (500ml)', stock: 12, sold: 145, price: '₹28', icon: '🥛' },
    { name: 'Full Cream (500ml)', stock: 0, sold: 120, price: '₹36', icon: '🐄' },
    { name: 'Fresh Curd (200g)', stock: 24, sold: 85, price: '₹15', icon: '🥣' },
    { name: 'Desi Ghee (1kg)', stock: 8, sold: 42, price: '₹680', icon: '🏺' },
  ];

  return (
    <div className="space-y-10 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Inventory Management */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Booth Point-of-Sale</h2>
                 <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Active Booth: BH-782 (City West)</p>
              </div>
              <div className="flex gap-2">
                 {['All', 'Milk', 'Sweets'].map(cat => (
                   <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((item, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] border-2 transition-all group ${
                  item.stock === 0 ? 'border-red-50 bg-red-50/20' : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:border-blue-100'
                }`}>
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform">
                        {item.icon}
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black text-slate-900">{item.price}</p>
                         <p className="text-[9px] text-slate-400 font-black uppercase">Unit Rate</p>
                      </div>
                   </div>
                   <h4 className="font-black text-slate-800 text-lg mb-2">{item.name}</h4>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-6">
                      <span className="text-slate-400">Inventory Status</span>
                      <span className={item.stock === 0 ? 'text-red-600' : 'text-emerald-600'}>
                        {item.stock === 0 ? 'Out of Stock' : `${item.stock} Units Left`}
                      </span>
                   </div>
                   <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-slate-100">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${item.stock < 10 ? 'bg-orange-500' : 'bg-blue-600'}`} 
                        style={{ width: `${(item.stock / 50) * 100}%` }}
                      ></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Booth Summary Panel */}
        <div className="space-y-8">
           <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="font-black text-xl mb-10 flex items-center gap-3 relative z-10">
                 <span className="text-2xl">⚡</span> Quick Settlement
              </h3>
              <div className="space-y-8 relative z-10">
                <div className="text-center">
                   <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-2">Real-time Revenue</p>
                   <p className="text-5xl font-black tracking-tighter">₹14,280</p>
                   <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Processed Today</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                     <p className="text-[9px] text-blue-300 font-black uppercase mb-1">Online</p>
                     <p className="font-black text-lg">₹9,450</p>
                  </div>
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                     <p className="text-[9px] text-orange-300 font-black uppercase mb-1">Cash</p>
                     <p className="font-black text-lg">₹4,830</p>
                  </div>
                </div>

                <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all">
                   EOD Settlement
                </button>
              </div>
           </div>

           <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 text-center">Customer Satisfaction</h3>
              <div className="space-y-6">
                 {[
                   { label: 'Rating', val: '4.8/5.0', icon: '⭐' },
                   { label: 'Return rate', val: '0.2%', icon: '↩️' },
                   { label: 'Subscribers', val: '142', icon: '📅' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{stat.icon}</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase">{stat.label}</span>
                      </div>
                      <span className="font-black text-slate-800">{stat.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BoothPanel;
