
import React, { useState, useEffect } from 'react';

const TankerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'trips'>('map');
  const [tankers, setTankers] = useState([
    { id: 'TKR-5529', driver: 'Rahul S.', status: 'Moving', speed: '45 km/h', temp: '3.8°C', load: '85%', eta: '12m', route: 'BMC East Hub → Central Factory' },
    { id: 'TKR-2101', driver: 'Aman V.', status: 'Idle', speed: '0 km/h', temp: '4.1°C', load: '10%', eta: '-', route: 'Standby at Main Gate' },
    { id: 'TKR-3342', driver: 'Sumit K.', status: 'Warning', speed: '62 km/h', temp: '5.2°C', load: '90%', eta: '45m', route: 'Hub South → Dairy Plant' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('map')}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'map' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            🛰️ Live GPS Map
          </button>
          <button 
            onClick={() => setActiveTab('trips')}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'trips' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            📋 Master Trip Logs
          </button>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100 w-full md:w-auto">
           <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
           <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest">System Cloud Synced: 0.2s Latency</p>
        </div>
      </div>

      {activeTab === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 h-[700px] bg-slate-200 rounded-[2.5rem] border-8 border-white shadow-2xl relative overflow-hidden group">
             {/* Map Background Simulation */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] bg-repeat opacity-10"></div>
             <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300"></div>
             
             {/* Map Grid Elements */}
             <div className="absolute top-1/2 left-0 w-full h-px bg-slate-400/20"></div>
             <div className="absolute top-0 left-1/2 w-px h-full bg-slate-400/20"></div>

             {/* Live Tanker Marker */}
             <div className="absolute top-[30%] left-[45%] animate-pulse">
                <div className="relative group/marker">
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 w-56 transform transition-all scale-0 group-hover/marker:scale-100 origin-bottom">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-black text-blue-600 text-sm">TKR-5529</h5>
                        <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded">MOVING</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold mb-3">DRIVER: RAHUL SHARMA</p>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                         <div className="bg-slate-50 p-2 rounded-lg">TEMP: 3.8°C</div>
                         <div className="bg-slate-50 p-2 rounded-lg">LOAD: 85%</div>
                      </div>
                   </div>
                   <div className="w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white text-xl ring-4 ring-blue-500/20">
                      🚛
                   </div>
                </div>
             </div>

             <div className="absolute bottom-10 left-10 p-6 bg-white/95 backdrop-blur rounded-[2rem] shadow-2xl border border-white max-w-sm">
                <h4 className="font-black text-slate-800 text-xs mb-4 uppercase tracking-widest border-b border-slate-100 pb-2">Tracking Telemetry</h4>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                      <span>Network Strength</span>
                      <span className="text-green-600">Excellent (42ms)</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                      <span>Satellites Linked</span>
                      <span className="text-slate-800">12 Active</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                      <span>Encryption Status</span>
                      <span className="text-blue-600">AES-256 SECURED</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="font-black text-slate-400 uppercase tracking-widest text-[10px] ml-2 mb-2">Active Fleet Status</h3>
             {tankers.map((t) => (
               <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h4 className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">{t.id}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{t.driver}</p>
                     </div>
                     <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        t.status === 'Moving' ? 'bg-green-100 text-green-700' :
                        t.status === 'Warning' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                     }`}>{t.status.toUpperCase()}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold mb-4 line-clamp-1">📍 {t.route}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
                        <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">Temp</p>
                        <p className={`text-sm font-black ${t.status === 'Warning' ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>{t.temp}</p>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
                        <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">Speed</p>
                        <p className="text-sm font-black text-slate-800">{t.speed}</p>
                     </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-black mb-1.5 px-1 uppercase text-slate-400">
                     <span>Load Capacity</span>
                     <span className="text-slate-800">{t.load}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5 border border-slate-50">
                     <div className="bg-slate-900 h-full rounded-full transition-all duration-700" style={{ width: t.load }}></div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
           <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-slate-800 text-lg">Detailed Trip Analytics</h3>
              <div className="flex gap-2">
                 <button className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50">Filter Results</button>
                 <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg">Download Log</button>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-white text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                    <tr>
                       <th className="px-8 py-5">Trip Ref</th>
                       <th className="px-8 py-5">Fleet ID</th>
                       <th className="px-8 py-5">Primary Route</th>
                       <th className="px-8 py-5">Departure</th>
                       <th className="px-8 py-5">Arrival Est.</th>
                       <th className="px-8 py-5">Efficiency</th>
                       <th className="px-8 py-5">Compliance</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 text-sm">
                    {[...Array(10)].map((_, i) => (
                       <tr key={i} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-5 font-mono font-bold text-blue-600">TRP-00{i+1}</td>
                          <td className="px-8 py-5 font-bold text-slate-800">TKR-55{i}</td>
                          <td className="px-8 py-5 text-slate-500 font-medium">Main Factory → Distribution Hub {i+1}</td>
                          <td className="px-8 py-5 font-bold">0{6+i}:00 AM</td>
                          <td className="px-8 py-5 font-bold">0{7+i}:45 AM</td>
                          <td className="px-8 py-5">
                             <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black">94% FUEL OK</span>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span className="font-bold text-xs">PASSED</span>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default TankerPanel;
