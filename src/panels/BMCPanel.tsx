
import React from 'react';

const BMCPanel: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Reception Dashboard */}
        <div className="xl:col-span-3 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center text-2xl shadow-xl shadow-indigo-500/20">❄️</div>
               <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">BMC Operations Center</h2>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Active Hub #04 - North Sector</p>
               </div>
            </div>
            <div className="flex gap-2">
               <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">Start Batch Process</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
             <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 group hover:scale-105 transition-transform">
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">Total Reception</p>
                <p className="text-4xl font-black text-slate-900">1,240 <span className="text-xl text-blue-600">L</span></p>
                <div className="mt-4 flex items-center gap-2">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                   <span className="text-[10px] font-bold text-slate-500 uppercase">Within Target</span>
                </div>
             </div>
             <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 group hover:scale-105 transition-transform">
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2">Cooling Temperature</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-slate-900">3.5</p>
                  <p className="text-xl font-black text-indigo-600">°C</p>
                </div>
                <div className="mt-4 w-full bg-indigo-200 h-1 rounded-full overflow-hidden">
                   <div className="bg-indigo-600 h-full w-[80%]"></div>
                </div>
             </div>
             <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white group hover:scale-105 transition-transform">
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">System Health</p>
                <p className="text-4xl font-black">99.2 <span className="text-xl text-slate-400">%</span></p>
                <div className="mt-4 flex items-center gap-2">
                   <span className="text-[10px] font-bold text-blue-300 uppercase">IoT Sensors Online</span>
                </div>
             </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Live Intake Stream</h4>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'F-102', name: 'Suresh Kumar', qty: '12.5 L', fat: '4.2', clr: '28.5', status: 'Approved' },
                { id: 'F-552', name: 'Mohit Singh', qty: '8.2 L', fat: '3.8', clr: '27.2', status: 'Approved' },
                { id: 'F-211', name: 'Rajesh Devi', qty: '15.0 L', fat: '4.5', clr: '29.0', status: 'Pending' },
              ].map((col, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-blue-600 shadow-sm border border-slate-100">{col.id.split('-')[1]}</div>
                     <div>
                        <h5 className="font-black text-slate-800 text-lg tracking-tight">{col.name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">ID: {col.id} • Lvl: Gold Member</p>
                     </div>
                  </div>
                  <div className="hidden md:flex gap-12 text-center">
                     <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Fat %</p>
                        <p className="font-black text-slate-800">{col.fat}</p>
                     </div>
                     <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">CLR</p>
                        <p className="font-black text-slate-800">{col.clr}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-xl font-black text-slate-900">{col.qty}</p>
                     <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${col.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {col.status}
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Column */}
        <div className="space-y-8">
           <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="font-black text-lg mb-6 flex items-center gap-3">
                 <span className="text-2xl">🚛</span> Tanker Dispatch
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                   <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">Active Vehicle</p>
                   <p className="text-xl font-black mb-1">TKR-9902</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">Capacity: 5000L / Loaded: 1240L</p>
                </div>
                <div className="flex items-center justify-between text-xs px-2">
                   <span className="text-slate-400 font-bold">Driver Status</span>
                   <span className="text-emerald-400 font-black">ONLINE</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all">
                  Generate Dispatch
                </button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 text-center">Precision QC Metrics</h3>
              <div className="space-y-8">
                 {[
                   { label: 'Density Test', val: 1.028, color: 'emerald' },
                   { label: 'Fat Integrity', val: 99.2, unit: '%', color: 'blue' },
                   { label: 'Acid Levels', val: 0.14, color: 'amber' },
                 ].map((item, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="text-slate-500">{item.label}</span>
                         <span className="text-slate-900">{item.val}{item.unit}</span>
                      </div>
                      <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                         <div className={`bg-${item.color}-500 h-full rounded-full transition-all duration-1000`} style={{width: `${70 + i*10}%`}}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BMCPanel;
