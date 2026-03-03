
import React, { useState } from 'react';

type FarmerTab = 'home' | 'reports' | 'rates' | 'services' | 'alerts';

const FarmerPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'id' | 'otp'>('id');
  const [activeTab, setActiveTab] = useState<FarmerTab>('home');
  
  // Form States
  const [milkVolume, setMilkVolume] = useState('');
  const [shift, setShift] = useState<'Morning' | 'Evening'>('Morning');

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] animate-fadeIn p-4">
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 w-full max-w-lg relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="text-center mb-12 relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-8 shadow-2xl shadow-blue-500/30 transform -rotate-3 transition-transform hover:rotate-0">🚜</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Farmer Portal</h2>
            <p className="text-slate-500 font-medium mt-3 text-lg">Smart Dairy ERP Enterprise</p>
          </div>

          <div className="flex p-2 bg-slate-50 rounded-3xl border border-slate-100 mb-10 relative z-10">
            <button 
              onClick={() => setLoginMethod('id')}
              className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${loginMethod === 'id' ? 'bg-white shadow-xl text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Farmer ID
            </button>
            <button 
              onClick={() => setLoginMethod('otp')}
              className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${loginMethod === 'otp' ? 'bg-white shadow-xl text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Mobile OTP
            </button>
          </div>

          <div className="space-y-8 relative z-10">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">
                {loginMethod === 'id' ? 'Farmer Identification Number' : 'Registered Mobile Number'}
              </label>
              <input 
                type="text" 
                placeholder={loginMethod === 'id' ? 'e.g. FRM-782390' : 'Enter 10-digit number'}
                className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-lg shadow-inner placeholder:text-slate-300"
              />
            </div>
            {loginMethod === 'otp' && (
               <div className="animate-slideInDown">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Verification Code (6-Digits)</label>
                <input type="text" placeholder="······" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-center text-3xl tracking-[0.8em] shadow-inner" />
              </div>
            )}
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-200 transition-all active:scale-95 group"
            >
              Connect to Dashboard <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </button>
          </div>
          <div className="text-center mt-10">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors">Forgot Credentials? Contact Support</p>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN PORTAL CONTENT ---
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24 animate-fadeIn">
      {/* Top Navbar / Profile Segment */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[1.75rem] bg-slate-900 flex items-center justify-center text-4xl shadow-xl shadow-slate-200 overflow-hidden">
             <img src="https://picsum.photos/100/100?farmer" alt="Farmer" className="w-full h-full object-cover opacity-80" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Ramesh Chand Chaudhary</h3>
            <div className="flex items-center gap-3 mt-1">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">ID: FRM-782390</span>
               <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">Unit: North #12</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Support</button>
           <button onClick={() => setIsLoggedIn(false)} className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center font-bold hover:bg-red-100 transition-colors shadow-sm">
             🚪
           </button>
        </div>
      </div>

      {/* Navigation Matrix */}
      <div className="flex flex-nowrap gap-3 p-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
        {[
          { id: 'home', label: 'Home / दूध जमा करें', icon: '🏠' },
          { id: 'reports', label: 'Reports / रिपोर्ट', icon: '📋' },
          { id: 'rates', label: 'Rates / रेट चार्ट', icon: '📈' },
          { id: 'services', label: 'Cattle / पशु सेवा', icon: '🐄' },
          { id: 'alerts', label: 'Alerts / सूचनाएं', icon: '🔔' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as FarmerTab)}
            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shrink-0 ${
              activeTab === tab.id 
              ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200' 
              : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="min-h-[500px]">
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 animate-fadeIn">
            {/* Milk Entry Form */}
            <div className="xl:col-span-2 bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-12">
                 <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">🥛</div>
                   Supply Entry / दूध प्रविष्टि
                 </h4>
                 <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Sync Ready</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Select Shift / शिफ्ट चुनें</label>
                    <div className="flex gap-4 p-2 bg-slate-50 rounded-3xl border border-slate-100">
                      {(['Morning', 'Evening'] as const).map((s) => (
                        <button 
                          key={s}
                          onClick={() => setShift(s)}
                          className={`flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                            shift === s 
                            ? 'bg-white shadow-xl text-blue-600 border border-slate-100 scale-105' 
                            : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {s === 'Morning' ? 'Morning / सुबह' : 'Evening / शाम'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Milk Volume (Liters) / दूध की मात्रा</label>
                    <div className="relative group">
                      <input 
                        type="number" 
                        value={milkVolume}
                        onChange={(e) => setMilkVolume(e.target.value)}
                        placeholder="0.00" 
                        className="w-full px-10 py-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 text-5xl font-black text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-200 shadow-inner group-hover:border-slate-200" 
                      />
                      <span className="absolute right-10 top-1/2 -translate-y-1/2 font-black text-slate-300 text-2xl tracking-tighter">LITERS</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex-1 p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform"></div>
                     <div className="relative z-10">
                        <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-4">Estimated Entry Value</p>
                        <p className="text-6xl font-black tracking-tighter mb-2">₹ {milkVolume ? (parseFloat(milkVolume) * 38.5).toFixed(2) : '0.00'}</p>
                        <div className="h-px bg-white/10 w-full my-6"></div>
                        <div className="space-y-3">
                           <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                              <span>Current Base Rate</span>
                              <span className="text-white">₹38.50 / L</span>
                           </div>
                           <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                              <span>FAT Correction (Avg)</span>
                              <span className="text-white">+ ₹2.40</span>
                           </div>
                        </div>
                     </div>
                     <button className="w-full mt-10 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.75rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-95 relative z-10">
                       Submit Collection / जमा करें
                     </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Analytics */}
            <div className="space-y-10">
               <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center">Quality Performance</h5>
                  <div className="flex justify-center mb-10">
                     <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="80" cy="80" r="72" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                           <circle cx="80" cy="80" r="72" stroke="#3b82f6" strokeWidth="12" fill="transparent" 
                              strokeDasharray={452} strokeDashoffset={452 - (452 * 88) / 100} 
                              className="transition-all duration-1000"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-3xl font-black text-slate-900">4.2</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase">Avg FAT%</span>
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">SNF%</p>
                        <p className="text-lg font-black text-slate-900">8.9</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">CLR</p>
                        <p className="text-lg font-black text-slate-900">29.2</p>
                     </div>
                  </div>
               </div>

               <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl">
                  <h5 className="text-lg font-black mb-6">Latest Bonus</h5>
                  <p className="text-4xl font-black tracking-tighter mb-2">₹ 1,500</p>
                  <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-8">Independence Day Bonus 2024</p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-[9px] text-slate-400 font-bold uppercase">Status</p>
                     <p className="text-sm font-black text-emerald-400">CREDITED TO WALLET</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-10 animate-fadeIn">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                   <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center justify-between">
                      Quality Reports / गुणवत्ता विवरण
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
                   </h4>
                   <div className="space-y-6">
                      {[
                        { date: 'Oct 08 AM', fat: '4.2', snf: '8.8', clr: '28.5', vol: '12.4', q: 'Premium' },
                        { date: 'Oct 07 PM', fat: '4.1', snf: '8.7', clr: '28.0', vol: '10.8', q: 'Gold' },
                        { date: 'Oct 07 AM', fat: '4.4', snf: '8.9', clr: '29.2', vol: '11.5', q: 'Premium' },
                        { date: 'Oct 06 PM', fat: '4.2', snf: '8.8', clr: '28.4', vol: '12.0', q: 'Gold' },
                        { date: 'Oct 06 AM', fat: '4.0', snf: '8.6', clr: '27.8', vol: '14.2', q: 'Standard' },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:scale-[1.02] rounded-3xl border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                           <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-white rounded-2xl flex flex-col items-center justify-center font-black text-blue-600 shadow-sm border border-slate-100">
                                 <span className="text-[10px] uppercase">{log.date.split(' ')[0]}</span>
                                 <span className="text-lg">{log.date.split(' ')[1]}</span>
                              </div>
                              <div>
                                 <p className="text-lg font-black text-slate-800">{log.vol} L</p>
                                 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${log.q === 'Premium' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{log.q}</span>
                              </div>
                           </div>
                           <div className="flex gap-8 text-center">
                              <div><p className="text-[9px] font-black text-slate-400 uppercase">FAT</p><p className="font-black text-slate-900">{log.fat}</p></div>
                              <div><p className="text-[9px] font-black text-slate-400 uppercase">SNF</p><p className="font-black text-slate-900">{log.snf}</p></div>
                              <div><p className="text-[9px] font-black text-slate-400 uppercase">CLR</p><p className="font-black text-slate-900">{log.clr}</p></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                   <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center justify-between">
                      Payments & Bonus / भुगतान और बोनस
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Download PDF</button>
                   </h4>
                   <div className="space-y-6">
                      {[
                        { title: 'Weekly Cycle: Oct 01-07', amt: '₹4,280.50', status: 'PAID', date: '08 Oct', icon: '💰' },
                        { title: 'September Performance Bonus', amt: '₹1,500.00', status: 'CREDITED', date: '01 Oct', icon: '🎁' },
                        { title: 'Weekly Cycle: Sep 24-30', amt: '₹4,112.20', status: 'PAID', date: '01 Oct', icon: '💰' },
                        { title: 'Bulk Collection Bonus Aug', amt: '₹2,200.00', status: 'PAID', date: '05 Sep', icon: '⭐' },
                        { title: 'Incentive: Quality Lead', amt: '₹500.00', status: 'PAID', date: '05 Sep', icon: '🏆' },
                      ].map((pay, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 hover:bg-white hover:shadow-xl rounded-3xl border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                           <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100">{pay.icon}</div>
                              <div>
                                 <p className="font-black text-slate-800">{pay.title}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase">{pay.date} • Bank: HDFC-0922</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-xl font-black text-slate-900">{pay.amt}</p>
                              <p className={`text-[9px] font-black uppercase tracking-widest ${pay.status === 'PAID' ? 'text-emerald-600' : 'text-blue-600'}`}>{pay.status}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'rates' && (
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                   <h4 className="text-3xl font-black text-slate-900 tracking-tight">Milk Rate Chart / दूध रेट चार्ट</h4>
                   <p className="text-slate-500 font-medium mt-1">Rates based on 8.5% SNF standard</p>
                </div>
                <div className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Effective: 01 Oct 2024</div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                   <h5 className="font-black text-blue-900 uppercase text-xs tracking-widest mb-6 border-b border-blue-200 pb-4 flex items-center gap-2">
                      <span className="text-xl">🐄</span> Cow Milk Rates / गाय का दूध
                   </h5>
                   <table className="w-full text-left text-sm font-bold">
                      <thead className="text-[10px] text-blue-400 uppercase tracking-widest">
                         <tr><th className="pb-4">FAT %</th><th className="pb-4">RATE (₹/L)</th></tr>
                      </thead>
                      <tbody className="divide-y divide-blue-100">
                         {['3.5: 36.50', '3.8: 38.20', '4.1: 40.10', '4.4: 42.50', '4.7+: 45.00'].map(r => (
                           <tr key={r}><td className="py-4 text-slate-700">{r.split(': ')[0]}%</td><td className="py-4 text-blue-700 font-black">₹{r.split(': ')[1]}</td></tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
                   <h5 className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-6 border-b border-indigo-200 pb-4 flex items-center gap-2">
                      <span className="text-xl">🐃</span> Buffalo Milk Rates / भैंस का दूध
                   </h5>
                   <table className="w-full text-left text-sm font-bold">
                      <thead className="text-[10px] text-indigo-400 uppercase tracking-widest">
                         <tr><th className="pb-4">FAT %</th><th className="pb-4">RATE (₹/L)</th></tr>
                      </thead>
                      <tbody className="divide-y divide-indigo-100">
                         {['5.0: 48.00', '5.5: 52.50', '6.0: 56.80', '6.5: 61.20', '7.0+: 68.00'].map(r => (
                           <tr key={r}><td className="py-4 text-slate-700">{r.split(': ')[0]}%</td><td className="py-4 text-indigo-700 font-black">₹{r.split(': ')[1]}</td></tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
             
             <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 flex items-start gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">💡</div>
                <div>
                   <h6 className="font-black text-amber-900 text-sm mb-1 uppercase tracking-widest">Pricing Policy Note</h6>
                   <p className="text-xs text-amber-800 font-medium leading-relaxed">SNF below 8.5% will result in a deduction of ₹0.50 per 0.1% point. Quality lead bonuses are applied to batches maintaining consistent 4.0+ FAT for 7 consecutive days.</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-10 animate-fadeIn">
             <div className="text-center max-w-2xl mx-auto mb-12">
                <h4 className="text-3xl font-black text-slate-900 tracking-tight">Cattle Care Services / पशु सेवाएँ</h4>
                <p className="text-slate-500 font-medium mt-2">Exclusive enterprise-grade support for our dairy partners.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { title: 'Animal Feed / चारा', desc: 'Order high-protein balanced feed at factory rates. Monthly doorstep delivery available.', icon: '🌾', color: 'amber', tags: ['High Protein', 'Subsidy Ready'] },
                  { title: 'Veterinary / दवाई', desc: 'Free monthly checkups. 24/7 tele-vet support. Access to subsidized medications.', icon: '💊', color: 'blue', tags: ['Free Visit', 'Subsidized'] },
                  { title: 'Insurance / बीमा', desc: 'Secure your livestock with the Smart Dairy Insurance Plan. Quick cashless claims process.', icon: '🛡️', color: 'indigo', tags: ['Low Premium', 'Cashless'] },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-500 group">
                    <div className={`w-20 h-20 bg-${s.color}-50 text-4xl rounded-[2rem] flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform`}>{s.icon}</div>
                    <h5 className="text-2xl font-black text-slate-900 mb-4">{s.title}</h5>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-10">
                       {s.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">{tag}</span>
                       ))}
                    </div>
                    <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-blue-600 shadow-xl shadow-slate-100 group-hover:shadow-blue-200">
                      Access Service
                    </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
             <div className="flex justify-between items-center mb-12">
                <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">📢</div>
                  Dairy Notices & Training / सूचनाएं एवं प्रशिक्षण
                </h4>
                <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-400 tracking-widest">3 New Alerts</div>
             </div>
             
             <div className="space-y-8">
                {[
                  { title: 'Winter Milk Yield Training Program', content: 'Special session by National Dairy Experts on maintaining fat levels during peak winter. Learn advanced feeding techniques and temperature control for livestock.', date: 'Oct 15, 2024 • 10:00 AM', tag: 'TRAINING', color: 'blue' },
                  { title: 'Automated Testing Hub Launch', content: 'We are installing 5 new high-speed automated testing machines at BMC #12. This will reduce wait times by 60%. Mobile slips will be generated instantly.', date: 'Oct 22, 2024', tag: 'NEWS', color: 'emerald' },
                  { title: 'Urgent: Foot & Mouth Vaccination Drive', content: 'Dairy enterprise vaccination drive starts Monday. All cattle must be registered via the "Services" tab by Sunday evening. Non-vaccinated supply may be restricted.', date: 'IMMEDIATE', tag: 'ALERT', color: 'red' },
                  { title: 'Market Rate Correction Advisory', content: 'Expected rate hike of +₹1.20/L due to upcoming festival season demand spike. Keep quality scores high to maximize earnings.', date: 'Oct 05, 2024', tag: 'MARKET', color: 'amber' },
                ].map((alert, i) => (
                  <div key={i} className="p-10 bg-slate-50/50 rounded-[3rem] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl transition-all group relative overflow-hidden">
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                          alert.tag === 'ALERT' ? 'bg-red-50 text-red-600 border-red-100' : 
                          alert.tag === 'TRAINING' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>{alert.tag}</span>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.date}</p>
                     </div>
                     <h5 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors relative z-10">{alert.title}</h5>
                     <p className="text-base text-slate-500 font-medium leading-relaxed mb-10 relative z-10 max-w-4xl">{alert.content}</p>
                     <div className="flex items-center justify-between relative z-10">
                        <button className="text-blue-600 font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:translate-x-3 transition-transform">
                          Read Full Bulletin <span className="text-2xl">→</span>
                        </button>
                        <div className="flex -space-x-3">
                           {[1,2,3].map(n => (
                             <div key={n} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                                <img src={`https://picsum.photos/40/40?sig=${i}${n}`} alt="User" />
                             </div>
                           ))}
                           <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">+42</div>
                        </div>
                     </div>
                     <div className="absolute -bottom-10 -right-10 text-[120px] opacity-[0.03] rotate-12 pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                        {alert.tag === 'TRAINING' ? '🎓' : alert.tag === 'ALERT' ? '⚠️' : '🗞️'}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Enterprise Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-200 gap-6">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg">SD</div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Smart Dairy ERP v4.0.2</p>
         </div>
         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">© 2024 Digital Communique • Enterprise Solutions Provider</p>
      </div>
    </div>
  );
};

export default FarmerPanel;
