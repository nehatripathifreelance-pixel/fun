
import React, { useState, useEffect } from 'react';

type FactoryTab = 'reception' | 'loading' | 'processing' | 'production' | 'qc' | 'inventory' | 'utilities' | 'hr';

const FactoryPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FactoryTab>('reception');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCreateLoading, setShowCreateLoading] = useState(false);

  // Live Data Simulation for Processing & Utilities
  const [liveProcessing, setLiveProcessing] = useState({
    tempA1: 72.5,
    tempA2: 73.1,
    separatorSpeed: 6400,
    pressure: 2500
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveProcessing(prev => ({
        tempA1: +(prev.tempA1 + (Math.random() * 0.2 - 0.1)).toFixed(1),
        tempA2: +(prev.tempA2 + (Math.random() * 0.2 - 0.1)).toFixed(1),
        separatorSpeed: Math.floor(prev.separatorSpeed + (Math.random() * 20 - 10)),
        pressure: Math.floor(prev.pressure + (Math.random() * 10 - 5))
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Form States for Auto-calculations
  const [receptionForm, setReceptionForm] = useState({
    weight: 4250.5,
    fat: 4.2,
    snf: 8.9,
    acidity: 14
  });

  const [loadingForm, setLoadingForm] = useState({
    qty: 41,
    fat: 4.20,
    snf: 8.29,
    fRate: 346.48,
    sRate: 231.26,
    adj: 1.23
  });

  const [utilityForm, setUtilityForm] = useState({
    electricity: 1420,
    fuel: 420,
    generator: 12.4
  });

  // Derived Calculations
  const receptionFatKg = (receptionForm.weight * receptionForm.fat) / 100;
  const receptionSnfKg = (receptionForm.weight * receptionForm.snf) / 100;

  const loadingFatKg = (loadingForm.qty * loadingForm.fat) / 100;
  const loadingSnfKg = (loadingForm.qty * loadingForm.snf) / 100;
  const loadingFAmt = loadingFatKg * loadingForm.fRate;
  const loadingSAmt = loadingSnfKg * loadingForm.sRate;
  const loadingTAmt = loadingFAmt + loadingSAmt - loadingForm.adj;

  const electricityCost = utilityForm.electricity * 8.73;
  const fuelCost = utilityForm.fuel * 83.8;
  const generatorCost = utilityForm.generator * 1491.9;

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className={`px-8 py-4 rounded-2xl shadow-2xl border font-black text-xs uppercase tracking-widest ${
            toast.type === 'success' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-blue-500 text-white border-blue-400'
          }`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      {!showAddStaff && !showAddProduct && !showCreateLoading && (
        <div className="flex flex-nowrap gap-3 p-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
          {[
            { id: 'reception', label: 'RECEPTION / आवक', icon: '📥' },
            { id: 'loading', label: 'LOADING / लोडिंग', icon: '🚚' },
            { id: 'processing', label: 'PROCESSING / प्रसंस्करण', icon: '⚡' },
            { id: 'production', label: 'PRODUCTION / उत्पादन', icon: '🏭' },
            { id: 'qc', label: 'QC LAB / लैब', icon: '🧪' },
            { id: 'inventory', label: 'INVENTORY / स्टॉक', icon: '📦' },
            { id: 'utilities', label: 'UTILITIES / रखरखाव', icon: '🛠️' },
            { id: 'hr', label: 'HR & PAYROLL', icon: '👥' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FactoryTab)}
              className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all shrink-0 ${
                activeTab === tab.id 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {showAddStaff ? (
        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 text-slate-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-inner">👥</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">HR & Attendance Portal</h3>
            </div>
            <button 
              onClick={() => setShowAddStaff(false)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-50 text-red-600 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-xl shadow-red-500/10 hover:bg-red-100 transition-all"
            >
              CANCEL ENTRY
            </button>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <h4 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">NEW STAFF REGISTRATION</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Full Name</label>
                <input type="text" placeholder="e.g. Rahul Singh" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Phone Number</label>
                <input type="text" placeholder="+91 XXXX XXXX" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Email ID</label>
                <input type="email" placeholder="rahul@smartdairy.com" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Designation</label>
                <input type="text" placeholder="e.g. Junior Technician" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Base Salary</label>
                <input type="text" placeholder="₹ 25,000" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Full Address</label>
                <input type="text" placeholder="City, State, Zip" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
            </div>

            <div className="p-6 sm:p-10 bg-slate-50 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 space-y-8 sm:space-y-10">
              <h5 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">FINANCIAL & ID VERIFICATION</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">PAN CARD NO</label>
                  <input type="text" placeholder="ABCDE1234F" className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-center text-sm sm:text-base" />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">AADHAAR NO</label>
                  <input type="text" placeholder="XXXX XXXX XXXX" className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-center text-sm sm:text-base" />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">BANK ACCOUNT NO</label>
                  <input type="text" placeholder="987654321012" className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-center text-sm sm:text-base" />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">IFSC CODE</label>
                  <input type="text" placeholder="SBIN0001234" className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-center text-sm sm:text-base" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                showToast('Staff Registered Successfully');
                setShowAddStaff(false);
              }}
              className="w-full py-6 sm:py-8 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl sm:rounded-[2.5rem] font-black text-base sm:text-lg uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95"
            >
              SAVE STAFF RECORD
            </button>
          </div>
        </div>
      ) : showAddProduct ? (
        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-inner">📦</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Inventory Management</h3>
            </div>
            <button 
              onClick={() => setShowAddProduct(false)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-50 text-red-600 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-xl shadow-red-500/10 hover:bg-red-100 transition-all"
            >
              CANCEL ENTRY
            </button>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <h4 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">ADD NEW PRODUCT TO STOCK</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Product Name</label>
                <input type="text" placeholder="e.g. Fresh Paneer (200g)" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Expiry Date</label>
                <input type="date" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Units Produced</label>
                <input type="number" placeholder="e.g. 500" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Total Produced (KG/ML)</label>
                <input type="text" placeholder="e.g. 100 KG" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
            </div>

            <button 
              onClick={() => {
                showToast('Product Added to Inventory');
                setShowAddProduct(false);
              }}
              className="w-full py-6 sm:py-8 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl sm:rounded-[2.5rem] font-black text-base sm:text-lg uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95"
            >
              UPDATE INVENTORY
            </button>
          </div>
        </div>
      ) : showCreateLoading ? (
        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-inner">🚚</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Milk Loading Entry</h3>
            </div>
            <button 
              onClick={() => setShowCreateLoading(false)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-50 text-red-600 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-xl shadow-red-500/10 hover:bg-red-100 transition-all"
            >
              CANCEL ENTRY
            </button>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <h4 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">CREATE NEW LOADING RECORD</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Collection No.</label>
                <input type="text" placeholder="e.g. C002" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Date</label>
                <input type="date" className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Shift</label>
                <select className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner">
                  <option>Morning</option>
                  <option>Evening</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Quantity (L)</label>
                <input 
                  type="number" 
                  value={loadingForm.qty}
                  onChange={(e) => setLoadingForm({ ...loadingForm, qty: parseFloat(e.target.value) || 0 })}
                  className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" 
                />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Fat %</label>
                <input 
                  type="number" 
                  value={loadingForm.fat}
                  onChange={(e) => setLoadingForm({ ...loadingForm, fat: parseFloat(e.target.value) || 0 })}
                  className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" 
                />
              </div>
              <div>
                <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">SNF %</label>
                <input 
                  type="number" 
                  value={loadingForm.snf}
                  onChange={(e) => setLoadingForm({ ...loadingForm, snf: parseFloat(e.target.value) || 0 })}
                  className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner" 
                />
              </div>
            </div>

            <div className="p-6 sm:p-10 bg-slate-50 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase mb-1">FAT KG</p>
                <p className="text-base sm:text-lg font-black text-slate-900 tabular-nums">{loadingFatKg.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase mb-1">SNF KG</p>
                <p className="text-base sm:text-lg font-black text-slate-900 tabular-nums">{loadingSnfKg.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase mb-1">FAT AMT</p>
                <p className="text-base sm:text-lg font-black text-emerald-600 tabular-nums">₹{loadingFAmt.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase mb-1">SNF AMT</p>
                <p className="text-base sm:text-lg font-black text-emerald-600 tabular-nums">₹{loadingSAmt.toFixed(2)}</p>
              </div>
              <div className="text-center col-span-2 md:col-span-1 bg-slate-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase mb-1">TOTAL AMT</p>
                <p className="text-lg sm:text-xl font-black text-white tabular-nums">₹{loadingTAmt.toFixed(2)}</p>
              </div>
            </div>

            <button 
              onClick={() => {
                showToast('Loading Record Created Successfully');
                setShowCreateLoading(false);
              }}
              className="w-full py-6 sm:py-8 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl sm:rounded-[2.5rem] font-black text-base sm:text-lg uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95"
            >
              SAVE LOADING RECORD
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-8">
            {activeTab === 'reception' && (
            <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-8 sm:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-inner">📥</div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Raw Milk Reception Log</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-10">
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Tanker ID</label>
                    <input 
                      type="text" 
                      defaultValue="TKR-9902"
                      className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Net Weight (KG)</label>
                    <input 
                      type="number" 
                      value={receptionForm.weight}
                      onChange={(e) => setReceptionForm({ ...receptionForm, weight: parseFloat(e.target.value) || 0 })}
                      className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner"
                    />
                  </div>
                </div>
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">BMC Source</label>
                    <input 
                      type="text" 
                      defaultValue="North Hub #04"
                      className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 ml-2">Temperature (°C)</label>
                    <input 
                      type="text" 
                      defaultValue="3.8"
                      className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-base sm:text-lg shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8 bg-slate-50 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 mb-8 sm:mb-10">
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">FAT %</label>
                  <input 
                    type="number" 
                    value={receptionForm.fat}
                    onChange={(e) => setReceptionForm({ ...receptionForm, fat: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-lg sm:text-xl text-center"
                  />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">SNF %</label>
                  <input 
                    type="number" 
                    value={receptionForm.snf}
                    onChange={(e) => setReceptionForm({ ...receptionForm, snf: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-lg sm:text-xl text-center"
                  />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">ACIDITY (SH)</label>
                  <input 
                    type="number" 
                    value={receptionForm.acidity}
                    onChange={(e) => setReceptionForm({ ...receptionForm, acidity: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-lg sm:text-xl text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                <div className="p-4 sm:p-6 bg-blue-50 rounded-2xl sm:rounded-3xl border border-blue-100 text-center overflow-hidden">
                  <p className="text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Fat (KG)</p>
                  <p className="text-xl sm:text-2xl font-black text-blue-600 truncate">{receptionFatKg.toFixed(2)}</p>
                </div>
                <div className="p-4 sm:p-6 bg-indigo-50 rounded-2xl sm:rounded-3xl border border-indigo-100 text-center overflow-hidden">
                  <p className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Total SNF (KG)</p>
                  <p className="text-xl sm:text-2xl font-black text-indigo-600 truncate">{receptionSnfKg.toFixed(2)}</p>
                </div>
              </div>

              <button 
                onClick={() => showToast('Batch Approved & Transferred to Silo-01')}
                className="w-full py-6 sm:py-8 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl sm:rounded-[2.5rem] font-black text-base sm:text-lg uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95"
              >
                Approve & Transfer to Silo
              </button>
            </div>
          )}

          {activeTab === 'loading' && (
            <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-inner">🚚</div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Milk Loading List</h3>
                </div>
                <button 
                  onClick={() => setShowCreateLoading(true)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-lime-500 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-xl shadow-lime-500/20 hover:bg-lime-600 transition-all"
                >
                  Create Loading Milk
                </button>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[1200px]">
                  <thead className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-5">SR. NO.</th>
                      <th className="px-4 py-5">COLLECTION NO.</th>
                      <th className="px-4 py-5">DATE</th>
                      <th className="px-4 py-5">SHIFT</th>
                      <th className="px-4 py-5">F.RT</th>
                      <th className="px-4 py-5">S.RT</th>
                      <th className="px-4 py-5">QTY</th>
                      <th className="px-4 py-5">FRT %</th>
                      <th className="px-4 py-5">SNF %</th>
                      <th className="px-4 py-5">FAT KG</th>
                      <th className="px-4 py-5">SNF KG</th>
                      <th className="px-4 py-5">FAMT</th>
                      <th className="px-4 py-5">SAMT</th>
                      <th className="px-4 py-5">ADJ</th>
                      <th className="px-4 py-5">TAMT</th>
                      <th className="px-4 py-5">G/S/C</th>
                      <th className="px-4 py-5">C/B</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { sr: 1, col: 'C001', date: '2024-11-04', shift: 'Evening', frt: '4.20', srt: '231.26', qty: 41, fatp: '4.20', snfp: '8.290', fatkg: '1.72', snfkg: '3.40', famt: '596.65', samt: '786.28', adj: '1.23', tamt: '1381.70', gsc: 'G', cb: 'C' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors text-[11px] font-bold text-slate-600">
                        <td className="px-4 py-6">{row.sr}</td>
                        <td className="px-4 py-6 text-blue-600">{row.col}</td>
                        <td className="px-4 py-6">{row.date}</td>
                        <td className="px-4 py-6">{row.shift}</td>
                        <td className="px-4 py-6">{row.frt}</td>
                        <td className="px-4 py-6">{row.srt}</td>
                        <td className="px-4 py-6 text-slate-900 font-black">{row.qty}</td>
                        <td className="px-4 py-6">{row.fatp}</td>
                        <td className="px-4 py-6">{row.snfp}</td>
                        <td className="px-4 py-6">{row.fatkg}</td>
                        <td className="px-4 py-6">{row.snfkg}</td>
                        <td className="px-4 py-6">{row.famt}</td>
                        <td className="px-4 py-6">{row.samt}</td>
                        <td className="px-4 py-6">{row.adj}</td>
                        <td className="px-4 py-6 text-slate-900 font-black">{row.tamt}</td>
                        <td className="px-4 py-6">{row.gsc}</td>
                        <td className="px-4 py-6">{row.cb}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'processing' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
              <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-10">Pasteurization Logs</h3>
                <div className="space-y-6">
                  {[
                    { line: 'LINE-A1', batch: 'BT-442', temp: `${liveProcessing.tempA1}°C`, hold: '15S', status: 'RUNNING', color: 'emerald' },
                    { line: 'LINE-A2', batch: 'BT-443', temp: `${liveProcessing.tempA2}°C`, hold: '15S', status: 'WASHING', color: 'slate' },
                    { line: 'LINE-B1', batch: 'BT-439', temp: '72.8°C', hold: '15S', status: 'COMPLETED', color: 'blue' },
                  ].map((log, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 sm:p-8 bg-slate-50 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-black text-slate-900 text-base sm:text-lg">{log.line}</h4>
                          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Batch: {log.batch}</span>
                        </div>
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">TEMP: {log.temp} • HOLD: {log.hold}</p>
                      </div>
                      <span className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black tracking-widest bg-${log.color}-100 text-${log.color}-600`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-10">Separation & Homogenization</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                  {[
                    { label: 'SEPARATOR SPEED', val: `${liveProcessing.separatorSpeed} RPM`, status: 'NORMAL', color: 'blue' },
                    { label: 'HOMOGENIZER PRESSURE', val: `${liveProcessing.pressure} PSI`, status: 'HIGH', color: 'amber' },
                    { label: 'CREAM OUTLET FAT', val: '40.5%', status: 'OPTIMAL', color: 'blue' },
                    { label: 'SKIMMED FLOW', val: '4200 L/h', status: 'NORMAL', color: 'blue' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 text-center overflow-hidden">
                      <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-black text-slate-900 mb-1 truncate">{stat.val}</p>
                      <p className={`text-[8px] font-black text-${stat.color}-600 uppercase tracking-widest`}>{stat.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'production' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
              {[
                { label: 'Pure Butter', val: '420 Kg', change: '+45 KG', icon: '🧈' },
                { label: 'Soft Paneer', val: '1,240 Kg', change: '+180 KG', icon: '🧀' },
                { label: 'Desi Ghee', val: '850 L', change: '+12 L', icon: '🏺' },
                { label: 'Fresh Curd', val: '4,500 Pcs', change: '+850 PCS', icon: '🥣' },
              ].map((prod, i) => (
                <div key={i} className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-6 sm:mb-8 shadow-2xl">
                    {prod.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-2 truncate">{prod.label}</h4>
                  <p className="text-3xl sm:text-4xl font-black text-blue-600 mb-4 sm:mb-6 tracking-tighter tabular-nums">{prod.val}</p>
                  <div className="flex justify-between items-center pt-4 sm:pt-6 border-t border-slate-100">
                    <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Prod</span>
                    <span className="text-[9px] sm:text-[10px] font-black text-emerald-500 uppercase tracking-widest">{prod.change}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'qc' && (
            <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 text-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-inner">🧪</div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Quality Control & Lab Analysis</h3>
                </div>
                <button 
                  onClick={() => showToast('Opening Lab Sample Entry Form...', 'info')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all"
                >
                  Log New Sample
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-5">Sample ID</th>
                      <th className="px-6 py-5">Product Type</th>
                      <th className="px-6 py-5">MBRT (HRS)</th>
                      <th className="px-6 py-5">Coliform</th>
                      <th className="px-6 py-5">Antibiotics</th>
                      <th className="px-6 py-5">Final Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { id: 'S-9920', type: 'Raw Milk', mbrt: '5.5', coliform: 'Absent', antibiotics: 'Negative', verdict: 'PASSED', color: 'emerald' },
                      { id: 'S-9921', type: 'Pasteurized', mbrt: '6.2', coliform: 'Absent', antibiotics: 'Negative', verdict: 'PASSED', color: 'emerald' },
                      { id: 'S-9922', type: 'Paneer Batch A', mbrt: '-', coliform: '<10', antibiotics: '-', verdict: 'PASSED', color: 'emerald' },
                      { id: 'S-9923', type: 'Curd Batch B', mbrt: '-', coliform: 'Present', antibiotics: '-', verdict: 'HOLD', color: 'red' },
                    ].map((sample, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-6 font-bold text-blue-600 underline cursor-pointer">{sample.id}</td>
                        <td className="px-6 py-6 font-black text-slate-900">{sample.type}</td>
                        <td className="px-6 py-6 font-bold text-slate-500">{sample.mbrt}</td>
                        <td className="px-6 py-6 font-bold text-slate-500">{sample.coliform}</td>
                        <td className="px-6 py-6 font-bold text-slate-500">{sample.antibiotics}</td>
                        <td className="px-6 py-6">
                          <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-${sample.color}-100 text-${sample.color}-600`}>{sample.verdict}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn">
              <div className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Finished Goods Inventory</h3>
                  <button 
                    onClick={() => setShowAddProduct(true)}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-xl"
                  >
                    Add Product
                  </button>
                </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    {[
                      { name: 'Milk Packets (500ml)', val: '42,500 Units', expiry: '48 Hrs', type: 'DAIRY' },
                      { name: 'Paneer Packs (200g)', val: '8,200 Units', expiry: '15 Days', type: 'DAIRY' },
                      { name: 'Ghee Tins (1Kg)', val: '1,200 Units', expiry: '12 Months', type: 'VALUE ADDED' },
                      { name: 'Curd Cups (100g)', val: '15,400 Units', expiry: '10 Days', type: 'PROBIOTIC' },
                    ].map((item, i) => (
                      <div key={i} className="p-6 sm:p-8 bg-slate-50 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                          <h4 className="font-black text-slate-900 text-base sm:text-lg truncate pr-2">{item.name}</h4>
                          <span className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest shrink-0">{item.type}</span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-blue-600 mb-4 sm:mb-6 tabular-nums">{item.val}</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">EXPIRY</p>
                            <p className="text-xs font-black text-red-600">{item.expiry}</p>
                          </div>
                          <button className="text-[8px] font-black text-blue-600 uppercase tracking-widest underline">EDIT</button>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col">
                <h3 className="font-black text-base sm:text-lg mb-8 sm:mb-10 tracking-widest uppercase">Packaging Materials</h3>
                <div className="space-y-8 sm:space-y-10 flex-grow">
                  {[
                    { label: 'LDPE ROLL (MILK)', val: 75, color: 'blue' },
                    { label: 'OUTER CARTONS', val: 42, color: 'blue' },
                    { label: 'GHEE TINS', val: 88, color: 'blue' },
                    { label: 'CURD FOIL', val: 12, color: 'red' },
                  ].map((mat, i) => (
                    <div key={i} className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                        <span className="text-blue-300">{mat.label}</span>
                        <span>{mat.val}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 sm:h-2 rounded-full overflow-hidden">
                        <div className={`h-full bg-${mat.color}-500 rounded-full`} style={{ width: `${mat.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => showToast('Reorder Request Sent to Procurement')}
                  className="w-full py-4 sm:py-5 bg-white text-slate-900 rounded-xl sm:rounded-[1.5rem] font-black text-[9px] sm:text-[10px] uppercase tracking-widest mt-8 sm:mt-10"
                >
                  Reorder Supplies
                </button>
              </div>
            </div>
          )}

          {activeTab === 'utilities' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
              <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Utility Consumption Logs</h3>
                  <button 
                    onClick={() => showToast('Opening Utility Log Form...', 'info')}
                    className="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-blue-100"
                  >
                    + Log Utility
                  </button>
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'DAILY ELECTRICITY', val: utilityForm.electricity, cost: `₹${electricityCost.toFixed(0)}`, icon: '⚡', key: 'electricity' },
                    { label: 'BOILER FUEL (LPG)', val: utilityForm.fuel, cost: `₹${fuelCost.toFixed(0)}`, icon: '🔥', key: 'fuel' },
                    { label: 'GENERATOR BACKUP', val: utilityForm.generator, cost: `₹${generatorCost.toFixed(0)}`, icon: '🔋', key: 'generator' },
                  ].map((log, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 sm:p-8 bg-slate-50 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 gap-6">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="text-2xl sm:text-3xl shrink-0">{log.icon}</div>
                        <div className="overflow-hidden">
                          <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{log.label}</p>
                          <input 
                            type="number" 
                            value={log.val}
                            onChange={(e) => setUtilityForm({ ...utilityForm, [log.key as keyof typeof utilityForm]: parseFloat(e.target.value) || 0 })}
                            className="text-xl sm:text-2xl font-black text-slate-900 bg-transparent border-none focus:outline-none w-full max-w-[120px] tabular-nums"
                          />
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-slate-200 pt-4 sm:pt-0">
                        <p className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">{log.cost}</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">AUTO-CALCULATED COST</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-10">Machine Maintenance</h3>
                <div className="space-y-10">
                  {[
                    { name: 'Main Boiler B-1', last: 'OCT 01', status: 'GOOD', color: 'emerald' },
                    { name: 'Homogenizer H-2', last: 'SEP 15', status: 'DUE SOON', color: 'amber' },
                    { name: 'Packaging P-4', last: 'OCT 05', status: 'GOOD', color: 'emerald' },
                    { name: 'Cold Storage C-1', last: 'AUG 12', status: 'CRITICAL', color: 'red' },
                  ].map((maint, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm mb-1">{maint.name}</h4>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">LAST: {maint.last}</p>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-${maint.color}-100 text-${maint.color}-600`}>{maint.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hr' && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 text-slate-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-inner">👥</div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">HR & Attendance Portal</h3>
                  </div>
                  <button 
                    onClick={() => setShowAddStaff(true)}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-xl"
                  >
                    Add Staff Member
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 ml-2">Daily Attendance Log</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="text-[8px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                          <tr>
                            <th className="px-4 py-4">Employee</th>
                            <th className="px-4 py-4">Role</th>
                            <th className="px-4 py-4">Phone</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-4 py-4">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            { name: 'Amit Sharma', role: 'Plant Supervisor', phone: '9123456780', status: 'PRESENT', color: 'emerald' },
                            { name: 'Sunil Verma', role: 'Machine Operator', phone: '9123456781', status: 'PRESENT', color: 'emerald' },
                            { name: 'Deepak Raj', role: 'Lab Technician', phone: '9123456782', status: 'ABSENT', color: 'red' },
                          ].map((emp, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-[10px] font-black text-blue-600">{emp.name[0]}</div>
                                  <span className="font-black text-slate-800 text-sm">{emp.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-6 font-bold text-slate-500 text-xs">{emp.role}</td>
                              <td className="px-4 py-6 font-bold text-slate-400 text-xs">{emp.phone}</td>
                              <td className="px-4 py-6">
                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-${emp.color}-100 text-${emp.color}-600`}>{emp.status}</span>
                              </td>
                              <td className="px-4 py-6">
                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest underline">View Docs</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col">
                    <h3 className="font-black text-lg mb-10 tracking-widest uppercase">Payroll Engine</h3>
                    <div className="space-y-8 flex-grow">
                      {[
                        { label: 'CYCLE', val: 'OCTOBER 2024' },
                        { label: 'TOTAL STAFF', val: '142 ACTIVE' },
                        { label: 'TOTAL PAYOUT', val: '₹ 24,80,000' },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">{item.label}</span>
                          <span className="font-black text-sm">{item.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4 mt-10">
                      <button 
                        onClick={() => showToast('Generating PDF Pay Slips...')}
                        className="w-full py-5 bg-white text-slate-900 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest"
                      >
                        Generate PDF Slips
                      </button>
                      <button 
                        onClick={() => showToast('Downloading XLS Ledger...')}
                        className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest"
                      >
                        Download XLS Ledger
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="font-black text-base sm:text-lg mb-8 sm:mb-10 tracking-widest uppercase">Current Silo Levels</h3>
            <div className="space-y-8 sm:space-y-10">
              {[
                { label: 'SILO-01 (COW MILK)', current: 42000, total: 50000, color: 'blue' },
                { label: 'SILO-02 (BUFFALO MILK)', current: 12500, total: 50000, color: 'indigo' },
                { label: 'SILO-03 (TONED)', current: 38000, total: 50000, color: 'emerald' },
              ].map((silo, i) => (
                <div key={i} className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-[9px] sm:text-[10px] font-black text-blue-300 uppercase tracking-widest">{silo.label}</p>
                    <p className="text-xs sm:text-sm font-black tabular-nums">{silo.current.toLocaleString()} / {silo.total.toLocaleString()} L</p>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 sm:h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${silo.color}-500 rounded-full transition-all duration-1000`}
                      style={{ width: `${(silo.current / silo.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-slate-200 shadow-sm">
            <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 sm:mb-8 text-center">Factory Utilities</h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: 'Power', val: '98%', status: 'Stable' },
                { label: 'Steam', val: '12 Bar', status: 'Optimal' },
                { label: 'Water', val: '4.2 pH', status: 'Safe' },
                { label: 'Temp', val: '-18°C', status: 'Cold' },
              ].map((util, i) => (
                <div key={i} className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 text-center">
                  <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase mb-1">{util.label}</p>
                  <p className="text-base sm:text-lg font-black text-slate-900 tabular-nums">{util.val}</p>
                  <p className="text-[7px] sm:text-[8px] font-black text-emerald-500 uppercase mt-1">{util.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default FactoryPanel;
