
import React, { useState } from 'react';
import { 
  Globe, Layout, Info, Phone, MapPin, Share2, Image as ImageIcon, 
  Palette, Users, Plus, Trash2, Save, ChevronRight, Search, Database,
  Download, FileText, Printer
} from 'lucide-react';

const WebsiteCMS: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const [settings, setSettings] = useState({
    theme: {
      headerColor: '#1e293b',
      primaryColor: '#3b82f6',
      wallpaper: 'https://picsum.photos/seed/dairy/1920/1080',
      bannerText: 'Empowering Farmers, Delivering Purity'
    },
    home: {
      heroTitle: 'Smart Dairy Solutions',
      heroSubtitle: 'Connecting local farmers to your doorstep with AI-driven quality assurance.',
      showFarmerAnimation: true,
      sections: [
        { id: '1', title: 'Freshness Guaranteed', content: 'Our milk is tested at 42 parameters.' },
        { id: '2', title: 'Direct from Farm', content: 'No middlemen, just pure dairy.' }
      ]
    },
    about: {
      vision: 'To be the global leader in sustainable dairy technology.',
      mission: 'Empowering small-scale farmers through digital transformation.',
      aboutText: 'Smart Dairy is a next-generation ERP for the dairy industry.',
      whyChooseUs: [
        'Real-time quality tracking',
        'Transparent pricing for farmers',
        'Eco-friendly processing'
      ]
    },
    contact: {
      address: '123 Dairy Lane, Shimla, Himachal Pradesh, 171001',
      phone: '+91 98765 43210',
      email: 'contact@smartdairy.in',
      mapUrl: 'https://maps.google.com/...'
    },
    social: {
      facebook: 'https://facebook.com/smartdairy',
      twitter: 'https://twitter.com/smartdairy',
      instagram: 'https://instagram.com/smartdairy',
      linkedin: 'https://linkedin.com/company/smartdairy'
    },
    products: {
      showAddToCart: true,
      currency: 'INR',
      taxRate: '5%',
      deliveryCharge: '₹20'
    },
    productList: [
      { id: '1', name: 'Pure Cow Milk', price: '₹60/L', category: 'Milk' },
      { id: '2', name: 'Fresh Paneer', price: '₹400/kg', category: 'Cheese' },
      { id: '3', name: 'Organic Ghee', price: '₹800/L', category: 'Ghee' }
    ],
    locations: [
      { id: '1', state: 'Himachal Pradesh', city: 'Shimla', pincode: '171001' },
      { id: '2', state: 'Himachal Pradesh', city: 'Solan', pincode: '173212' },
      { id: '3', state: 'Punjab', city: 'Ludhiana', pincode: '141001' },
      { id: '4', state: 'Haryana', city: 'Ambala', pincode: '133001' },
      { id: '5', state: 'Uttarakhand', city: 'Dehradun', pincode: '248001' }
    ]
  });

  const [locationSearch, setLocationSearch] = useState('');
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({ state: '', city: '', pincode: '' });

  const [productSearch, setProductSearch] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });

  const filteredLocations = settings.locations.filter(loc => 
    loc.state.toLowerCase().includes(locationSearch.toLowerCase()) ||
    loc.city.toLowerCase().includes(locationSearch.toLowerCase()) ||
    loc.pincode.includes(locationSearch)
  );

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.state || !newLocation.city) return;
    const loc = {
      id: Math.random().toString(36).substr(2, 9),
      ...newLocation
    };
    setSettings({
      ...settings,
      locations: [...settings.locations, loc]
    });
    setNewLocation({ state: '', city: '', pincode: '' });
    setShowAddLocation(false);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const prod = {
      id: Math.random().toString(36).substr(2, 9),
      ...newProduct
    };
    setSettings({
      ...settings,
      productList: [...settings.productList, prod]
    });
    setNewProduct({ name: '', price: '', category: '' });
    setShowAddProduct(false);
  };

  const removeProduct = (id: string) => {
    setSettings({
      ...settings,
      productList: settings.productList.filter(p => p.id !== id)
    });
  };

  const removeLocation = (id: string) => {
    setSettings({
      ...settings,
      locations: settings.locations.filter(l => l.id !== id)
    });
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Palette size={14} /> Visual Identity
                </h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Header Theme Color</label>
                    <div className="flex gap-4 items-center">
                      <input 
                        type="color" 
                        value={settings.theme.headerColor}
                        onChange={e => setSettings({...settings, theme: {...settings.theme, headerColor: e.target.value}})}
                        className="w-12 h-12 rounded-xl border-none cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={settings.theme.headerColor}
                        onChange={e => setSettings({...settings, theme: {...settings.theme, headerColor: e.target.value}})}
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Main Wallpaper URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={settings.theme.wallpaper}
                        onChange={e => setSettings({...settings, theme: {...settings.theme, wallpaper: e.target.value}})}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Layout size={14} /> Banner Settings
                </h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Announcement Banner Text</label>
                    <textarea 
                      value={settings.theme.bannerText}
                      onChange={e => setSettings({...settings, theme: {...settings.theme, bannerText: e.target.value}})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'home':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users size={14} /> Hero Section & Community
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Farmer Animation</span>
                  <button 
                    onClick={() => setSettings({...settings, home: {...settings.home, showFarmerAnimation: !settings.home.showFarmerAnimation}})}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings.home.showFarmerAnimation ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.home.showFarmerAnimation ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Hero Title</label>
                  <input 
                    type="text" 
                    value={settings.home.heroTitle}
                    onChange={e => setSettings({...settings, home: {...settings.home, heroTitle: e.target.value}})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Hero Subtitle</label>
                  <input 
                    type="text" 
                    value={settings.home.heroSubtitle}
                    onChange={e => setSettings({...settings, home: {...settings.home, heroSubtitle: e.target.value}})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Main About Us Text</label>
              <textarea 
                value={settings.about.aboutText}
                onChange={e => setSettings({...settings, about: {...settings.about, aboutText: e.target.value}})}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 min-h-[120px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Info size={14} /> Vision & Mission
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Our Vision</label>
                    <textarea 
                      value={settings.about.vision}
                      onChange={e => setSettings({...settings, about: {...settings.about, vision: e.target.value}})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Our Mission</label>
                    <textarea 
                      value={settings.about.mission}
                      onChange={e => setSettings({...settings, about: {...settings.about, mission: e.target.value}})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users size={14} /> Why Choose Us
                </h4>
                <div className="space-y-3">
                  {settings.about.whyChooseUs.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="text" 
                        value={item}
                        onChange={e => {
                          const newWhy = [...settings.about.whyChooseUs];
                          newWhy[idx] = e.target.value;
                          setSettings({...settings, about: {...settings.about, whyChooseUs: newWhy}});
                        }}
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 text-sm"
                      />
                      <button 
                        onClick={() => {
                          const newWhy = settings.about.whyChooseUs.filter((_, i) => i !== idx);
                          setSettings({...settings, about: {...settings.about, whyChooseUs: newWhy}});
                        }}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setSettings({...settings, about: {...settings.about, whyChooseUs: [...settings.about.whyChooseUs, 'New Reason']}})}
                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-blue-400 hover:text-blue-400 transition-all"
                  >
                    + Add Reason
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Database size={14} /> Product & Cart Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Show Add to Cart</label>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                    <button 
                      onClick={() => setSettings({...settings, products: {...settings.products, showAddToCart: !settings.products.showAddToCart}})}
                      className={`w-10 h-5 rounded-full transition-all relative ${settings.products.showAddToCart ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${settings.products.showAddToCart ? 'left-5.5' : 'left-0.5'}`} />
                    </button>
                    <span className="text-xs font-bold text-slate-600">{settings.products.showAddToCart ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Currency Symbol</label>
                  <input 
                    type="text" 
                    value={settings.products.currency}
                    onChange={e => setSettings({...settings, products: {...settings.products, currency: e.target.value}})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Tax Rate</label>
                  <input 
                    type="text" 
                    value={settings.products.taxRate}
                    onChange={e => setSettings({...settings, products: {...settings.products, taxRate: e.target.value}})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Delivery Charge</label>
                  <input 
                    type="text" 
                    value={settings.products.deliveryCharge}
                    onChange={e => setSettings({...settings, products: {...settings.products, deliveryCharge: e.target.value}})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Database size={14} /> Product Catalog
                </h4>
                <button 
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                  <Plus size={14} /> {showAddProduct ? 'Cancel' : 'Add Product'}
                </button>
              </div>

              {showAddProduct && (
                <div className="mb-8 p-6 bg-white rounded-2xl border border-slate-200 animate-in slide-in-from-top-4 duration-300">
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Product Name</label>
                      <input 
                        type="text" 
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="e.g. Buffalo Milk"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Price</label>
                      <input 
                        type="text" 
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="e.g. ₹70/L"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      className="py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
                    >
                      Save Product
                    </button>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {settings.productList.map(prod => (
                  <div key={prod.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex justify-between items-center group hover:border-blue-200 transition-all">
                    <div>
                      <p className="text-sm font-black text-slate-800">{prod.name}</p>
                      <p className="text-xs font-bold text-blue-600">{prod.price}</p>
                    </div>
                    <button 
                      onClick={() => removeProduct(prod.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Phone size={14} /> Contact Details
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Office Address</label>
                    <input 
                      type="text" 
                      value={settings.contact.address}
                      onChange={e => setSettings({...settings, contact: {...settings.contact, address: e.target.value}})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Phone</label>
                      <input 
                        type="text" 
                        value={settings.contact.phone}
                        onChange={e => setSettings({...settings, contact: {...settings.contact, phone: e.target.value}})}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email</label>
                      <input 
                        type="email" 
                        value={settings.contact.email}
                        onChange={e => setSettings({...settings, contact: {...settings.contact, email: e.target.value}})}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Share2 size={14} /> Social Media Links
                </h4>
                <div className="space-y-4">
                  {Object.entries(settings.social).map(([platform, url]) => (
                    <div key={platform} className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 capitalize">{platform}</label>
                      <input 
                        type="text" 
                        value={url}
                        onChange={e => setSettings({...settings, social: {...settings.social, [platform]: e.target.value}})}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'locations':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden">
              <div className="p-8 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Indian Service Locations
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage states, cities, and pincodes</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search locations..."
                      value={locationSearch}
                      onChange={e => setLocationSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddLocation(!showAddLocation)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shrink-0"
                  >
                    <Plus size={14} /> {showAddLocation ? 'Cancel' : 'Add New'}
                  </button>
                </div>
              </div>

              {showAddLocation && (
                <div className="p-8 bg-blue-50/50 border-b border-slate-200 animate-in slide-in-from-top-4 duration-300">
                  <form onSubmit={handleAddLocation} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">State</label>
                      <input 
                        type="text" 
                        value={newLocation.state}
                        onChange={e => setNewLocation({...newLocation, state: e.target.value})}
                        placeholder="e.g. Maharashtra"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">City</label>
                      <input 
                        type="text" 
                        value={newLocation.city}
                        onChange={e => setNewLocation({...newLocation, city: e.target.value})}
                        placeholder="e.g. Mumbai"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Pincode</label>
                      <input 
                        type="text" 
                        value={newLocation.pincode}
                        onChange={e => setNewLocation({...newLocation, pincode: e.target.value})}
                        placeholder="e.g. 400001"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
                    >
                      Save Location
                    </button>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">State</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">City</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pincode</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLocations.map((loc) => (
                      <tr key={loc.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-4 text-sm font-bold text-slate-700">{loc.state}</td>
                        <td className="px-8 py-4 text-sm font-bold text-slate-700">{loc.city}</td>
                        <td className="px-8 py-4 text-sm font-mono text-slate-500">{loc.pincode}</td>
                        <td className="px-8 py-4 text-right">
                          <button 
                            onClick={() => removeLocation(loc.id)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Content Management System</h3>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Website Configuration</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            <Printer size={14} />
            Print
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            <FileText size={14} />
            Export PDF
          </button>
          <button 
            onClick={saveSettings}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
          >
            <Save size={20} />
            Publish Changes
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'general', label: 'General', icon: Palette },
          { id: 'home', label: 'Home Page', icon: Layout },
          { id: 'about', label: 'About Us', icon: Info },
          { id: 'products', label: 'Products & Cart', icon: Database },
          { id: 'contact', label: 'Contact & Footer', icon: Phone },
          { id: 'locations', label: 'Locations', icon: MapPin },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default WebsiteCMS;
