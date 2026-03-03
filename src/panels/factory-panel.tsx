
import React from 'react';

const FactoryPanel: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Production Monitor */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Production Floor Monitor</h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Digital Twin Active</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner text-emerald-600">🏭</div>
          </div>

          <div className="space-y-8">
             {[
               { name: 'Pasteurization Line A1', step: 'Homogenization', progress: 65, status: 'Running', color: 'blue' },
               { name: 'Paneer Fabrication Unit', step: 'Pressing & Cutting', progress: 40, status: 'Running', color: 'indigo' },
               { name: 'Ghee Clarification', step: 'High Temp Boiling', progress: 20, status: 'Idle', color: 'slate' },
             ].map((batch, i) => (
               <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                  <div className="flex justify-between items-start mb-6 relative z-10">
                     <div>
                        <h4 className="font-black text-slate-800 text-lg mb-1">{batch.name}</h4>
                        <div className="flex items-center gap-2">
                           <span className={`w-2 h-2 rounded-full ${batch.status === 'Running' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                           <p className="text-[10px] text-slate-400 font-bold uppercase">Phase: {batch.step}</p>
                        </div>
                     </div>
                     <span className={`text-2xl font-black text-${batch.color}-600 tracking-tighter`}>{batch.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative z-10 p-0.5 shadow-inner">
                     <div 
                      className={`bg-${batch.color}-500 h-full rounded-full shadow-lg transition-all duration-1000`} 
                      style={{ width: `${batch.progress}%` }}
                    ></div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Factory Status Column */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
             <h3 className="font-black text-xl mb-8 flex items-center gap-3">
                <span className="text-2xl">📦</span> Inventory Ledger
             </h3>
             <div className="space-y-6">
                {[
                  { label: 'Raw Milk Balance', val: '8,420 L', icon: '🥛' },
                  { label: 'Packaging Units', val: '12,000 Pcs', icon: '🏷️' },
                  { label: 'Storage Temp', val: '-18°C', icon: '❄️' },
                ].map((inv, idx) => (
                  <div key={idx} className="flex justify-between items-center p-5 bg-white/5 rounded-3xl border border-white/10 group-hover:bg-white/10 transition-colors">
                     <div className="flex items-center gap-4">
                        <span className="text-xl">{inv.icon}</span>
                        <p className="text-[10px] text-blue-300 font-black uppercase tracking-widest">{inv.label}</p>
                     </div>
                     <p className="font-black text-lg">{inv.val}</p>
                  </div>
                ))}
             </div>
             <button className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20">
                Generate Stock Audit
             </button>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 text-center">Live Utility Analytics</h3>
             <div className="grid grid-cols-1 gap-8">
                {[
                   { label: 'Electrical Load', val: '78%', color: 'emerald' },
                   { label: 'Water Quality', val: '99.8%', color: 'blue' },
                   { label: 'Steam Efficiency', val: '84%', color: 'indigo' },
                ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center gap-4">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-50" />
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                               className={`text-${item.color}-500 transition-all duration-1000`} 
                               strokeDasharray={364} 
                               strokeDashoffset={364 - (364 * parseInt(item.val)) / 100} 
                            />
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-slate-900">{item.val}</span>
                            <span className="text-[8px] font-black text-slate-400 uppercase">{item.label.split(' ')[0]}</span>
                         </div>
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

export default FactoryPanel;
