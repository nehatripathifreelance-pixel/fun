
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  FileText, 
  TrendingUp, 
  Users, 
  Syringe,
  Clock,
  Calendar,
  IndianRupee,
  ChevronRight
} from 'lucide-react';

interface MilkPouringSlipProps {
  farmerName: string;
  farmerId: string;
  date: string;
  time: string;
  quantity: number;
  fat: number;
  snf: number;
  amount: number;
  temp?: number;
  vaccinationInfo?: string;
  onClose?: () => void;
}

const MilkPouringSlip: React.FC<MilkPouringSlipProps> = ({
  farmerName,
  farmerId,
  date,
  time,
  quantity,
  fat,
  snf,
  amount,
  temp = 5,
  vaccinationInfo = "NEXT VACCINATION DUE FOR COW 123 ON NOV 5. WEEKLY PAYMENT CREDITED.",
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 relative animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full flex items-center justify-center transition-all z-10"
          >
            ✕
          </button>
        )}

        {/* Header Section */}
        <div className="bg-white p-6 sm:p-8 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0">🐄</div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-blue-900 tracking-tighter uppercase leading-none">Milk Collection Center</h1>
                <p className="text-[10px] sm:text-sm font-black text-blue-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-2">Smart Dairy ERP System</p>
              </div>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-blue-50 rounded-full items-center justify-center">
              <div className="w-8 h-10 bg-blue-500 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white/20"></div>
              </div>
            </div>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-800 text-center uppercase tracking-widest border-y-2 border-slate-100 py-3 sm:py-4">
            Daily Milk Pouring Slip
          </h2>
        </div>

        {/* Info Grid */}
        <div className="p-6 sm:p-10">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 mb-8 sm:mb-12">
            {/* QR and Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left">
              <div className="p-3 sm:p-4 bg-white border-2 border-slate-100 rounded-2xl sm:rounded-3xl shadow-sm shrink-0">
                <QRCodeSVG value={`FARMER:${farmerId}|DATE:${date}|QTY:${quantity}`} size={100} />
              </div>
              <div className="space-y-4 w-full">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Farmer Name</p>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 truncate">{farmerName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-700 font-bold text-xs sm:text-base">
                      <Calendar size={14} className="text-blue-500 shrink-0" />
                      {date}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-700 font-bold text-xs sm:text-base">
                      <Clock size={14} className="text-blue-500 shrink-0" />
                      {time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Quantity */}
            <div className="bg-blue-600 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 opacity-80">Quantity</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tighter tabular-nums">{quantity}</span>
                <span className="text-sm sm:text-lg font-bold opacity-60 uppercase">Litre</span>
              </div>
            </div>

            {/* Fat */}
            <div className="bg-emerald-500 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 opacity-80">Fat</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tighter tabular-nums">{fat}%</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold mt-2 opacity-60">SNF: {snf}%</p>
            </div>

            {/* SNF / Temp */}
            <div className="bg-amber-400 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-white shadow-xl shadow-amber-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 opacity-80">SNF</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tighter tabular-nums">{snf}%</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="px-3 py-1 bg-red-500 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                  {temp}°C
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-emerald-600 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 opacity-80">Total Amount Payable</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black">₹</span>
                <span className="text-4xl sm:text-5xl font-black tracking-tighter tabular-nums">{amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            <button className="flex items-center justify-center gap-3 py-4 sm:py-5 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 group">
              <FileText size={18} className="shrink-0" />
              View Ledger
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
            <button className="flex items-center justify-center gap-3 py-4 sm:py-5 bg-emerald-500 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 group">
              <TrendingUp size={18} className="shrink-0" />
              Rate Card
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
            <button className="flex items-center justify-center gap-3 py-4 sm:py-5 bg-slate-100 text-slate-600 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-slate-200 transition-all group">
              <Users size={18} className="shrink-0" />
              Loan Request
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          </div>

          {/* Footer Info */}
          <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-[2rem] border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
              <Syringe size={20} sm:size={24} />
            </div>
            <p className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-widest leading-relaxed">
              {vaccinationInfo}
            </p>
          </div>
        </div>

        {/* Print Button Footer */}
        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <button 
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white border border-slate-200 text-slate-900 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
          >
            Print Slip
          </button>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
            Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilkPouringSlip;
