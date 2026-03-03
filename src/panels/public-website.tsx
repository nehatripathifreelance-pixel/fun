
import React from 'react';

interface PublicWebsiteProps {
  onEnterStore: () => void;
}

const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onEnterStore }) => {
  return (
    <div className="bg-white -m-4 md:-m-6 p-0 overflow-hidden text-slate-900">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center px-8 md:px-20 overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-950">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <img src="https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80" alt="Dairy Farm" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl animate-slideInLeft">
          <div className="inline-block px-4 py-1.5 bg-blue-500 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Developed by Digital Communique
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Smart Dairy <span className="text-blue-400">ERP System</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
            Empowering the entire dairy ecosystem—from small farmers to bulk distributors—with real-time IoT tracking, AI demand forecasting, and seamless digital payments.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onEnterStore}
              className="px-10 py-5 bg-white text-blue-900 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-2xl shadow-blue-500/20"
            >
              Shop Fresh Products
            </button>
            <button className="px-10 py-5 bg-blue-600/20 backdrop-blur text-white border border-white/20 rounded-2xl font-black text-lg hover:bg-blue-600/40 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-8 md:px-20 bg-slate-50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-800 mb-4">A Complete Digital Flow</h2>
          <p className="text-slate-500 font-medium">Connecting every stage of your dairy business through high-precision cloud technology.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Farmer App', desc: 'Real-time milk supply entry, FAT/SNF reports, and instant digital payments for farmers.', icon: '🚜' },
            { title: 'BMC System', desc: 'Automated weight & quality capture with machine integration and IoT cooling monitoring.', icon: '❄️' },
            { title: 'Tanker GPS', desc: 'End-to-end fleet tracking with IoT temperature sensors and route deviation alerts.', icon: '🚛' },
            { title: 'Factory ERP', desc: 'Process logging, quality control lab data, and high-efficiency production unit management.', icon: '🏭' },
            { title: 'AI Demand Hub', desc: 'Advanced demand forecasting using Gemini AI to optimize stock and reduce damage.', icon: '🤖' },
            { title: 'Customer Store', desc: 'Full e-commerce experience with subscription tracking, live delivery, and UPI payments.', icon: '🛍️' },
          ].map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Showcase (Quick View) */}
      <section className="py-20 px-8 md:px-20 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div>
              <h2 className="text-3xl font-black text-slate-800">Our Fresh Range</h2>
              <p className="text-slate-500 font-medium">Straight from our farms to your doorstep.</p>
           </div>
           <button onClick={onEnterStore} className="text-blue-600 font-bold hover:underline">Explore Full Store →</button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { name: 'Cow Milk', price: '₹65', img: 'https://picsum.photos/400/400?milk' },
             { name: 'Fresh Ghee', price: '₹650', img: 'https://picsum.photos/400/400?ghee' },
             { name: 'Soft Paneer', price: '₹120', img: 'https://picsum.photos/400/400?paneer' },
             { name: 'Thick Curd', price: '₹45', img: 'https://picsum.photos/400/400?curd' },
           ].map((p, i) => (
             <div key={i} className="group cursor-pointer">
                <div className="h-64 rounded-3xl overflow-hidden mb-4 relative">
                   <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <h4 className="font-bold text-slate-800">{p.name}</h4>
                <p className="text-blue-600 font-black">{p.price}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Developer Footer */}
      <footer className="py-20 px-8 md:px-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-6">Ready to Digitalize Your Dairy?</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            The Smart Dairy ERP System is a cutting-edge software solution designed and developed to modernize the dairy industry at every scale. 
          </p>
          <div className="h-px bg-slate-800 w-full mb-10"></div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-2">Developed By</p>
          <p className="text-2xl font-black text-white mb-4">Digital Communique</p>
          <p className="text-slate-500 text-sm">© 2024 Smart Dairy ERP. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicWebsite;
