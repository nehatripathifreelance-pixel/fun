
import React, { useState, useMemo } from 'react';

type BMCTab = 'reception' | 'chilling' | 'dispatch' | 'reports';

const BMCPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BMCTab>('reception');
  
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

  // Calculations
  const rate = useMemo(() => {
    const base = milkType === 'Cow' ? 38.5 : 52.0;
    const fatBonus = (parseFloat(fat) - (milkType === 'Cow' ? 3.5 : 5.0)) * 2.5;
    return Math.max(base + fatBonus, 0).toFixed(2);
  }, [fat, milkType]);

  const amount = useMemo(() => {
    return (parseFloat(weight || '0') * parseFloat(rate)).toFixed(2);
  }, [weight, rate]);

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Tab Navigation */}
      <div className="flex flex-nowrap gap-3 p-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
        {[
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="xl:col-span-3 space-y-8">
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

              <button className="w-full py-8 bg-slate-900 hover:bg-slate-800 text-white rounded-[2.5rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95">
                Finalize & Generate Slip
              </button>
            </div>
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
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center">Shift Quick Stats</h4>
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Today's Total</p>
                <p className="text-2xl font-black text-slate-900">2,420 <span className="text-sm text-slate-400">L</span></p>
              </div>
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Avg FAT Score</p>
                <p className="text-2xl font-black text-slate-900">4.25</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Total Payable</p>
                <p className="text-2xl font-black text-slate-900">₹ 1,24,080</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="font-black text-lg mb-6 flex items-center gap-3">
              <span className="text-2xl">📈</span> Intake Trend
            </h3>
            <div className="h-32 flex items-end gap-2 px-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-blue-500/20 rounded-t-lg relative group/bar"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-t-lg scale-y-0 group-hover/bar:scale-y-100 origin-bottom transition-transform"></div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-6 text-center tracking-widest">Last 7 Days Activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMCPanel;
