
import React, { useState, useEffect, useMemo } from 'react';
import { supportService, SupportRequest } from '../services/support-service';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Users, UserCheck, UserMinus, Star, ShoppingCart, 
  CreditCard, Truck, RefreshCw, Search, Filter, 
  ChevronRight, MessageSquare, Heart, Download, FileText, Printer
} from 'lucide-react';

const userGrowthData = [
  { name: 'Jan', active: 1200, inactive: 200 },
  { name: 'Feb', active: 1500, inactive: 250 },
  { name: 'Mar', active: 1800, inactive: 300 },
  { name: 'Apr', active: 2200, inactive: 350 },
  { name: 'May', active: 2800, inactive: 400 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

const CustomerInsights: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'orders' | 'feedback' | 'loyalty'>('users');
  const [requests, setRequests] = useState<SupportRequest[]>(supportService.getRequests());
  const [filterType, setFilterType] = useState<'All' | 'Feedback' | 'Complaint' | 'Support' | 'Request'>('All');

  useEffect(() => {
    const unsubscribe = supportService.subscribe(() => {
      setRequests(supportService.getRequests());
    });
    return unsubscribe;
  }, []);

  const filteredRequests = useMemo(() => {
    if (filterType === 'All') return requests;
    return requests.filter(r => r.type === filterType);
  }, [requests, filterType]);

  const customers = [
    { id: 'C001', name: 'Amit Sharma', email: 'amit@example.com', status: 'Active', orders: 12, lastOrder: '2 days ago', totalSpent: '₹4,200', frequency: 'Weekly' },
    { id: 'C002', name: 'Priya Patel', email: 'priya@example.com', status: 'Active', orders: 25, lastOrder: 'Today', totalSpent: '₹8,500', frequency: 'Daily' },
    { id: 'C003', name: 'Suresh Raina', email: 'suresh@example.com', status: 'Inactive', orders: 2, lastOrder: '3 months ago', totalSpent: '₹450', frequency: 'Occasional' },
    { id: 'C004', name: 'Anjali Gupta', email: 'anjali@example.com', status: 'Active', orders: 18, lastOrder: '1 week ago', totalSpent: '₹6,100', frequency: 'Weekly' },
  ];

  const recentOrders = [
    { id: 'ORD-101', customer: 'Priya Patel', product: 'Fresh Milk (2L), Paneer (500g)', status: 'Dispatched', payment: 'Paid', amount: '₹320' },
    { id: 'ORD-102', customer: 'Amit Sharma', product: 'Curd (1kg), Butter (200g)', status: 'Ordered', payment: 'Pending', amount: '₹210' },
    { id: 'ORD-103', customer: 'Anjali Gupta', product: 'Ghee (1L)', status: 'Reached', payment: 'Paid', amount: '₹650' },
  ];

  const feedbackData = [
    { id: 1, user: 'Priya Patel', rating: 5, comment: 'Excellent quality milk, delivered right on time!', date: 'Today' },
    { id: 2, user: 'Amit Sharma', rating: 4, comment: 'Good service, but the app could be faster.', date: 'Yesterday' },
    { id: 3, user: 'Rahul V.', rating: 3, comment: 'Product was good, but delivery was delayed by 30 mins.', date: '2 days ago' },
  ];

  const frequentReorderers = [
    { name: 'Priya Patel', frequency: 'Daily', avgOrder: '₹250', loyaltyPoints: 1250 },
    { name: 'Anjali Gupta', frequency: 'Weekly', avgOrder: '₹800', loyaltyPoints: 840 },
    { name: 'Vikram Singh', frequency: 'Daily', avgOrder: '₹120', loyaltyPoints: 2100 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl shadow-emerald-200">
            👥
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Customer Insights</h2>
            <p className="text-slate-500 font-medium">Monitor user behavior, orders, and satisfaction</p>
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
            Export Customer Data
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Users</p>
          <p className="text-2xl font-black text-slate-800">2,840</p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <UserCheck size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-full">85% Ratio</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Users</p>
          <p className="text-2xl font-black text-slate-800">2,414</p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
              <Star size={24} />
            </div>
            <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-full">4.8 Avg</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Customer Rating</p>
          <p className="text-2xl font-black text-slate-800">1,250 Reviews</p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <RefreshCw size={24} />
            </div>
            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">62% Rate</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Retention Rate</p>
          <p className="text-2xl font-black text-slate-800">High Loyalty</p>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'users', label: 'User Directory', icon: <Users size={14} /> },
          { id: 'orders', label: 'Order Tracking', icon: <ShoppingCart size={14} /> },
          { id: 'feedback', label: 'Customer Feedback', icon: <MessageSquare size={14} /> },
          { id: 'loyalty', label: 'Loyalty & Retention', icon: <Heart size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeSubTab === tab.id 
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
          {activeSubTab === 'users' && (
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-bottom border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">User Management</h3>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search users..." 
                      className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-y border-slate-100">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Orders</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequency</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Spent</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-900">{customer.name}</p>
                          <p className="text-xs text-slate-500">{customer.email}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-900">{customer.orders}</p>
                          <p className="text-[10px] text-slate-400">Last: {customer.lastOrder}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xs font-bold text-slate-600">{customer.frequency}</span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-black text-slate-900">{customer.totalSpent}</p>
                        </td>
                        <td className="px-8 py-6">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <ChevronRight size={16} className="text-slate-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubTab === 'orders' && (
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl ${
                      order.status === 'Reached' ? 'bg-emerald-50 text-emerald-600' : 
                      order.status === 'Dispatched' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {order.status === 'Reached' ? <Truck /> : order.status === 'Dispatched' ? <Truck /> : <ShoppingCart />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-black text-slate-900">{order.id}</h4>
                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                          order.payment === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {order.payment}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 mb-1">Customer: {order.customer}</p>
                      <p className="text-[10px] text-slate-400">{order.product}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'Reached' ? 'bg-emerald-500 text-white' : 
                      order.status === 'Dispatched' ? 'bg-blue-500 text-white' : 'bg-slate-400 text-white'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-lg font-black text-slate-900">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'feedback' && (
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Customer Support & Feedback</h3>
                <div className="flex gap-2">
                  {['All', 'Feedback', 'Complaint', 'Support', 'Request'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setFilterType(type as any)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        filterType === type 
                          ? 'bg-slate-900 text-white shadow-lg' 
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400 font-medium italic">No {filterType === 'All' ? '' : filterType.toLowerCase()} requests found.</p>
                  </div>
                ) : (
                  filteredRequests.map((item) => (
                    <div key={item.id} className="flex gap-6 pb-8 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl shrink-0">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="text-sm font-black text-slate-900">{item.user}</h4>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                              item.type === 'Complaint' ? 'bg-red-50 text-red-600' :
                              item.type === 'Feedback' ? 'bg-emerald-50 text-emerald-600' :
                              item.type === 'Support' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed italic mb-4">"{item.message}"</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              item.status === 'Resolved' ? 'bg-emerald-500' :
                              item.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'
                            }`}></span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.status}</span>
                          </div>
                          <div className="flex gap-2">
                            {item.status !== 'Resolved' && (
                              <button 
                                onClick={() => supportService.updateStatus(item.id, 'Resolved')}
                                className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100"
                              >
                                Resolve
                              </button>
                            )}
                            {item.status === 'Pending' && (
                              <button 
                                onClick={() => supportService.updateStatus(item.id, 'In Progress')}
                                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-100"
                              >
                                In Progress
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeSubTab === 'loyalty' && (
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-bottom border-slate-100">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Frequent Reorderers (Loyalty)</h3>
                <p className="text-xs text-slate-500 font-medium">Customers with high purchase frequency and loyalty points</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-y border-slate-100">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequency</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Order</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Loyalty Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {frequentReorderers.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-900">{item.name}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {item.frequency}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-black text-slate-900">{item.avgOrder}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                              <Heart size={14} fill="currentColor" />
                            </div>
                            <p className="text-sm font-black text-slate-900">{item.loyaltyPoints}</p>
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

        {/* Sidebar Metrics */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-6 relative z-10">User Growth</h3>
            <div className="h-48 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="inactive" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex justify-between items-center relative z-10">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active</p>
                <p className="text-xl font-black">2.4k</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Inactive</p>
                <p className="text-xl font-black">426</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Retention Insights</h3>
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Daily Reorder Rate</p>
                <p className="text-2xl font-black text-emerald-900">62.4%</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">↑ 4.2% from last month</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-1">Avg. Customer Lifetime</p>
                <p className="text-2xl font-black text-blue-900">14.2 Mo</p>
                <p className="text-[10px] text-blue-600 font-bold mt-1">Steady growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;
