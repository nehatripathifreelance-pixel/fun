
import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

const salesMixData = [
  { name: 'Pure Milk', value: 45 },
  { name: 'Paneer', value: 25 },
  { name: 'Ghee', value: 15 },
  { name: 'Curd', value: 10 },
  { name: 'Butter', value: 5 },
];

const performanceData = [
  { subject: 'Quality', A: 120, B: 110, fullMark: 150 },
  { subject: 'Delivery', A: 98, B: 130, fullMark: 150 },
  { subject: 'Collection', A: 86, B: 130, fullMark: 150 },
  { subject: 'Fat Index', A: 99, B: 100, fullMark: 150 },
  { subject: 'Cost', A: 85, B: 90, fullMark: 150 },
  { subject: 'Uptime', A: 65, B: 85, fullMark: 150 },
];

const monthlyTrend = [
  { name: 'Jan', revenue: 4000, profit: 2400, target: 4500 },
  { name: 'Feb', revenue: 3000, profit: 1398, target: 4500 },
  { name: 'Mar', revenue: 9800, profit: 2000, target: 4500 },
  { name: 'Apr', revenue: 3908, profit: 2780, target: 4500 },
  { name: 'May', revenue: 4800, profit: 1890, target: 4500 },
  { name: 'Jun', revenue: 3800, profit: 2390, target: 4500 },
];

const scatterData = Array.from({ length: 40 }).map((_, i) => ({
  fat: 3.5 + Math.random() * 2,
  snf: 8.0 + Math.random() * 1.5,
  z: Math.random() * 1000
}));

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899'];

const ReportsPanel: React.FC = () => {
  const [reportType, setReportType] = useState('Farmer');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportOptions = [
    { id: 'Farmer', label: 'Farmer Quality Matrix', icon: '🐄' },
    { id: 'Sales', label: 'Profit & Revenue', icon: '💰' },
    { id: 'Inventory', label: 'Stock Cycle Analysis', icon: '📦' },
    { id: 'Tracking', label: 'Route Efficiency', icon: '🚛' },
  ];

  const handleGenerate = (format: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`${format} Generated successfully for ${reportType} report!`);
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-12">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
        {isGenerating && (
          <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn">
            <div className="w-24 h-24 border-8 border-slate-900 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <p className="font-black text-slate-900 text-xl uppercase tracking-widest">Compiling Data Nodes...</p>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl">
              📈
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Hub</h2>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Enterprise Reporting Suite v4.0</p>
            </div>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <button 
              onClick={() => handleGenerate('Excel')}
              className="flex-1 lg:flex-none px-10 py-5 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
            >
              📥 XLS
            </button>
            <button 
              onClick={() => handleGenerate('PDF')}
              className="flex-1 lg:flex-none px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all"
            >
              🖨️ PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {reportOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setReportType(opt.id)}
              className={`p-8 rounded-[2rem] border-2 transition-all text-left group ${
                reportType === opt.id 
                ? 'border-blue-600 bg-blue-50/30' 
                : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform">{opt.icon}</div>
              <span className="font-black text-slate-900 text-xs uppercase tracking-widest block">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Quality Correlation Scatter Chart */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Fat vs SNF Quality Correlation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="fat" name="Fat" unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis type="number" dataKey="snf" name="SNF" unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Volume" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Batches" data={scatterData} fill="#3b82f6" fillOpacity={0.6} stroke="#2563eb" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Performance */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm xl:col-span-2">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Revenue Cycle Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyTrend}>
                <CartesianGrid stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="revenue" barSize={32} fill="#3b82f6" radius={[12, 12, 0, 0]} />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={6} dot={{ r: 8, fill: '#10b981', strokeWidth: 4, stroke: '#fff' }} />
                <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="8 8" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Supply Chain Health Index</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} axisLine={false} tick={false} />
                <Radar name="North Zone" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} strokeWidth={3} />
                <Radar name="South Zone" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={3} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: 'bold'}} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden xl:col-span-2">
          <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <h3 className="font-black text-slate-900 text-lg">Blockchain Audit Log</h3>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-white rounded-2xl border border-slate-200 text-[10px] font-black uppercase text-slate-500">Node Status: Secured</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-10 py-6">Transaction ID</th>
                  <th className="px-10 py-6">Source Node</th>
                  <th className="px-10 py-6">Volume Metric</th>
                  <th className="px-10 py-6">Validation Score</th>
                  <th className="px-10 py-6">Ledger Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-10 py-6 font-mono text-blue-600">TXN-00{i}-9X</td>
                    <td className="px-10 py-6 text-slate-900 font-black">Region North Hub #{i}</td>
                    <td className="px-10 py-6 text-slate-500">{(420 + i*15.5).toFixed(1)} L</td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-emerald-700">99.2% Verified</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 font-black text-slate-900">₹{(Math.random() * 50000).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPanel;
