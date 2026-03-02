
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, RadialBarChart, RadialBar 
} from 'recharts';

const data = [
  { name: 'Mon', collection: 4000, sales: 2400, quality: 85 },
  { name: 'Tue', collection: 3000, sales: 1398, quality: 88 },
  { name: 'Wed', collection: 2000, sales: 9800, quality: 92 },
  { name: 'Thu', collection: 2780, sales: 3908, quality: 90 },
  { name: 'Fri', collection: 1890, sales: 4800, quality: 87 },
  { name: 'Sat', collection: 2390, sales: 3800, quality: 94 },
  { name: 'Sun', collection: 3490, sales: 4300, quality: 91 },
];

const efficiencyData = [
  { name: 'Collection', value: 85, fill: '#3b82f6' },
  { name: 'Processing', value: 92, fill: '#10b981' },
  { name: 'Delivery', value: 78, fill: '#6366f1' },
  { name: 'Quality', value: 95, fill: '#f59e0b' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Dynamic AI Status Header */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl shadow-slate-900/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
            🚀
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Enterprise Overview</h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">Live Network: Active</span>
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">AI Engine: Optimized</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none p-5 bg-slate-50 rounded-3xl border border-slate-100 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Server Latency</p>
            <p className="text-xl font-black text-slate-800">42ms</p>
          </div>
          <div className="flex-1 lg:flex-none p-5 bg-slate-50 rounded-3xl border border-slate-100 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Active Nodes</p>
            <p className="text-xl font-black text-slate-800">124</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Daily Intake" value="12.4k L" change="+14.2%" trend="up" icon="🥛" color="blue" />
        <StatCard title="Fleet Status" value="98.4%" change="Normal" trend="neutral" icon="🚛" color="indigo" />
        <StatCard title="Revenue Yield" value="₹4.28L" change="+8.2%" trend="up" icon="💰" color="emerald" />
        <StatCard title="Customer Base" value="2,840" change="+125" trend="up" icon="👥" color="orange" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <div className="xl:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Milk Supply & Distribution Analytics</h3>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 mr-4">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Collection</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Sales</span>
               </div>
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="collection" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorCollection)" />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Efficiency Radar/Radial */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">Network Efficiency Index</h3>
          <div className="flex-1 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="100%" barSize={15} data={efficiencyData}>
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff', fontSize: 10, fontWeight: 'bold' }}
                  background
                  dataKey="value"
                  radius={10}
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{fontSize: '10px', fontWeight: 'bold'}} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Overall System Performance</span>
                <span className="text-lg font-black text-slate-900">89.4%</span>
             </div>
             <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[89%]" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, trend, icon, color }: any) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600',
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-600',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-default">
      <div className="flex items-center justify-between mb-6">
        <div className={`w-16 h-16 ${colorMap[color]} rounded-3xl flex items-center justify-center text-3xl shadow-xl shadow-blue-500/10 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
          {icon}
        </div>
        <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
          trend === 'down' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'
        }`}>
          {change}
        </div>
      </div>
      <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-3xl font-black text-slate-800 tracking-tighter">{value}</p>
    </div>
  );
};

export default AdminDashboard;
