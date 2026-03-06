
import React, { useState } from 'react';
import MilkPouringSlip from '../components/MilkPouringSlip';
import { 
  Users, 
  CreditCard, 
  Wallet, 
  LifeBuoy, 
  ShieldCheck, 
  Stethoscope, 
  Wheat, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Filter,
  Download,
  FileText,
  Printer
} from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  location: string;
  registrationDate: string;
  walletBalance: string;
  totalContribution: string;
  dailyYield: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

interface Transaction {
  id: string;
  farmerName: string;
  amount: string;
  date: string;
  type: 'Payment' | 'Deduction' | 'Bonus';
  status: 'Success' | 'Pending' | 'Failed';
}

interface SupportQuery {
  id: string;
  farmerName: string;
  category: 'Insurance' | 'Veterinary' | 'Feed' | 'Order';
  subject: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
}

interface VetDoctor {
  id: string;
  name: string;
  specialization: string;
  contact: string;
  availability: 'Available' | 'On Call' | 'Unavailable';
}

interface InsuranceClaim {
  id: string;
  farmerName: string;
  cattleTag: string;
  amount: string;
  date: string;
  status: 'Approved' | 'Processing' | 'Rejected';
}

interface MilkRate {
  id: string;
  fat: number;
  snf: number;
  rate: number;
  effectiveDate: string;
}

const FarmerOperations: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'farmers' | 'transactions' | 'support' | 'veterinary' | 'insurance' | 'rates' | 'reports'>('farmers');
  const [reportType, setReportType] = useState<'due' | 'payment'>('due');
  const [selectedFarmerForSlip, setSelectedFarmerForSlip] = useState<Farmer | null>(null);
  
  const [farmers] = useState<Farmer[]>([
    { id: 'F001', name: 'Ramesh Chaudhary', location: 'Shimla', registrationDate: '2024-01-15', walletBalance: '₹4,500', totalContribution: '1,200L', dailyYield: '18.5L', status: 'Active' },
    { id: 'F002', name: 'Suresh Singh', location: 'Solan', registrationDate: '2024-02-10', walletBalance: '₹2,800', totalContribution: '850L', dailyYield: '12.0L', status: 'Active' },
    { id: 'F003', name: 'Anita Devi', location: 'Kufri', registrationDate: '2024-03-05', walletBalance: '₹1,200', totalContribution: '450L', dailyYield: '15.2L', status: 'Pending' },
  ]);

  const [transactions] = useState<Transaction[]>([
    { id: 'TXN101', farmerName: 'Ramesh Chaudhary', amount: '₹1,200', date: '2024-03-20', type: 'Payment', status: 'Success' },
    { id: 'TXN102', farmerName: 'Suresh Singh', amount: '₹800', date: '2024-03-19', type: 'Payment', status: 'Pending' },
    { id: 'TXN103', farmerName: 'Anita Devi', amount: '₹150', date: '2024-03-18', type: 'Deduction', status: 'Success' },
  ]);

  const [queries] = useState<SupportQuery[]>([
    { id: 'Q1', farmerName: 'Ramesh Chaudhary', category: 'Insurance', subject: 'Claim for TAG-1042', date: '2024-03-21', status: 'In Progress', priority: 'High' },
    { id: 'Q2', farmerName: 'Suresh Singh', category: 'Veterinary', subject: 'Cattle health checkup', date: '2024-03-20', status: 'Open', priority: 'Medium' },
    { id: 'Q3', farmerName: 'Anita Devi', category: 'Feed', subject: 'Order for 50kg stock', date: '2024-03-19', status: 'Resolved', priority: 'Low' },
  ]);

  const [vets, setVets] = useState<VetDoctor[]>([
    { id: 'V1', name: 'Dr. Khanna', specialization: 'Bovine Specialist', contact: '+91 98765 43210', availability: 'Available' },
    { id: 'V2', name: 'Dr. Sharma', specialization: 'General Vet', contact: '+91 98765 43211', availability: 'On Call' },
  ]);

  const [claims] = useState<InsuranceClaim[]>([
    { id: 'C1', farmerName: 'Ramesh Chaudhary', cattleTag: 'TAG-1042', amount: '₹45,000', date: '2024-03-15', status: 'Processing' },
    { id: 'C2', farmerName: 'Suresh Singh', cattleTag: 'TAG-1088', amount: '₹35,000', date: '2024-03-10', status: 'Approved' },
  ]);

  const [milkRates, setMilkRates] = useState<MilkRate[]>([
    { id: 'R1', fat: 3.5, snf: 8.5, rate: 42.50, effectiveDate: '2024-03-22' },
    { id: 'R2', fat: 4.0, snf: 8.5, rate: 45.00, effectiveDate: '2024-03-22' },
    { id: 'R3', fat: 4.5, snf: 8.5, rate: 48.50, effectiveDate: '2024-03-22' },
    { id: 'R4', fat: 3.5, snf: 9.0, rate: 44.00, effectiveDate: '2024-03-22' },
    { id: 'R5', fat: 4.0, snf: 9.0, rate: 47.50, effectiveDate: '2024-03-22' },
  ]);

  const [showAddRate, setShowAddRate] = useState(false);
  const [newRate, setNewRate] = useState({ fat: 0, snf: 0, rate: 0, effectiveDate: new Date().toISOString().split('T')[0] });
  const [editingRateId, setEditingRateId] = useState<string | null>(null);

  const handleAddRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRateId) {
      setMilkRates(milkRates.map(r => r.id === editingRateId ? { ...r, ...newRate } : r));
      setEditingRateId(null);
    } else {
      const rate: MilkRate = {
        id: `R${milkRates.length + 1}`,
        ...newRate
      };
      setMilkRates([...milkRates, rate]);
    }
    setNewRate({ fat: 0, snf: 0, rate: 0, effectiveDate: new Date().toISOString().split('T')[0] });
    setShowAddRate(false);
  };

  const startEditRate = (rate: MilkRate) => {
    setNewRate({ fat: rate.fat, snf: rate.snf, rate: rate.rate, effectiveDate: rate.effectiveDate });
    setEditingRateId(rate.id);
    setShowAddRate(true);
  };

  const deleteRate = (id: string) => {
    setMilkRates(milkRates.filter(r => r.id !== id));
  };

  const [showAddVet, setShowAddVet] = useState(false);
  const [newVet, setNewVet] = useState({ name: '', specialization: '', contact: '' });

  const handleAddVet = (e: React.FormEvent) => {
    e.preventDefault();
    const vet: VetDoctor = {
      id: `V${vets.length + 1}`,
      ...newVet,
      availability: 'Available'
    };
    setVets([...vets, vet]);
    setNewVet({ name: '', specialization: '', contact: '' });
    setShowAddVet(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl shadow-blue-200">
            👨‍🌾
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Farmer Operations</h2>
            <p className="text-slate-500 font-medium">Manage farmer registry, contributions, and services</p>
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
            Download Farmer Report
          </button>
        </div>
      </div>

      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Farmers</p>
              <p className="text-2xl font-black text-slate-900">{farmers.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold">
            <TrendingUp size={12} />
            <span>+12 this month</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Daily Yield</p>
              <p className="text-2xl font-black text-slate-900">15.2L</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold">
            <TrendingUp size={12} />
            <span>+5% vs last week</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Queries</p>
              <p className="text-2xl font-black text-slate-900">{queries.filter(q => q.status !== 'Resolved').length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-orange-500 text-[10px] font-bold">
            <Clock size={12} />
            <span>4 High Priority</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Claims</p>
              <p className="text-2xl font-black text-slate-900">{claims.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-500 text-[10px] font-bold">
            <CheckCircle2 size={12} />
            <span>₹80k in processing</span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex flex-wrap gap-3 p-2 bg-slate-100 rounded-[2rem] w-fit">
        {[
          { id: 'farmers', label: 'Farmers', icon: Users },
          { id: 'transactions', label: 'Wallet & TXN', icon: Wallet },
          { id: 'support', label: 'Support Queries', icon: LifeBuoy },
          { id: 'veterinary', label: 'Vet Services', icon: Stethoscope },
          { id: 'insurance', label: 'Insurance', icon: ShieldCheck },
          { id: 'rates', label: 'Milk Rate Chart', icon: TrendingUp },
          { id: 'reports', label: 'Reports', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all ${
              activeSubTab === tab.id 
                ? 'bg-white text-slate-900 shadow-lg' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm min-h-[400px]">
        {activeSubTab === 'farmers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800">Farmer Registry & Contributions</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="Search farmers..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" />
                </div>
                <button className="p-2 bg-slate-50 text-slate-500 rounded-xl border border-slate-100"><Filter size={14} /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Farmer</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Wallet</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Contribution</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Yield</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {farmers.map(f => (
                    <tr key={f.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-black text-slate-500 text-[10px]">{f.id}</div>
                          <span className="text-sm font-bold text-slate-700">{f.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-xs font-bold text-slate-500">{f.location}</td>
                      <td className="py-4 text-xs font-black text-slate-800">{f.walletBalance}</td>
                      <td className="py-4 text-xs font-black text-blue-600">{f.totalContribution}</td>
                      <td className="py-4 text-xs font-black text-emerald-600">{f.dailyYield}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          f.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                          f.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => setSelectedFarmerForSlip(f)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                        >
                          View Slip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedFarmerForSlip && (
              <MilkPouringSlip 
                farmerName={selectedFarmerForSlip.name}
                farmerId={selectedFarmerForSlip.id}
                date={new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                time="07:30 AM"
                quantity={parseFloat(selectedFarmerForSlip.dailyYield)}
                fat={4.8}
                snf={8.7}
                amount={647.50}
                onClose={() => setSelectedFarmerForSlip(null)}
              />
            )}
          </div>
        )}

        {activeSubTab === 'transactions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 mb-6">Transaction History & Wallet Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">TXN ID</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Farmer</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-xs font-black text-slate-400">{t.id}</td>
                      <td className="py-4 text-sm font-bold text-slate-700">{t.farmerName}</td>
                      <td className="py-4 text-sm font-black text-slate-900">{t.amount}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          t.type === 'Payment' ? 'bg-blue-50 text-blue-600' : 
                          t.type === 'Bonus' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="py-4 text-xs font-bold text-slate-500">{t.date}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {t.status === 'Success' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Clock size={14} className="text-orange-500" />}
                          <span className="text-xs font-bold text-slate-600">{t.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'support' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 mb-6">Farmer Support Queries</h3>
            <div className="grid grid-cols-1 gap-4">
              {queries.map(q => (
                <div key={q.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                      q.category === 'Insurance' ? 'bg-blue-100 text-blue-600' :
                      q.category === 'Veterinary' ? 'bg-emerald-100 text-emerald-600' :
                      q.category === 'Feed' ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {q.category === 'Insurance' ? <ShieldCheck size={20} /> :
                       q.category === 'Veterinary' ? <Stethoscope size={20} /> :
                       q.category === 'Feed' ? <Wheat size={20} /> : <ShoppingCart size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-slate-800">{q.farmerName}</span>
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-500 rounded-full text-[8px] font-black uppercase tracking-widest">{q.category}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-600">{q.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Raised On</p>
                      <p className="text-xs font-bold text-slate-700">{q.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        q.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {q.priority}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        q.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {q.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'veterinary' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800">Veterinary Doctors & Services</h3>
              <button 
                onClick={() => setShowAddVet(!showAddVet)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
              >
                <Plus size={14} /> Add New Doctor
              </button>
            </div>

            {showAddVet && (
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 animate-in slide-in-from-top-4 duration-300">
                <form onSubmit={handleAddVet} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Doctor Name</label>
                    <input 
                      type="text" 
                      value={newVet.name}
                      onChange={e => setNewVet({...newVet, name: e.target.value})}
                      placeholder="e.g. Dr. Khanna"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Specialization</label>
                    <input 
                      type="text" 
                      value={newVet.specialization}
                      onChange={e => setNewVet({...newVet, specialization: e.target.value})}
                      placeholder="e.g. Bovine Specialist"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Contact</label>
                    <input 
                      type="text" 
                      value={newVet.contact}
                      onChange={e => setNewVet({...newVet, contact: e.target.value})}
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="md:col-span-3 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
                  >
                    Register Doctor
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vets.map(vet => (
                <div key={vet.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      👨‍⚕️
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      vet.availability === 'Available' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {vet.availability}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mb-1">{vet.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{vet.specialization}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <CreditCard size={14} className="text-blue-500" />
                    {vet.contact}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200/50 flex justify-between items-center">
                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Assign Task</button>
                    <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'insurance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 mb-6">Insurance Claims Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Claim ID</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Farmer</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cattle Tag</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Claim Amount</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {claims.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-xs font-black text-slate-400">{c.id}</td>
                      <td className="py-4 text-sm font-bold text-slate-700">{c.farmerName}</td>
                      <td className="py-4 text-xs font-black text-blue-600">{c.cattleTag}</td>
                      <td className="py-4 text-sm font-black text-slate-900">{c.amount}</td>
                      <td className="py-4 text-xs font-bold text-slate-500">{c.date}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          c.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                          c.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'reports' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Financial Reports</h3>
                <p className="text-slate-500 font-medium">Generate and view farmer dues and payment history</p>
              </div>
              <div className="flex gap-3 p-1.5 bg-slate-100 rounded-2xl">
                <button 
                  onClick={() => setReportType('due')}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    reportType === 'due' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500'
                  }`}
                >
                  Due Report
                </button>
                <button 
                  onClick={() => setReportType('payment')}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    reportType === 'payment' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500'
                  }`}
                >
                  Payment Report
                </button>
              </div>
            </div>

            {reportType === 'due' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Total Outstanding Dues</p>
                    <p className="text-3xl font-black text-orange-900">₹1,42,500</p>
                    <p className="text-xs font-bold text-orange-700 mt-2">Across 42 Farmers</p>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Next Payout Date</p>
                    <p className="text-3xl font-black text-blue-900">25 Mar 2024</p>
                    <p className="text-xs font-bold text-blue-700 mt-2">Weekly Cycle</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Milk Procured (Unpaid)</p>
                    <p className="text-3xl font-black text-emerald-900">3,450 L</p>
                    <p className="text-xs font-bold text-emerald-700 mt-2">Current Period</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Farmer</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Milk (L)</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Amt</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Deductions</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Due</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { name: 'Ramesh Chaudhary', milk: '142.5', gross: '6,120', ded: '450', net: '5,670' },
                        { name: 'Suresh Singh', milk: '98.2', gross: '4,220', ded: '200', net: '4,020' },
                        { name: 'Anita Devi', milk: '112.0', gross: '4,816', ded: '150', net: '4,666' },
                        { name: 'Mahesh Kumar', milk: '85.4', gross: '3,672', ded: '0', net: '3,672' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 text-sm font-bold text-slate-700">{row.name}</td>
                          <td className="py-4 text-sm font-black text-slate-900">{row.milk} L</td>
                          <td className="py-4 text-sm font-bold text-slate-600">₹{row.gross}</td>
                          <td className="py-4 text-sm font-bold text-red-500">-₹{row.ded}</td>
                          <td className="py-4 text-sm font-black text-emerald-600">₹{row.net}</td>
                          <td className="py-4 text-right">
                            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                              Process Payment
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Total Paid (This Month)</p>
                    <p className="text-3xl font-black text-emerald-900">₹8,45,200</p>
                    <p className="text-xs font-bold text-emerald-700 mt-2">Successfully Disbursed</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Approvals</p>
                    <p className="text-3xl font-black text-slate-900">₹24,000</p>
                    <p className="text-xs font-bold text-slate-500 mt-2">Bank Verification</p>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Avg Payout / Farmer</p>
                    <p className="text-3xl font-black text-indigo-900">₹12,400</p>
                    <p className="text-xs font-bold text-indigo-700 mt-2">Monthly Average</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment ID</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Farmer</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { id: 'PAY-8821', name: 'Ramesh Chaudhary', amt: '4,280', date: '08 Mar 2024', method: 'Bank Transfer', status: 'Success' },
                        { id: 'PAY-8822', name: 'Suresh Singh', amt: '3,110', date: '08 Mar 2024', method: 'UPI', status: 'Success' },
                        { id: 'PAY-8823', name: 'Anita Devi', amt: '2,850', date: '01 Mar 2024', method: 'Bank Transfer', status: 'Success' },
                        { id: 'PAY-8824', name: 'Mahesh Kumar', amt: '5,200', date: '01 Mar 2024', method: 'Cash', status: 'Success' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 text-xs font-black text-slate-400">{row.id}</td>
                          <td className="py-4 text-sm font-bold text-slate-700">{row.name}</td>
                          <td className="py-4 text-sm font-black text-slate-900">₹{row.amt}</td>
                          <td className="py-4 text-xs font-bold text-slate-500">{row.date}</td>
                          <td className="py-4 text-xs font-bold text-slate-500">{row.method}</td>
                          <td className="py-4">
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-widest">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerOperations;
