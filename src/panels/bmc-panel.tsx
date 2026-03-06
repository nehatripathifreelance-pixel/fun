
import React, { useState, useMemo, useEffect } from 'react';
import MilkPouringSlip from '../components/MilkPouringSlip';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type BMCTab = 'management' | 'reception' | 'chilling' | 'dispatch' | 'reports';

const BMCPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BMCTab>('management');
  const [showSlip, setShowSlip] = useState(false);
  
  // Live Data Simulation State
  const [liveWeight, setLiveWeight] = useState(455.0);
  const [liveFat, setLiveFat] = useState(4.2);
  const [liveSnf, setLiveSnf] = useState(8.5);

  useEffect(() => {
    if (activeTab !== 'management') return;
    
    const interval = setInterval(() => {
      // Small fluctuations to simulate live scale/analyzer data
      setLiveWeight(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setLiveFat(prev => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(2));
      setLiveSnf(prev => +(prev + (Math.random() * 0.02 - 0.01)).toFixed(2));
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab]);
  
  // Intake Form State
  const [farmerId, setFarmerId] = useState('FRM-10293');
  const [weight, setWeight] = useState('');
  const [fat, setFat] = useState('4.2');
  const [snf, setSnf] = useState('8.5');
  const [clr, setClr] = useState('28.0');
  const [temp, setTemp] = useState('25.5');
  const [milkType, setMilkType] = useState<'Cow' | 'Buffalo'>('Cow');
  const [shift, setShift] = useState<'Morning' | 'Evening'>('Morning');
  const [adulteration, setAdulteration] = useState('0.0');

  // Auto-calculate SNF from CLR and FAT
  useEffect(() => {
    const c = parseFloat(clr);
    const f = parseFloat(fat);
    if (!isNaN(c) && !isNaN(f)) {
      // Standard SNF formula: (CLR/4) + (FAT * 0.2) + 0.7
      const calculatedSnf = (c / 4) + (f * 0.2) + 0.7;
      setSnf(calculatedSnf.toFixed(2));
    }
  }, [clr, fat]);

  // Calculations
  const rate = useMemo(() => {
    const f = parseFloat(fat);
    const s = parseFloat(snf);
    if (isNaN(f) || isNaN(s)) return '0.00';

    const isCow = milkType === 'Cow';
    // Base parameters
    const baseRate = isCow ? 35.0 : 48.0;
    const stdFat = isCow ? 3.5 : 6.0;
    const stdSnf = isCow ? 8.5 : 9.0;
    
    // Premiums: ₹6.5 per fat point, ₹4.0 per SNF point
    const fatDiff = f - stdFat;
    const snfDiff = s - stdSnf;
    
    const calculatedRate = baseRate + (fatDiff * 6.5) + (snfDiff * 4.0);
    return Math.max(calculatedRate, 0).toFixed(2);
  }, [fat, snf, milkType]);

  const amount = useMemo(() => {
    return (parseFloat(weight || '0') * parseFloat(rate)).toFixed(2);
  }, [weight, rate]);

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Tab Navigation */}
      <div className="flex flex-nowrap gap-3 p-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
        {[
          { id: 'management', label: 'Live Board', icon: '🖥️' },
          { id: 'reception', label: 'Farmer Reception', icon: '📥' },
          { id: 'chilling', label: 'Chilling Unit', icon: '❄️' },
          { id: 'dispatch', label: 'Tanker Dispatch', icon: '🚛' },
          { id: 'reports', label: 'Summary Reports', icon: '📊' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as BMCTab)}
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
        {/* Main Content Area */}
        <div className="xl:col-span-3 space-y-6 sm:space-y-8">
          {activeTab === 'management' && (
            <div className="bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl">
              {/* Board Header */}
              <div className="bg-[#0f172a] p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/10">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center p-1.5 sm:p-2 shadow-inner shrink-0">
                    <img src="https://picsum.photos/seed/dairy-logo/100/100" alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="h-8 sm:h-10 w-px bg-slate-700 mx-1 sm:mx-2"></div>
                  <div>
                    <h2 className="text-white font-black text-lg sm:text-2xl lg:text-3xl tracking-tight leading-tight">DAIRY CENTER MANAGEMENT</h2>
                    <p className="text-blue-400 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">BMC Live Operations Hub</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-4 sm:pt-0">
                  <div className="text-left sm:text-right sm:border-r border-slate-700 sm:pr-8">
                    <p className="text-white font-black text-sm sm:text-lg tracking-tighter">06 MAR 2026</p>
                    <p className="text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-widest">08:32 AM</p>
                  </div>
                  <button className="w-10 h-10 sm:w-14 sm:h-14 bg-slate-800 hover:bg-slate-700 rounded-xl sm:rounded-2xl flex items-center justify-center text-white transition-all shadow-lg shrink-0">
                    <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                </div>
              </div>

              {/* Board Content */}
              <div className="p-4 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
                {/* Left Column: Live Weight Station */}
                <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-6 md:p-10 shadow-xl border border-slate-100 flex flex-col overflow-hidden">
                  <div className="flex justify-between items-center mb-6 sm:mb-10">
                    <h3 className="text-slate-400 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em]">Live Weight Station</h3>
                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></span>
                  </div>
                  
                  <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 flex-1 flex flex-col justify-center overflow-hidden">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 text-blue-600 rounded-2xl sm:rounded-3xl mx-auto mb-2 shadow-inner">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    </div>
                    <p className="text-slate-400 font-black text-xs sm:text-sm uppercase tracking-[0.2em]">TOTAL WEIGHT:</p>
                    <div className="flex items-baseline justify-center gap-1 sm:gap-4 flex-wrap max-w-full">
                      <span className="text-4xl sm:text-6xl md:text-8xl lg:text-4xl xl:text-6xl 2xl:text-8xl font-black text-slate-900 tracking-tighter tabular-nums leading-none truncate">{liveWeight.toFixed(1)}</span>
                      <span className="text-base sm:text-xl lg:text-lg font-black text-slate-300">KG</span>
                    </div>
                    <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-500 text-white rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">GOT AMS</span>
                      <div className="flex items-center gap-2 px-2 sm:px-3 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-100">
                        <span className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full shadow-sm"></span>
                        <span className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full shadow-sm"></span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-10 border-t border-slate-100 pt-6 sm:pt-10 mb-6 sm:mb-10">
                    <div className="text-center overflow-hidden">
                      <p className="text-slate-400 font-black text-[8px] sm:text-[10px] uppercase tracking-widest mb-1 sm:mb-2">FAT</p>
                      <p className="text-xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-3xl font-black text-slate-900 tabular-nums truncate">{liveFat.toFixed(2)}%</p>
                    </div>
                    <div className="text-center overflow-hidden">
                      <p className="text-slate-400 font-black text-[8px] sm:text-[10px] uppercase tracking-widest mb-1 sm:mb-2">SNF</p>
                      <p className="text-xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-3xl font-black text-slate-900 tabular-nums truncate">{liveSnf.toFixed(2)}%</p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-[9px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">Scale</span>
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-black text-emerald-600 uppercase">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-[9px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">Analyzer</span>
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-black text-emerald-600 uppercase">Connected</span>
                    </div>
                  </div>
                </div>

                {/* Middle Column: Today's Pouring Slips */}
                <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-xl border border-slate-100 flex flex-col min-h-[400px]">
                  <div className="flex justify-between items-center mb-6 sm:mb-10">
                    <h3 className="text-slate-400 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em]">Today's Pouring Slips</h3>
                    <button className="text-[9px] sm:text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-50">
                          <th className="pb-3 sm:pb-5 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                          <th className="pb-3 sm:pb-5 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                          <th className="pb-3 sm:pb-5 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Qty</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { id: '1', name: 'Rajesh Kumar', qty: '12.20' },
                          { id: '2', name: 'Suresh Kumar', qty: '12.50' },
                          { id: '3', name: 'Sunita Devi', qty: '8.80' },
                          { id: '4', name: 'Sushila Devi', qty: '8.60' },
                          { id: '5', name: 'Parminder Singh', qty: '6.90' },
                          { id: '15', name: 'Sonia Devi', qty: '16.80' },
                          { id: '15', name: 'Parminder Singh', qty: '16.90' },
                          { id: '13', name: 'Preminder Singh', qty: '11.75' },
                          { id: '15', name: 'Laxmi Devi', qty: '10.45' },
                          { id: '6', name: 'Rohit Kumar', qty: '9.80' },
                          { id: '7', name: 'Sapan Kumar', qty: '8.60' },
                          { id: '8', name: 'Ratpat Kumar', qty: '10.45' },
                        ].map((slip, i) => (
                          <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer">
                            <td className="py-3 sm:py-4 text-[10px] sm:text-[12px] font-bold text-slate-400 group-hover:text-blue-600">{slip.id}</td>
                            <td className="py-3 sm:py-4 text-[11px] sm:text-[13px] font-black text-slate-800 tracking-tight truncate max-w-[80px] sm:max-w-none">{slip.name}</td>
                            <td className="py-3 sm:py-4 text-[11px] sm:text-[13px] font-black text-slate-900 text-right tabular-nums">{slip.qty} <span className="text-[8px] sm:text-[10px] text-slate-400 font-normal">Ltr</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Column: Stock, Temp, Dispatch */}
                <div className="space-y-6 sm:space-y-10">
                  {/* BMC Milk Stock */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-xl border border-slate-100">
                    <h3 className="text-slate-400 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-6 sm:mb-8">BMC Milk Stock</h3>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      {[
                        { label: 'Opening Stock', val: '850', unit: 'Ltr', color: 'slate' },
                        { label: 'Received Today', val: '5,690', unit: 'Ltr', color: 'blue' },
                        { label: 'Chilled Volume', val: '1,600', unit: 'Ltr', color: 'emerald' },
                        { label: 'Dispatched Ltr', val: '1,680', unit: 'Ltr', color: 'red' },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-4 sm:p-5 bg-slate-50 rounded-xl sm:rounded-[1.5rem] border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                          <span className="text-[9px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                          <span className={`text-sm sm:text-lg font-black text-slate-900 tabular-nums`}>{item.val} <span className="text-[8px] sm:text-[10px] text-slate-400 uppercase">{item.unit}</span></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chiller Temperature Log */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-6 sm:mb-8">
                      <h3 className="text-slate-400 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em]">Chiller Temp Log</h3>
                      <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-100">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest">Power Cat Log</span>
                      </div>
                    </div>
                    <div className="h-28 sm:h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { time: '0', temp: 15 },
                          { time: '3', temp: 12 },
                          { time: '6', temp: 8 },
                          { time: '9', temp: 5 },
                          { time: '12', temp: 3.2 },
                          { time: '15', temp: 3.1 },
                          { time: '18', temp: 3.2 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="time" hide />
                          <YAxis hide domain={[0, 20]} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '15px sm:20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '8px sm:12px' }}
                            itemStyle={{ fontWeight: '900', fontSize: '10px sm:12px', color: '#0f172a' }}
                            labelStyle={{ display: 'none' }}
                          />
                          <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} sm:strokeWidth={5} dot={{ r: 3, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Next Dispatch to Tanker */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-xl border border-slate-100">
                    <h3 className="text-slate-400 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-6 sm:mb-8">Next Tanker Dispatch</h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Tanker ID</label>
                          <div className="px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm text-slate-800 border border-slate-100 shadow-inner">RJ11 AB 1324</div>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="block text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Seal Status</label>
                          <div className="px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm text-slate-400 border border-slate-100 shadow-inner italic">Pending...</div>
                        </div>
                      </div>
                      <button className="w-full py-4 sm:py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl sm:rounded-[2rem] font-black text-[9px] sm:text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        GENERATE MANIFEST
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reception' && (
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Farmer Intake (Weighing & Quality)</h3>
                <div className="flex gap-4">
                  <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                    {(['Morning', 'Evening'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setShift(s)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          shift === s ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Farmer ID</label>
                    <input 
                      type="text" 
                      value={farmerId}
                      onChange={(e) => setFarmerId(e.target.value)}
                      className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-lg shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Milk Type</label>
                    <div className="flex gap-4">
                      {(['Cow', 'Buffalo'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setMilkType(type)}
                          className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${
                            milkType === type 
                            ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-lg shadow-blue-500/10' 
                            : 'bg-slate-50 border-slate-50 text-slate-400'
                          }`}
                        >
                          {type === 'Cow' ? '🐄 Cow' : '🐃 Buffalo'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Milk Weight (KG)</label>
                  <div className="relative group">
                    <input 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-10 py-12 bg-slate-50 rounded-[2.5rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-900 text-6xl shadow-inner placeholder:text-slate-200"
                    />
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 font-black text-slate-300 text-2xl tracking-tighter">KG</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50 rounded-[3rem] border border-slate-100 mb-10">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">FAT %</label>
                  <input 
                    type="number" 
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    className="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-xl text-center"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">SNF %</label>
                  <input 
                    type="number" 
                    value={snf}
                    onChange={(e) => setSnf(e.target.value)}
                    className="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-xl text-center"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">CLR</label>
                  <input 
                    type="number" 
                    value={clr}
                    onChange={(e) => setClr(e.target.value)}
                    className="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-xl text-center"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Temp (°C)</label>
                  <input 
                    type="number" 
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none font-black text-slate-800 text-xl text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">Adulteration Status</p>
                    <p className="text-2xl font-black text-emerald-900">{adulteration}% Clean</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">🛡️</div>
                </div>
                <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl shadow-blue-500/20">
                  <div>
                    <p className="text-[10px] text-blue-200 font-black uppercase tracking-widest mb-1">Calculated Amount</p>
                    <p className="text-3xl font-black">₹ {amount}</p>
                    <p className="text-[10px] text-blue-100 font-bold mt-1 uppercase">Rate: ₹{rate}/KG</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">💰</div>
                </div>
              </div>

              <button 
                onClick={() => setShowSlip(true)}
                className="w-full py-8 bg-slate-900 hover:bg-slate-800 text-white rounded-[2.5rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95"
              >
                Finalize & Generate Slip
              </button>
            </div>
          )}

          {showSlip && (
            <MilkPouringSlip 
              farmerName="Suresh Kumar"
              farmerId={farmerId}
              date={new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              time={new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
              quantity={parseFloat(weight) || 0}
              fat={parseFloat(fat)}
              snf={parseFloat(snf)}
              amount={parseFloat(amount)}
              temp={parseFloat(temp)}
              onClose={() => setShowSlip(false)}
            />
          )}

          {activeTab === 'reception' && (
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Recent Intake Stream</h4>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">System Live</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'FRM-10293', name: 'Suresh Kumar', qty: '12.5 KG', fat: '4.2', snf: '8.5', type: 'Cow', time: '08:12 AM' },
                  { id: 'FRM-10552', name: 'Mohit Singh', qty: '8.2 KG', fat: '3.8', snf: '8.2', type: 'Buffalo', time: '08:05 AM' },
                  { id: 'FRM-10211', name: 'Rajesh Devi', qty: '15.0 KG', fat: '4.5', snf: '8.9', type: 'Cow', time: '07:58 AM' },
                ].map((col, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:scale-[1.01] rounded-3xl border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-blue-600 shadow-sm border border-slate-100">{col.id.split('-')[1]}</div>
                       <div>
                          <h5 className="font-black text-slate-800 text-lg tracking-tight">{col.name}</h5>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">ID: {col.id} • {col.time}</p>
                       </div>
                    </div>
                    <div className="hidden md:flex gap-12 text-center">
                       <div>
                          <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Type</p>
                          <p className="font-black text-slate-800">{col.type}</p>
                       </div>
                       <div>
                          <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Fat/SNF</p>
                          <p className="font-black text-slate-800">{col.fat}/{col.snf}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-black text-slate-900">{col.qty}</p>
                       <span className="text-[9px] font-black uppercase text-emerald-600">Approved</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chilling' && (
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
               <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">Chilling Unit Monitoring</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: 'Tank A-01', temp: '3.2°C', status: 'Cooling', vol: '2,400L' },
                    { label: 'Tank A-02', temp: '4.1°C', status: 'Standby', vol: '1,200L' },
                    { label: 'Tank B-01', temp: '28.5°C', status: 'Cleaning', vol: '0L' },
                  ].map((tank, i) => (
                    <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                       <h4 className="font-black text-slate-900 mb-4">{tank.label}</h4>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black text-slate-400 uppercase">Temperature</span>
                             <span className="text-xl font-black text-blue-600">{tank.temp}</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black text-slate-400 uppercase">Volume</span>
                             <span className="font-black text-slate-800">{tank.vol}</span>
                          </div>
                          <div className="pt-4 border-t border-slate-200 flex items-center gap-2">
                             <span className={`w-2 h-2 rounded-full ${tank.status === 'Cooling' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                             <span className="text-[10px] font-black text-slate-500 uppercase">{tank.status}</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'dispatch' && (
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
              <h3 className="text-3xl font-black text-slate-900 mb-12 tracking-tight">Tanker Dispatch Unit</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Select Tanker ID</label>
                    <input 
                      type="text" 
                      defaultValue="TKR-9902"
                      className="w-full px-8 py-6 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-xl shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Dispatch Weight (KG)</label>
                    <input 
                      type="number" 
                      defaultValue="4250"
                      className="w-full px-8 py-6 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-xl shadow-inner"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Seal Number (Before)</label>
                      <input 
                        type="text" 
                        defaultValue="SEAL-44239"
                        className="w-full px-6 py-5 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-center shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Seal Number (Final)</label>
                      <input 
                        type="text" 
                        defaultValue="SEAL-44240"
                        className="w-full px-6 py-5 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-center shadow-inner"
                      />
                    </div>
                  </div>
                  <button className="w-full py-8 bg-slate-900 hover:bg-slate-800 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 transition-all active:scale-95 mt-4">
                    Confirm Dispatch & Sync Factory
                  </button>
                </div>

                <div className="bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Recent Fleet Departures</h4>
                  <div className="space-y-6">
                    {[
                      { id: 'TKR-5529', vol: '4200L', time: '08:30 AM', status: 'In Transit' },
                      { id: 'TKR-2101', vol: '3800L', time: 'Yesterday', status: 'Reached' },
                    ].map((fleet, i) => (
                      <div key={i} className="p-6 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm">
                        <div>
                          <p className="font-black text-slate-900 text-lg">{fleet.id}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{fleet.vol} • {fleet.time}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          fleet.status === 'In Transit' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {fleet.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-3xl shadow-2xl shadow-slate-200">📄</div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">BMC Performance Reports</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Audit Ready • Blockchain Validated</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Download XLS</button>
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">Export PDF Report</button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Daily Collection Volume (LTRS)</h4>
                  <div className="h-64 flex items-end gap-4 px-4">
                    {[
                      { h: 40, label: '06:00' },
                      { h: 85, label: '07:00' },
                      { h: 120, label: '08:00', active: true },
                      { h: 90, label: '09:00' },
                      { h: 30, label: '10:00' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-4">
                        <div 
                          className={`w-full rounded-xl transition-all duration-500 ${bar.active ? 'bg-blue-500 shadow-xl shadow-blue-500/30' : 'bg-slate-200'}`}
                          style={{ height: `${(bar.h / 120) * 100}%` }}
                        ></div>
                        <span className="text-[10px] font-black text-slate-400">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Shift Ledger History</h4>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 no-scrollbar">
                    {[
                      { id: 'AUD-9921', name: 'Ramesh C.', time: '08:42 AM', qty: '42.5 Kg', fat: '4.2%' },
                      { id: 'AUD-9920', name: 'Suresh V.', time: '08:35 AM', qty: '12.8 Kg', fat: '4.8%' },
                      { id: 'AUD-9919', name: 'Amit K.', time: '08:22 AM', qty: '22.0 Kg', fat: '3.9%' },
                      { id: 'AUD-9918', name: 'Dinesh P.', time: '08:15 AM', qty: '18.2 Kg', fat: '4.1%' },
                    ].map((entry, i) => (
                      <div key={i} className="p-5 bg-slate-50/50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                        <div className="flex items-center gap-4">
                          <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{entry.id}</span>
                          <div>
                            <p className="font-black text-slate-800 text-sm">{entry.name}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">{entry.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900">{entry.qty}</p>
                          <p className="text-[9px] text-slate-400 font-black uppercase">FAT: {entry.fat}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 sm:mb-8 text-center">Shift Quick Stats</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-[2rem] border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Today's Total</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900">2,420 <span className="text-xs sm:text-sm text-slate-400">L</span></p>
              </div>
              <div className="p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-[2rem] border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Avg FAT Score</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900">4.25</p>
              </div>
              <div className="p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-[2rem] border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Total Payable</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900 truncate">₹ 1,24,080</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="font-black text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-xl sm:text-2xl">📈</span> Intake Trend
            </h3>
            <div className="h-24 sm:h-32 flex items-end gap-1 sm:gap-2 px-1 sm:px-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-blue-500/20 rounded-t-md sm:rounded-t-lg relative group/bar"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-t-md sm:rounded-t-lg scale-y-0 group-hover/bar:scale-y-100 origin-bottom transition-transform"></div>
                </div>
              ))}
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase mt-4 sm:mt-6 text-center tracking-widest">Last 7 Days Activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMCPanel;
