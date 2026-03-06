import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Truck, Factory, Network, Navigation, Activity, 
  AlertTriangle, CheckCircle2, Clock, MapPin, 
  Thermometer, Droplets, Zap, ShieldCheck, Download, FileText, Printer,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const tankerData = [
  { id: 'TNK-001', driver: 'Vikram Singh', route: 'Shimla - Solan', status: 'On Route', location: 'Near Kandaghat', speed: '45 km/h', temp: '4°C', fuel: '65%', gps: 'Active' },
  { id: 'TNK-002', driver: 'Amit Sharma', route: 'Kufri - Shimla', status: 'Loading', location: 'Kufri Hub', speed: '0 km/h', temp: '3.8°C', fuel: '82%', gps: 'Active' },
  { id: 'TNK-003', driver: 'Rajesh Kumar', route: 'Solan - Factory', status: 'Unloading', location: 'Main Factory', speed: '0 km/h', temp: '4.2°C', fuel: '40%', gps: 'Active' },
  { id: 'TNK-004', driver: 'Suresh Raina', route: 'Chail - Solan', status: 'On Route', location: 'Chail Road', speed: '38 km/h', temp: '4.1°C', fuel: '55%', gps: 'Signal Low' },
];

const factoryPerformanceData = [
  { time: '08:00', throughput: 1200, efficiency: 92 },
  { time: '10:00', throughput: 2500, efficiency: 95 },
  { time: '12:00', throughput: 3100, efficiency: 88 },
  { time: '14:00', throughput: 2800, efficiency: 94 },
  { time: '16:00', throughput: 2200, efficiency: 91 },
  { time: '18:00', throughput: 1800, efficiency: 93 },
];

const hubPerformanceData = [
  { name: 'Shimla North', collection: 4500, distribution: 4200, efficiency: 96 },
  { name: 'Solan Central', collection: 6200, distribution: 5800, efficiency: 94 },
  { name: 'Kufri East', collection: 2800, distribution: 2500, efficiency: 89 },
  { name: 'Chail South', collection: 3100, distribution: 2900, efficiency: 92 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const LogisticsFactory: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'tankers' | 'factory' | 'hubs'>('tankers');
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <AnimatePresence>
        {showMap && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-6xl h-full max-h-[800px] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative"
            >
              {/* Header */}
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Fleet Map</h2>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Real-time GPS Tracking & Route Monitoring</p>
                </div>
                <button 
                  onClick={() => setShowMap(false)}
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:shadow-lg transition-all border border-slate-100"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Map Area */}
              <div className="flex-1 bg-slate-100 relative overflow-hidden p-8">
                <div className="absolute inset-0 opacity-20">
                   {/* Grid background */}
                   <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>
                
                {/* Stylized Map Container */}
                <div className="relative w-full h-full bg-white rounded-[2rem] border-4 border-white shadow-inner overflow-hidden">
                   {/* Simulated Map Background */}
                   <div className="absolute inset-0 bg-blue-50/30">
                      <svg className="absolute inset-0 w-full h-full opacity-10">
                         <path d="M100,100 L300,200 L500,150 L800,400" stroke="#6366f1" strokeWidth="20" fill="none" strokeLinecap="round" />
                         <path d="M200,500 L400,400 L600,600 L900,550" stroke="#6366f1" strokeWidth="20" fill="none" strokeLinecap="round" />
                         <path d="M50,300 L250,350 L450,250 L750,100" stroke="#6366f1" strokeWidth="20" fill="none" strokeLinecap="round" />
                      </svg>
                   </div>

                   {/* Tanker Markers */}
                   {tankerData.map((tanker, i) => {
                      const left = [20, 45, 70, 35][i % 4] + '%';
                      const top = [30, 60, 40, 80][i % 4] + '%';
                      
                      return (
                         <motion.div
                            key={tanker.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="absolute group cursor-pointer"
                            style={{ left, top }}
                         >
                            <div className="relative flex flex-col items-center">
                               <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                  <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl w-48">
                                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{tanker.id}</p>
                                     <p className="text-xs font-bold mb-1">{tanker.driver}</p>
                                     <div className="flex justify-between text-[8px] font-black uppercase">
                                        <span>Speed: {tanker.speed}</span>
                                        <span className="text-emerald-400">{tanker.temp}</span>
                                     </div>
                                  </div>
                                  <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1"></div>
                               </div>

                               {tanker.gps === 'Active' && (
                                  <div className="absolute w-12 h-12 bg-indigo-500/20 rounded-full animate-ping"></div>
                               )}
                               
                               <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-lg border-2 border-white relative z-10 ${
                                  tanker.status === 'On Route' ? 'bg-indigo-600 text-white' :
                                  tanker.status === 'Loading' ? 'bg-amber-500 text-white' :
                                  'bg-emerald-500 text-white'
                               }`}>
                                  🚛
                               </div>
                            </div>
                         </motion.div>
                      );
                   })}

                   {/* Map Legend */}
                   <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg space-y-2">
                      <div className="flex items-center gap-3">
                         <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                         <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">On Route</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                         <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Loading</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                         <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Unloading</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl shadow-indigo-600/20 transform -rotate-3">
            🚛
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Logistics & Factory Control</h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Fleet Active: 12/14</span>
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Factory: Optimal</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-4 relative z-10">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all border border-slate-200"
            >
              <Printer size={14} />
              Print
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all border border-slate-200"
            >
              <FileText size={14} />
              Export PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-slate-900/20">
              <Download size={16} />
              Logistics Report
            </button>
          </div>
          
          <div className="flex gap-4 p-2 bg-slate-100 rounded-[2rem]">
            <button
              onClick={() => setActiveSubTab('tankers')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
                activeSubTab === 'tankers' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Truck size={16} />
              Tanker GPS
            </button>
            <button
              onClick={() => setActiveSubTab('factory')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
                activeSubTab === 'factory' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Factory size={16} />
              Factory Performance
            </button>
            <button
              onClick={() => setActiveSubTab('hubs')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
                activeSubTab === 'hubs' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Network size={16} />
              CNDF Hubs
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'tankers' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
          {/* Tanker Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Navigation size={24} />
                </div>
                <span className="text-[10px] font-black text-emerald-500 uppercase">Live Now</span>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Active Tankers</p>
              <p className="text-2xl font-black text-slate-900">12 / 14</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <Droplets size={24} />
                </div>
                <span className="text-[10px] font-black text-blue-500 uppercase">Avg Efficiency</span>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Fuel Performance</p>
              <p className="text-2xl font-black text-slate-900">4.2 km/L</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Thermometer size={24} />
                </div>
                <span className="text-[10px] font-black text-emerald-500 uppercase">Stable</span>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Avg Transit Temp</p>
              <p className="text-2xl font-black text-slate-900">4.1°C</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <span className="text-[10px] font-black text-amber-500 uppercase">On Time</span>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Schedule Adherence</p>
              <p className="text-2xl font-black text-slate-900">96.8%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Tanker List */}
            <div className="xl:col-span-2 bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Live Fleet Tracking</h3>
                <button 
                  onClick={() => setShowMap(true)}
                  className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                >
                  View Map View →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanker ID</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver / Route</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">GPS Status</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Temp / Fuel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {tankerData.map((tanker) => (
                      <tr key={tanker.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-black text-slate-600">
                              {tanker.id.split('-')[1]}
                            </div>
                            <span className="text-sm font-black text-slate-900">{tanker.id}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div>
                            <p className="text-sm font-black text-slate-800">{tanker.driver}</p>
                            <p className="text-[10px] font-bold text-slate-400">{tanker.route}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${tanker.gps === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                            <span className="text-xs font-bold text-slate-700">{tanker.gps}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            tanker.status === 'On Route' ? 'bg-blue-100 text-blue-600' :
                            tanker.status === 'Loading' ? 'bg-amber-100 text-amber-600' :
                            'bg-emerald-100 text-emerald-600'
                          }`}>
                            {tanker.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-slate-500">
                            <MapPin size={12} className="text-indigo-500" />
                            <span className="text-xs font-bold">{tanker.location}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Thermometer size={12} className="text-emerald-500" />
                              <span className="text-xs font-bold text-slate-700">{tanker.temp}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Droplets size={12} className="text-blue-500" />
                              <span className="text-xs font-bold text-slate-700">{tanker.fuel}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fleet Health */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Fleet Health Index</h3>
              <div className="space-y-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-slate-700 uppercase">Engine Performance</span>
                    <span className="text-xs font-black text-emerald-600">94%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[94%]" />
                  </div>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-slate-700 uppercase">Tire Condition</span>
                    <span className="text-xs font-black text-amber-600">82%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[82%]" />
                  </div>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-slate-700 uppercase">Cooling System</span>
                    <span className="text-xs font-black text-emerald-600">98%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[98%]" />
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-indigo-600 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Maintenance Alert</span>
                </div>
                <p className="text-sm font-bold opacity-90">TNK-003 requires tire replacement in 48 hours.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'factory' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Factory Overview */}
            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Processing Efficiency</h3>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Factory Throughput Analytics</h2>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Load</p>
                    <p className="text-lg font-black text-indigo-600">8.4k L/hr</p>
                  </div>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={factoryPerformanceData}>
                    <defs>
                      <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="throughput" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorThroughput)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quality Control */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Quality Control (Live)</h3>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      <Droplets size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Fat Content</p>
                      <p className="text-xl font-black text-slate-800">4.2%</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-emerald-500" size={20} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                      <Activity size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg SNF</p>
                      <p className="text-xl font-black text-slate-800">8.8%</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-emerald-500" size={20} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                      <Thermometer size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pasteurization Temp</p>
                      <p className="text-xl font-black text-slate-800">72.4°C</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-emerald-500" size={20} />
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-emerald-600 mb-2">
                    <ShieldCheck size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">FSSAI Compliant</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">All parameters within safety thresholds.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Machine Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Pasteurizer A', 'Homogenizer 1', 'Packaging Line 1', 'Chiller Unit 4'].map((machine, i) => (
              <div key={machine} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm group hover:border-indigo-500 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg">
                    ⚙️
                  </div>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-1">{machine}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Status: Running</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                    <span>Efficiency</span>
                    <span>{90 + i}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full bg-indigo-500 w-[${90 + i}%]`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'hubs' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Hub Comparison */}
            <div className="xl:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">CNDF Hub Performance Comparison</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hubPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}} />
                    <Legend iconSize={10} wrapperStyle={{fontSize: '10px', fontWeight: 'bold', paddingTop: '20px'}} />
                    <Bar dataKey="collection" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Collection (L)" />
                    <Bar dataKey="distribution" fill="#10b981" radius={[6, 6, 0, 0]} name="Distribution (L)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hub Efficiency Pie */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">Network Volume Share</h3>
              <div className="flex-1 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hubPerformanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="collection"
                    >
                      {hubPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-3">
                {hubPerformanceData.map((hub, i) => (
                  <div key={hub.name} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs font-bold text-slate-700">{hub.name}</span>
                    </div>
                    <span className="text-xs font-black text-slate-900">{hub.efficiency}% Eff.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Hub Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hubPerformanceData.map((hub) => (
              <div key={hub.name} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      📍
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">{hub.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CNDF Hub ID: HUB-{hub.name.split(' ')[0].toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-widest">Operational</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Collection</p>
                    <p className="text-lg font-black text-slate-800">{hub.collection}L</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Distribution</p>
                    <p className="text-lg font-black text-slate-800">{hub.distribution}L</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Efficiency</p>
                    <p className="text-lg font-black text-indigo-600">{hub.efficiency}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                        U{i}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-600">
                      +4
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                    View Hub Logistics →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogisticsFactory;
