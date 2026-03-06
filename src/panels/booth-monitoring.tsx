
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Store, ShoppingBag, Package, Truck, MessageSquare, 
  TrendingUp, AlertCircle, CheckCircle2, Clock, Search, Filter,
  Download, FileText, Printer
} from 'lucide-react';

const boothPerformanceData = [
  { name: 'Booth A', sales: 450, target: 500, inventory: 85 },
  { name: 'Booth B', sales: 320, target: 300, inventory: 45 },
  { name: 'Booth C', sales: 610, target: 550, inventory: 12 },
  { name: 'Booth D', sales: 280, target: 400, inventory: 60 },
  { name: 'Booth E', sales: 520, target: 500, inventory: 30 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

const BoothMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'inventory' | 'orders' | 'feedback'>('performance');

  const booths = [
    { id: 'B001', name: 'Downtown Hub', manager: 'Arjun Mehta', sales: '₹45,200', units: 1240, stock: '82%', status: 'High Performance', lastOrder: '2h ago', orderStatus: 'Dispatched' },
    { id: 'B002', name: 'Westside Station', manager: 'Sunita Rao', sales: '₹32,100', units: 890, stock: '45%', status: 'Restock Needed', lastOrder: '5h ago', orderStatus: 'Processing' },
    { id: 'B003', name: 'East Gate Point', manager: 'Deepak Verma', sales: '₹58,400', units: 1560, stock: '12%', status: 'Critical Stock', lastOrder: '1h ago', orderStatus: 'Reached' },
    { id: 'B004', name: 'North Plaza', manager: 'Kavita Singh', sales: '₹28,900', units: 720, stock: '60%', status: 'Stable', lastOrder: 'Yesterday', orderStatus: 'Delivered' },
  ];

  const orders = [
    { id: 'ORD-9921', booth: 'East Gate Point', items: 'Milk (500L), Curd (200 Units)', status: 'Dispatched', eta: '2h 15m', priority: 'High' },
    { id: 'ORD-9922', booth: 'Westside Station', items: 'Paneer (50kg), Butter (100 Units)', status: 'Reached', eta: 'Arrived', priority: 'Normal' },
    { id: 'ORD-9923', booth: 'Downtown Hub', items: 'Milk (200L), Ghee (20 Units)', status: 'Processing', eta: '5h 30m', priority: 'Normal' },
  ];

  const feedback = [
    { id: 1, booth: 'Downtown Hub', user: 'Rahul S.', rating: 5, comment: 'Always fresh milk and friendly staff!', time: '1h ago' },
    { id: 2, booth: 'Westside Station', user: 'Priya K.', rating: 3, comment: 'Curd was out of stock today.', time: '3h ago' },
    { id: 3, booth: 'East Gate Point', user: 'Amit B.', rating: 4, comment: 'Great service, but the line was a bit long.', time: '5h ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl shadow-indigo-200">
            🏪
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Booth Monitoring</h2>
            <p className="text-slate-500 font-medium">Real-time oversight of retail network performance</p>
          </div>
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
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-slate-900/20">
            <Download size={16} />
            Download Network Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Store size={24} />
            </div>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2 New</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Booths</p>
          <p className="text-2xl font-black text-slate-800">42</p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShoppingBag size={24} />
            </div>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Units Sold Today</p>
          <p className="text-2xl font-black text-slate-800">8,420</p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
              <AlertCircle size={24} />
            </div>
            <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-full">5 Critical</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Low Stock Alerts</p>
          <p className="text-2xl font-black text-slate-800">12</p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Truck size={24} />
            </div>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full">8 In Transit</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Deliveries</p>
          <p className="text-2xl font-black text-slate-800">15</p>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'performance', label: 'Performance', icon: <TrendingUp size={14} /> },
          { id: 'inventory', label: 'Inventory', icon: <Package size={14} /> },
          { id: 'orders', label: 'Supply Orders', icon: <Truck size={14} /> },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'performance' && (
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Booth Sales Performance</h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> Sales
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div> Target
                  </div>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={boothPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-bottom border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Booth Inventory Status</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search booth..." 
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-y border-slate-100">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Booth Name</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Level</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Status</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {booths.map((booth) => (
                      <tr key={booth.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-900">{booth.name}</p>
                          <p className="text-xs text-slate-500">{booth.manager}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="w-full max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                parseInt(booth.stock) < 20 ? 'bg-red-500' : 
                                parseInt(booth.stock) < 50 ? 'bg-orange-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: booth.stock }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 mt-1 block">{booth.stock} Available</span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-bold text-slate-700">{booth.orderStatus}</p>
                          <p className="text-[10px] text-slate-400">{booth.lastOrder}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            booth.status === 'Critical Stock' ? 'bg-red-50 text-red-600' :
                            booth.status === 'Restock Needed' ? 'bg-orange-50 text-orange-600' :
                            'bg-emerald-50 text-emerald-600'
                          }`}>
                            {booth.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Restock Now</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl ${
                      order.status === 'Reached' ? 'bg-emerald-50 text-emerald-600' : 
                      order.status === 'Dispatched' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {order.status === 'Reached' ? <CheckCircle2 /> : order.status === 'Dispatched' ? <Truck /> : <Clock />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-black text-slate-900">{order.id}</h4>
                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                          order.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {order.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 mb-1">To: {order.booth}</p>
                      <p className="text-[10px] text-slate-400">{order.items}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'Reached' ? 'bg-emerald-500 text-white' : 
                      order.status === 'Dispatched' ? 'bg-blue-500 text-white' : 'bg-slate-400 text-white'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ETA: {order.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Recent Customer Feedback</h3>
              <div className="space-y-8">
                {feedback.map((item) => (
                  <div key={item.id} className="flex gap-6 pb-8 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl shrink-0">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-black text-slate-900">{item.user}</h4>
                        <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full ${i < item.rating ? 'bg-orange-400' : 'bg-slate-200'}`}></div>
                        ))}
                        <span className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">at {item.booth}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{item.comment}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Metrics */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-6 relative z-10">Network Efficiency</h3>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span>Sales Target</span>
                  <span>92%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span>Inventory Health</span>
                  <span>78%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span>Delivery Success</span>
                  <span>99.4%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '99.4%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Top Performing Booths</h3>
            <div className="space-y-6">
              {booths.slice(0, 3).map((booth, idx) => (
                <div key={booth.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-sm font-black text-slate-400">
                    0{idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{booth.name}</p>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{booth.sales} today</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">
              View All Booths
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoothMonitoring;
