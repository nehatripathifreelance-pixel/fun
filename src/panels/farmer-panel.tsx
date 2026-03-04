
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Milk, 
  Beef, 
  ClipboardList, 
  TrendingUp, 
  Bell, 
  Settings, 
  Plus, 
  ChevronRight, 
  History, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MessageSquare,
  FileText,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  Wheat
} from 'lucide-react';

type FarmerTab = 'home' | 'cattle' | 'reports' | 'rates' | 'services' | 'alerts';

const FarmerPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'id' | 'otp'>('id');
  const [activeTab, setActiveTab] = useState<FarmerTab>('home');
  const [reportView, setReportView] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState<any>(null);
  const [showRateCard, setShowRateCard] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [farmerId, setFarmerId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Form States
  const [milkVolume, setMilkVolume] = useState('');
  const [fatPercent, setFatPercent] = useState('4.2');
  const [snfPercent, setSnfPercent] = useState('8.5');
  const [temperature, setTemperature] = useState('4.0');
  const [shift, setShift] = useState<'Morning' | 'Evening'>('Morning');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAddCattleModalOpen, setIsAddCattleModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<'feed' | 'vet' | 'insurance' | 'loan' | null>(null);

  // Auto-calculation logic
  const baseRate = 38.50;
  const fatBonus = (parseFloat(fatPercent) - 3.5) * 2.5; // Example: ₹2.5 per 0.1% fat above 3.5%
  const snfBonus = (parseFloat(snfPercent) - 8.5) * 1.5; // Example: ₹1.5 per 0.1% snf above 8.5%
  const ratePerLitre = baseRate + (fatBonus > 0 ? fatBonus : 0) + (snfBonus > 0 ? snfBonus : 0);
  const totalPayment = parseFloat(milkVolume || '0') * ratePerLitre;
  
  // Cattle Registry State
  const [cattleList, setCattleList] = useState([
    {
      tag: 'TAG-1042',
      breed: 'JERSEY',
      age: '4 YRS',
      lactation: '2',
      yieldPerDay: '18.5',
      healthRecord: 'Excellent',
      vaccinationDates: '2024-05-12, 2024-11-15',
      aiCalvingRecord: 'Calved: May 2024',
      status: 'HEALTHY',
      img: 'https://picsum.photos/seed/cow1/400/400',
    },
    {
      tag: 'TAG-1088',
      breed: 'MURRAH BUFFALO',
      age: '5 YRS',
      lactation: '3',
      yieldPerDay: '12.0',
      healthRecord: 'Under Observation',
      vaccinationDates: '2024-04-20, 2024-10-25',
      aiCalvingRecord: 'AI: Sep 2024',
      status: 'SICK',
      img: 'https://picsum.photos/seed/cow2/400/400',
    }
  ]);

  // New Cattle Form State
  const [newCattle, setNewCattle] = useState({
    tag: '',
    breed: 'JERSEY',
    age: '',
    lactation: '',
    yieldPerDay: '',
    healthRecord: 'Healthy',
    vaccinationDates: '',
    aiCalvingRecord: ''
  });

  const handleAddCattle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCattle.tag || !newCattle.age) return;

    const cattleToAdd = {
      ...newCattle,
      tag: newCattle.tag.toUpperCase(),
      lactation: newCattle.lactation || '1',
      status: 'HEALTHY' as const,
      img: `https://picsum.photos/seed/${newCattle.tag}/400/400`,
    };

    setCattleList([cattleToAdd, ...cattleList]);
    setIsAddCattleModalOpen(false);
    setNewCattle({ 
      tag: '', breed: 'JERSEY', age: '', lactation: '', 
      yieldPerDay: '', healthRecord: 'Healthy', 
      vaccinationDates: '', aiCalvingRecord: '' 
    });
  };

  const handleLogin = () => {
    setLoginError('');
    if (loginMethod === 'id') {
      if (farmerId.trim().length >= 5) {
        setIsLoggedIn(true);
      } else {
        setLoginError('कृपया सही किसान आईडी दर्ज करें (Please enter a valid Farmer ID)');
      }
    } else {
      if (mobileNumber.length === 10 && otp.length === 6) {
        setIsLoggedIn(true);
      } else {
        setLoginError('कृपया सही मोबाइल नंबर और ओटीपी दर्ज करें (Please enter valid Mobile & OTP)');
      }
    }
  };

  const handleSubmitMilk = () => {
    if (!milkVolume || parseFloat(milkVolume) <= 0) return;
    setIsSubmitting(true);
    
    // Create the slip data
    const slipData = {
      date: `${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} ${shift === 'Morning' ? 'AM' : 'PM'}`,
      vol: milkVolume,
      fat: fatPercent || '0.0',
      snf: snfPercent || '0.0',
      rate: ratePerLitre.toFixed(2),
      total: totalPayment.toFixed(2)
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setSelectedSlip(slipData); // Show the slip modal
      setMilkVolume('');
      setFatPercent('3.5');
      setSnfPercent('8.5');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  // --- LOGIN / REGISTER SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] animate-fadeIn p-4">
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 w-full max-w-lg relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="text-center mb-12 relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-8 shadow-2xl shadow-blue-500/30 transform -rotate-3 transition-transform hover:rotate-0">🚜</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{authMode === 'login' ? 'Farmer Portal' : 'Farmer Registration'}</h2>
            <p className="text-slate-500 font-black mt-3 text-lg uppercase tracking-widest">{authMode === 'login' ? 'किसान पोर्टल' : 'किसान पंजीकरण'}</p>
          </div>

          {authMode === 'login' ? (
            <>
              <div className="flex p-2 bg-slate-50 rounded-3xl border border-slate-100 mb-10 relative z-10">
                <button 
                  onClick={() => { setLoginMethod('id'); setLoginError(''); }}
                  className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${loginMethod === 'id' ? 'bg-white shadow-xl text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Farmer ID / आईडी
                </button>
                <button 
                  onClick={() => { setLoginMethod('otp'); setLoginError(''); }}
                  className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${loginMethod === 'otp' ? 'bg-white shadow-xl text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Mobile OTP / ओटीपी
                </button>
              </div>

              <div className="space-y-8 relative z-10">
                {loginError && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-black text-center animate-shake">
                    {loginError}
                  </div>
                )}
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">
                    {loginMethod === 'id' ? 'Farmer ID / किसान आईडी' : 'Mobile Number / मोबाइल नंबर'}
                  </label>
                  <input 
                    type="text" 
                    value={loginMethod === 'id' ? farmerId : mobileNumber}
                    onChange={(e) => loginMethod === 'id' ? setFarmerId(e.target.value) : setMobileNumber(e.target.value)}
                    placeholder={loginMethod === 'id' ? 'e.g. FRM-782390' : '10-digit number'}
                    className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 text-lg shadow-inner placeholder:text-slate-300"
                  />
                </div>
                {loginMethod === 'otp' && (
                   <div className="animate-slideInDown">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">OTP / ओटीपी (6-Digits)</label>
                    <input 
                      type="text" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="······" 
                      className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-center text-3xl tracking-[0.8em] shadow-inner" 
                    />
                  </div>
                )}
                <button 
                  onClick={handleLogin}
                  className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-200 transition-all active:scale-95 group"
                >
                  Login / लॉगिन करें <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </button>
              </div>
              <div className="text-center mt-10 space-y-4">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors">Forgot Credentials? / पासवर्ड भूल गए?</p>
                <button 
                  onClick={() => setAuthMode('register')}
                  className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
                >
                  New Farmer? Register Here / नया पंजीकरण
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6 relative z-10 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Full Name / पूरा नाम</label>
                <input type="text" placeholder="e.g. Ramesh Chand" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Mobile Number / मोबाइल</label>
                <input type="text" placeholder="10-digit number" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Aadhaar No. / आधार</label>
                  <input type="text" placeholder="12-digit number" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">PAN Card / पैन</label>
                  <input type="text" placeholder="ABCDE1234F" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Bank Account No. / बैंक खाता</label>
                <input type="text" placeholder="Account Number" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">IFSC Code / आईएफएससी</label>
                <input type="text" placeholder="HDFC0001234" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner" />
              </div>
              <button 
                onClick={() => { setAuthMode('login'); setIsLoggedIn(true); }}
                className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/20 transition-all active:scale-95"
              >
                Complete KYC & Register / पंजीकरण पूरा करें
              </button>
              <button 
                onClick={() => setAuthMode('login')}
                className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Back to Login / वापस लॉगिन करें
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- MAIN PORTAL CONTENT ---
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24 animate-fadeIn">
      {/* Top Navbar / Profile Segment */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[1.75rem] bg-slate-900 flex items-center justify-center text-4xl shadow-xl shadow-slate-200 overflow-hidden">
             <img src="https://picsum.photos/100/100?farmer" alt="Farmer" className="w-full h-full object-cover opacity-80" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Ramesh Chand Chaudhary</h3>
            <div className="flex items-center gap-3 mt-1">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">ID: FRM-782390</span>
               <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">Unit: North #12</span>
               <button 
                 onClick={() => setShowQRCode(true)}
                 className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
               >
                 <span>QR Code</span>
                 <QRCodeSVG value="FRM-782390" size={12} />
               </button>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-sm rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-slideInUp">
              <div className="p-10 text-center">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Farmer ID QR Code</h3>
                  <button onClick={() => setShowQRCode(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">✕</button>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] inline-block mb-8 border border-slate-100 shadow-inner">
                  <QRCodeSVG value="FRM-782390" size={200} level="H" includeMargin={true} />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-slate-900">FRM-782390</p>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Ramesh Chand Chaudhary</p>
                </div>
                <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest mt-10 shadow-xl">Download ID Card / डाउनलोड करें</button>
              </div>
            </div>
          </div>
        )}

        {/* Milk Slip Modal */}
        {selectedSlip && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-slideInUp print:shadow-none print:border-none print:rounded-none">
              <div className="p-10" id="milk-slip-content">
                <div className="flex justify-between items-start mb-8 print:hidden">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Milk Collection Slip</h3>
                  <button onClick={() => setSelectedSlip(null)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">✕</button>
                </div>
                
                <div className="text-center mb-8 border-b border-slate-100 pb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg mx-auto mb-4">SD</div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">SMART DAIRY ENTERPRISE</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Collection Center #12 • North Zone</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Farmer Name</p>
                    <p className="text-sm font-black text-slate-900">Ramesh Chand Chaudhary</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Farmer ID</p>
                    <p className="text-sm font-black text-slate-900">FRM-782390</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date & Shift</p>
                    <p className="text-sm font-black text-slate-900">{selectedSlip.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Slip No.</p>
                    <p className="text-sm font-black text-slate-900">#{Math.floor(Math.random() * 900000) + 100000}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 mb-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Milk Volume</span>
                      <span className="text-lg font-black text-slate-900">{selectedSlip.vol} L</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Fat (%)</span>
                      <span className="text-lg font-black text-slate-900">{selectedSlip.fat}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest">SNF (%)</span>
                      <span className="text-lg font-black text-slate-900">{selectedSlip.snf}%</span>
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Rate (₹/L)</span>
                      <span className="text-lg font-black text-blue-600">₹{selectedSlip.rate}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount Payable</p>
                  <p className="text-5xl font-black text-slate-900 tracking-tighter">₹{selectedSlip.total}</p>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-2">Auto-Calculated via ERP v4.0</p>
                </div>

                <div className="flex gap-4 print:hidden">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Print Slip</span>
                    <span className="text-lg">⎙</span>
                  </button>
                  <button 
                    onClick={() => {
                      const content = document.getElementById('milk-slip-content')?.innerText;
                      const blob = new Blob([content || ''], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Milk_Slip_${selectedSlip.date.replace(' ', '_')}.txt`;
                      a.click();
                    }}
                    className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Download</span>
                    <span className="text-lg">↓</span>
                  </button>
                </div>
                
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center mt-8 print:block hidden">
                  This is a computer generated slip. No signature required.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setShowRateCard(true)}
             className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-slate-100"
           >
             Rate Card / रेट कार्ड
           </button>
           <button 
             onClick={() => setShowSupport(true)}
             className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-slate-200"
           >
             <MessageSquare size={20} />
           </button>
           <button onClick={() => setIsLoggedIn(false)} className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center font-bold hover:bg-red-100 transition-colors shadow-sm">
             🚪
           </button>
        </div>
      </div>

      {/* Rate Card Modal */}
      {showRateCard && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-slideInUp">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Milk Rate Chart / रेट चार्ट</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Effective from: 01 May 2024</p>
                </div>
                <button onClick={() => setShowRateCard(false)} className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors">✕</button>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-100">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fat %</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SNF %</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate (₹/L)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { fat: '3.5', snf: '8.5', rate: '38.50' },
                      { fat: '4.0', snf: '8.5', rate: '42.00' },
                      { fat: '4.5', snf: '8.5', rate: '45.50' },
                      { fat: '5.0', snf: '8.5', rate: '49.00' },
                      { fat: '6.0', snf: '9.0', rate: '58.00' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-black text-slate-800">{row.fat}</td>
                        <td className="px-6 py-4 font-black text-slate-800">{row.snf}</td>
                        <td className="px-6 py-4 font-black text-blue-600">{row.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase leading-relaxed">
                * Rates are subject to change based on market conditions. Quality bonuses apply for SNF &gt; 8.5%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-slideInUp">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Support & Queries / सहायता</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">We are here to help you 24/7</p>
                </div>
                <button onClick={() => setShowSupport(false)} className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors">✕</button>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4 hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">📞</div>
                  <div>
                    <p className="font-black text-slate-800 text-sm">Call Helpline</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">1800-123-4567</p>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4 hover:border-green-200 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">💬</div>
                  <div>
                    <p className="font-black text-slate-800 text-sm">WhatsApp Support</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">+91 98765 43210</p>
                  </div>
                </div>
                <div className="pt-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Message / संदेश</label>
                  <textarea 
                    placeholder="Type your query here..." 
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner h-32 resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-200 transition-all active:scale-95">
                  Send Message / संदेश भेजें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Matrix */}
      <div className="flex flex-nowrap gap-3 p-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
        {[
          { id: 'home', label: 'Daily Pouring', icon: '🥛' },
          { id: 'cattle', label: 'Cattle Registry', icon: '🐄' },
          { id: 'reports', label: 'Ledger / रिपोर्ट', icon: '📋' },
          { id: 'rates', label: 'Rates / रेट चार्ट', icon: '📈' },
          { id: 'services', label: 'Services / सेवा', icon: '🛠️' },
          { id: 'alerts', label: 'Alerts / सूचनाएं', icon: '🔔' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as FarmerTab)}
            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shrink-0 ${
              activeTab === tab.id 
              ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200' 
              : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="min-h-[500px]">
        {activeTab === 'cattle' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight">CATTLE MANAGEMENT</h3>
                <p className="text-slate-400 font-black mt-1 uppercase tracking-widest text-xs">LIFECYCLE & MEDICAL HISTORY</p>
              </div>
              <button 
                onClick={() => setIsAddCattleModalOpen(true)}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
              >
                + ADD NEW CATTLE
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {cattleList.map((cattle, i) => (
                <div key={i} className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-10 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-lg">
                          <img src={cattle.img} alt="Cattle" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black text-slate-900 tracking-tight">{cattle.tag}</h4>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{cattle.breed} • {cattle.age}</p>
                          <div className="flex gap-2 mt-3">
                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-blue-500/20">
                              ✨ YIELD AI
                            </button>
                            <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-red-500/20">
                              🚨 HEALTH AI
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        cattle.status === 'HEALTHY' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {cattle.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">DAILY YIELD</p>
                        <p className="text-2xl font-black text-slate-900">{cattle.yieldPerDay} Ltrs</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">LACTATION</p>
                        <p className="text-2xl font-black text-slate-900">#{cattle.lactation}</p>
                      </div>
                    </div>

                    <div className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 space-y-6">
                      <div className="flex justify-between items-center">
                        <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">HEALTH & REPRODUCTION</h5>
                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">FULL RECORD</button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Vaccinations</span>
                          <span className="text-[11px] font-black text-slate-900">{cattle.vaccinationDates}</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">AI / CALVING RECORD</p>
                          <p className="text-sm font-black text-slate-800">{cattle.aiCalvingRecord}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">HEALTH STATUS</p>
                          <p className="text-sm font-black text-slate-800 italic">"{cattle.healthRecord}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 animate-fadeIn">
            {/* Milk Entry Form */}
            <div className="xl:col-span-2 bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-12">
                 <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">🥛</div>
                   Supply Entry / दूध प्रविष्टि
                 </h4>
                 <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Sync Ready</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Select Shift / शिफ्ट चुनें</label>
                    <div className="flex gap-4 p-2 bg-slate-50 rounded-3xl border border-slate-100">
                      {(['Morning', 'Evening'] as const).map((s) => (
                        <button 
                          key={s}
                          onClick={() => setShift(s)}
                          className={`flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                            shift === s 
                            ? 'bg-white shadow-xl text-blue-600 border border-slate-100 scale-105' 
                            : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {s === 'Morning' ? 'Morning / सुबह' : 'Evening / शाम'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Milk Volume (Liters) / दूध की मात्रा</label>
                    <div className="relative group">
                      <input 
                        type="number" 
                        value={milkVolume}
                        onChange={(e) => setMilkVolume(e.target.value)}
                        placeholder="0.00" 
                        className="w-full px-10 py-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 text-5xl font-black text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-200 shadow-inner group-hover:border-slate-200" 
                      />
                      <span className="absolute right-10 top-1/2 -translate-y-1/2 font-black text-slate-300 text-2xl tracking-tighter">LITERS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">FAT %</label>
                      <input 
                        type="number" 
                        value={fatPercent}
                        onChange={(e) => setFatPercent(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 text-xl font-black text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-inner" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">SNF %</label>
                      <input 
                        type="number" 
                        value={snfPercent}
                        onChange={(e) => setSnfPercent(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 text-xl font-black text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-inner" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">TEMP °C</label>
                      <input 
                        type="number" 
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 text-xl font-black text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex-1 p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform"></div>
                     <div className="relative z-10">
                        <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-4">Estimated Entry Value</p>
                        <p className="text-6xl font-black tracking-tighter mb-2">₹ {totalPayment.toFixed(2)}</p>
                        <div className="h-px bg-white/10 w-full my-6"></div>
                        <div className="space-y-3">
                           <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                              <span>Rate per Litre</span>
                              <span className="text-white">₹{ratePerLitre.toFixed(2)} / L</span>
                           </div>
                           <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                              <span>FAT Bonus</span>
                              <span className="text-emerald-400">+ ₹{fatBonus > 0 ? fatBonus.toFixed(2) : '0.00'}</span>
                           </div>
                           <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                              <span>SNF Bonus</span>
                              <span className="text-emerald-400">+ ₹{snfBonus > 0 ? snfBonus.toFixed(2) : '0.00'}</span>
                           </div>
                        </div>
                     </div>
                     <button 
                      onClick={handleSubmitMilk}
                      disabled={isSubmitting || !milkVolume}
                      className="w-full mt-10 py-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-[1.75rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-95 relative z-10 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : showSuccess ? (
                        <div className="flex flex-col items-center gap-2">
                          <span>Success / सफल ✅</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Downloading Collection Slip...');
                            }}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            Print Slip / रसीद प्रिंट करें
                          </button>
                        </div>
                      ) : (
                        <>Submit Collection / जमा करें</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Analytics */}
            <div className="space-y-10">
               <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center">Quality Performance / गुणवत्ता प्रदर्शन</h5>
                  <div className="flex justify-center mb-10">
                     <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="80" cy="80" r="72" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                           <circle cx="80" cy="80" r="72" stroke="#3b82f6" strokeWidth="12" fill="transparent" 
                              strokeDasharray={452} strokeDashoffset={452 - (452 * 88) / 100} 
                              className="transition-all duration-1000"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-3xl font-black text-slate-900">4.2</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase">Avg FAT% / औसत फैट</span>
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">SNF% / एसएनएफ</p>
                        <p className="text-lg font-black text-slate-900">8.9</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">CLR / सीएलआर</p>
                        <p className="text-lg font-black text-slate-900">29.2</p>
                     </div>
                  </div>
               </div>

               <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl">
                  <h5 className="text-lg font-black mb-6">Latest Bonus / नवीनतम बोनस</h5>
                  <p className="text-4xl font-black tracking-tighter mb-2">₹ 1,500</p>
                  <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-8">Independence Day Bonus 2024</p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-[9px] text-slate-400 font-bold uppercase">Status / स्थिति</p>
                     <p className="text-sm font-black text-emerald-400 uppercase">Credited / जमा किया गया</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-10 animate-fadeIn">
             {/* Ledger Summary Cards */}
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Qty Supplied</p>
                   <p className="text-3xl font-black text-slate-900">1,240.5 L</p>
                   <p className="text-[9px] font-bold text-emerald-600 mt-2">↑ 12% from last month</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Avg Rate / Litre</p>
                   <p className="text-3xl font-black text-slate-900">₹ 41.20</p>
                   <p className="text-[9px] font-bold text-blue-600 mt-2">Based on 4.2% FAT</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Quality Bonus</p>
                   <p className="text-3xl font-black text-emerald-600">₹ 850.00</p>
                   <p className="text-[9px] font-bold text-slate-400 mt-2">Premium Grade Bonus</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Payment</p>
                   <p className="text-3xl font-black text-blue-600">₹ 4,280.50</p>
                   <p className="text-[9px] font-bold text-slate-400 mt-2">Next Payout: Oct 15</p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                   <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        Milk Supply Ledger / दूध लेजर
                        <button 
                          onClick={() => alert('Downloading Full Ledger...')}
                          className="w-8 h-8 bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-xs"
                          title="Download Ledger"
                        >
                          ↓
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setReportView('daily')}
                          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${reportView === 'daily' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}
                        >
                          Daily
                        </button>
                        <button 
                          onClick={() => setReportView('weekly')}
                          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${reportView === 'weekly' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}
                        >
                          Weekly
                        </button>
                        <button 
                          onClick={() => setReportView('monthly')}
                          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${reportView === 'monthly' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}
                        >
                          Monthly
                        </button>
                      </div>
                   </h4>
                   <div className="space-y-6">
                      {(reportView === 'daily' ? [
                        { date: 'Oct 08 AM', fat: '4.2', snf: '8.8', rate: '41.50', vol: '12.4', total: '514.60' },
                        { date: 'Oct 08 PM', fat: '4.3', snf: '8.9', rate: '42.10', vol: '11.2', total: '471.52' },
                      ] : reportView === 'weekly' ? [
                        { date: 'Week 40', fat: '4.2', snf: '8.8', rate: '41.50', vol: '84.4', total: '3502.60' },
                        { date: 'Week 39', fat: '4.1', snf: '8.7', rate: '40.80', vol: '78.8', total: '3215.04' },
                      ] : [
                        { date: 'Oct 08 AM', fat: '4.2', snf: '8.8', rate: '41.50', vol: '12.4', total: '514.60' },
                        { date: 'Oct 07 PM', fat: '4.1', snf: '8.7', rate: '40.80', vol: '10.8', total: '440.64' },
                        { date: 'Oct 07 AM', fat: '4.4', snf: '8.9', rate: '42.20', vol: '11.5', total: '485.30' },
                        { date: 'Oct 06 PM', fat: '4.2', snf: '8.8', rate: '41.50', vol: '12.0', total: '498.00' },
                        { date: 'Oct 06 AM', fat: '4.0', snf: '8.6', rate: '39.80', vol: '14.2', total: '565.16' },
                      ]).map((log, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedSlip(log)}
                          className="flex items-center justify-between p-6 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:scale-[1.02] rounded-3xl border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
                        >
                           <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-white rounded-2xl flex flex-col items-center justify-center font-black text-blue-600 shadow-sm border border-slate-100">
                                 <span className="text-[10px] uppercase">{log.date.split(' ')[0]}</span>
                                 <span className="text-lg">{log.date.split(' ')[1]}</span>
                              </div>
                              <div>
                                 <p className="text-lg font-black text-slate-800">{log.vol} L</p>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">₹{log.rate}/L</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-8">
                             <div className="text-right">
                                <p className="text-xl font-black text-slate-900">₹{log.total}</p>
                                <div className="flex gap-4 mt-1">
                                  <span className="text-[9px] font-black text-slate-400 uppercase">F:{log.fat}%</span>
                                  <span className="text-[9px] font-black text-slate-400 uppercase">S:{log.snf}%</span>
                                </div>
                             </div>
                             <button className="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                               <span className="text-xl">📄</span>
                             </button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
                   <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center justify-between">
                      Payments & Incentives / भुगतान और प्रोत्साहन
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Download Statement</button>
                   </h4>
                   <div className="space-y-6">
                      {[
                        { title: 'Weekly Payout: Oct 01-07', amt: '₹4,280.50', status: 'PAID', date: '08 Oct', type: 'Payment', deductions: '₹120.00' },
                        { title: 'Quality Incentive Bonus', amt: '₹1,500.00', status: 'CREDITED', date: '01 Oct', type: 'Bonus', deductions: '₹0.00' },
                        { title: 'Weekly Payout: Sep 24-30', amt: '₹4,112.20', status: 'PAID', date: '01 Oct', type: 'Payment', deductions: '₹115.00' },
                        { title: 'Bulk Supply Incentive', amt: '₹2,200.00', status: 'PAID', date: '05 Sep', type: 'Incentive', deductions: '₹0.00' },
                      ].map((pay, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 hover:bg-white hover:shadow-xl rounded-3xl border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                           <div className="flex items-center gap-5">
                              <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100`}>
                                {pay.type === 'Payment' ? '💰' : pay.type === 'Bonus' ? '🎁' : '🏆'}
                              </div>
                              <div>
                                 <p className="font-black text-slate-800">{pay.title}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase">{pay.date} • Deductions: {pay.deductions}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-xl font-black text-slate-900">{pay.amt}</p>
                              <p className={`text-[9px] font-black uppercase tracking-widest ${pay.status === 'PAID' ? 'text-emerald-600' : 'text-blue-600'}`}>{pay.status}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'rates' && (
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                   <h4 className="text-3xl font-black text-slate-900 tracking-tight">Milk Rate Chart / दूध रेट चार्ट</h4>
                   <p className="text-slate-500 font-medium mt-1">Rates based on 8.5% SNF standard / 8.5% एसएनएफ मानक पर आधारित दरें</p>
                </div>
                <div className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Effective: 01 Oct 2024</div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                   <h5 className="font-black text-blue-900 uppercase text-xs tracking-widest mb-6 border-b border-blue-200 pb-4 flex items-center gap-2">
                      <span className="text-xl">🐄</span> Cow Milk Rates / गाय का दूध
                   </h5>
                   <table className="w-full text-left text-sm font-bold">
                      <thead className="text-[10px] text-blue-400 uppercase tracking-widest">
                         <tr><th className="pb-4">FAT % / फैट</th><th className="pb-4">RATE (₹/L) / दर</th></tr>
                      </thead>
                      <tbody className="divide-y divide-blue-100">
                         {['3.5: 36.50', '3.8: 38.20', '4.1: 40.10', '4.4: 42.50', '4.7+: 45.00'].map(r => (
                           <tr key={r}><td className="py-4 text-slate-700">{r.split(': ')[0]}%</td><td className="py-4 text-blue-700 font-black">₹{r.split(': ')[1]}</td></tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
                   <h5 className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-6 border-b border-indigo-200 pb-4 flex items-center gap-2">
                      <span className="text-xl">🐃</span> Buffalo Milk Rates / भैंस का दूध
                   </h5>
                   <table className="w-full text-left text-sm font-bold">
                      <thead className="text-[10px] text-indigo-400 uppercase tracking-widest">
                         <tr><th className="pb-4">FAT % / फैट</th><th className="pb-4">RATE (₹/L) / दर</th></tr>
                      </thead>
                      <tbody className="divide-y divide-indigo-100">
                         {['5.0: 48.00', '5.5: 52.50', '6.0: 56.80', '6.5: 61.20', '7.0+: 68.00'].map(r => (
                           <tr key={r}><td className="py-4 text-slate-700">{r.split(': ')[0]}%</td><td className="py-4 text-indigo-700 font-black">₹{r.split(': ')[1]}</td></tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
             
             <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 flex items-start gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">💡</div>
                <div>
                   <h6 className="font-black text-amber-900 text-sm mb-1 uppercase tracking-widest">Pricing Policy Note / मूल्य निर्धारण नीति</h6>
                   <p className="text-xs text-amber-800 font-medium leading-relaxed">SNF below 8.5% will result in a deduction of ₹0.50 per 0.1% point. Quality lead bonuses are applied to batches maintaining consistent 4.0+ FAT for 7 consecutive days.</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-10 animate-fadeIn">
             <div className="text-center max-w-2xl mx-auto mb-12">
                <h4 className="text-3xl font-black text-slate-900 tracking-tight">Cattle Care Services / पशु सेवाएँ</h4>
                <p className="text-slate-500 font-black mt-2 uppercase tracking-widest text-xs">Exclusive enterprise-grade support for our dairy partners.</p>
             </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {[
                  { id: 'feed', title: 'Animal Feed / पशु आहार (चारा)', desc: 'Order high-protein balanced feed at factory rates. Monthly doorstep delivery available.', icon: '🌾', color: 'amber', tags: ['High Protein', 'Subsidy Ready', 'Doorstep Delivery'] },
                  { id: 'vet', title: 'Veterinary / पशु चिकित्सा (दवाई)', desc: 'Free monthly checkups. 24/7 tele-vet support. Access to subsidized medications and emergency visits.', icon: '💊', color: 'blue', tags: ['Free Visit', 'Subsidized', '24/7 Support'] },
                  { id: 'insurance', title: 'Insurance / पशु बीमा', desc: 'Secure your livestock with the Smart Dairy Insurance Plan. Quick cashless claims and easy registration.', icon: '🛡️', color: 'indigo', tags: ['Low Premium', 'Cashless', 'Quick Claim'] },
                  { id: 'loan', title: 'Loan & Advance / ऋण और अग्रिम', desc: 'Apply for interest-free advances for cattle purchase or farm upgrades. Easy repayment from milk supply.', icon: '🏦', color: 'emerald', tags: ['Interest Free', 'Quick Approval', 'Easy EMI'] },
                ].map((s) => (
                  <div key={s.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-500 group">
                    <div className={`w-20 h-20 bg-${s.color}-50 text-4xl rounded-[2rem] flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform`}>{s.icon}</div>
                    <h5 className="text-2xl font-black text-slate-900 mb-4">{s.title}</h5>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-10">
                       {s.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">{tag}</span>
                       ))}
                    </div>
                    <button 
                      onClick={() => setActiveService(s.id as any)}
                      className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-blue-600 shadow-xl shadow-slate-100 group-hover:shadow-blue-200"
                    >
                      Access Service / सेवा का उपयोग करें
                    </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm animate-fadeIn">
             <div className="flex justify-between items-center mb-12">
                <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">📢</div>
                  Dairy Notices & Training / सूचनाएं एवं प्रशिक्षण
                </h4>
                <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-400 tracking-widest">3 New Alerts / 3 नई सूचनाएं</div>
             </div>
             
             <div className="space-y-8">
                {[
                  { title: 'Payment Credited: Weekly Payout / भुगतान जमा: साप्ताहिक भुगतान', content: 'Your payment of ₹4,280.50 for the period Oct 01-07 has been credited to your bank account. Please check your ledger for details.', date: 'JUST NOW', tag: 'PAYMENT', color: 'emerald' },
                  { title: 'Winter Milk Yield Training Program / शीतकालीन दूध उत्पादन प्रशिक्षण', content: 'Special session by National Dairy Experts on maintaining fat levels during peak winter. Learn advanced feeding techniques and temperature control for livestock.', date: 'Oct 15, 2024 • 10:00 AM', tag: 'TRAINING', color: 'blue' },
                  { title: 'Automated Testing Hub Launch / स्वचालित परीक्षण केंद्र का शुभारंभ', content: 'We are installing 5 new high-speed automated testing machines at BMC #12. This will reduce wait times by 60%. Mobile slips will be generated instantly.', date: 'Oct 22, 2024', tag: 'NEWS', color: 'emerald' },
                  { title: 'Urgent: Foot & Mouth Vaccination Drive / तत्काल: खुरपका-मुंहपका टीकाकरण अभियान', content: 'Dairy enterprise vaccination drive starts Monday. All cattle must be registered via the "Services" tab by Sunday evening. Non-vaccinated supply may be restricted.', date: 'IMMEDIATE', tag: 'ALERT', color: 'red' },
                  { title: 'Market Rate Correction Advisory / बाजार दर सुधार परामर्श', content: 'Expected rate hike of +₹1.20/L due to upcoming festival season demand spike. Keep quality scores high to maximize earnings.', date: 'Oct 05, 2024', tag: 'MARKET', color: 'amber' },
                ].map((alert, i) => (
                  <div key={i} className="p-10 bg-slate-50/50 rounded-[3rem] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl transition-all group relative overflow-hidden">
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                          alert.tag === 'ALERT' ? 'bg-red-50 text-red-600 border-red-100' : 
                          alert.tag === 'PAYMENT' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          alert.tag === 'TRAINING' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>{alert.tag === 'ALERT' ? 'ALERT / चेतावनी' : alert.tag === 'PAYMENT' ? 'PAYMENT / भुगतान' : alert.tag === 'TRAINING' ? 'TRAINING / प्रशिक्षण' : alert.tag === 'NEWS' ? 'NEWS / समाचार' : 'MARKET / बाजार'}</span>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.date}</p>
                     </div>
                     <h5 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors relative z-10">{alert.title}</h5>
                     <p className="text-base text-slate-500 font-medium leading-relaxed mb-10 relative z-10 max-w-4xl">{alert.content}</p>
                     <div className="flex items-center justify-between relative z-10">
                        <button className="text-blue-600 font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:translate-x-3 transition-transform">
                          Read Full Bulletin / पूरा पढ़ें <span className="text-2xl">→</span>
                        </button>
                        <div className="flex -space-x-3">
                           {[1,2,3].map(n => (
                             <div key={n} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                                <img src={`https://picsum.photos/40/40?sig=${i}${n}`} alt="User" referrerPolicy="no-referrer" />
                             </div>
                           ))}
                           <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">+42</div>
                        </div>
                     </div>
                     <div className="absolute -bottom-10 -right-10 text-[120px] opacity-[0.03] rotate-12 pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                        {alert.tag === 'TRAINING' ? '🎓' : alert.tag === 'ALERT' ? '⚠️' : alert.tag === 'PAYMENT' ? '💰' : '🗞️'}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Enterprise Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-200 gap-6">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg">SD</div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Smart Dairy ERP v4.0.2</p>
         </div>
         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">© 2024 Digital Communique • Enterprise Solutions Provider</p>
      </div>

      {/* Add Cattle Modal */}
      {isAddCattleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-slideInUp">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Register New Cattle</h3>
                <button 
                  onClick={() => setIsAddCattleModalOpen(false)}
                  className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddCattle} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Tag Number / टैग नंबर</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. TAG-2044"
                      value={newCattle.tag}
                      onChange={(e) => setNewCattle({...newCattle, tag: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Breed / नस्ल</label>
                    <select 
                      value={newCattle.breed}
                      onChange={(e) => setNewCattle({...newCattle, breed: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner appearance-none"
                    >
                      <option value="JERSEY">JERSEY (गाय)</option>
                      <option value="HOLSTEIN">HOLSTEIN (गाय)</option>
                      <option value="SAHIWAL">SAHIWAL (गाय)</option>
                      <option value="MURRAH BUFFALO">MURRAH (भैंस)</option>
                      <option value="NILI RAVI">NILI RAVI (भैंस)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Age / उम्र (Years)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 3 YRS"
                      value={newCattle.age}
                      onChange={(e) => setNewCattle({...newCattle, age: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Lactation Number</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 2"
                      value={newCattle.lactation}
                      onChange={(e) => setNewCattle({...newCattle, lactation: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Milk Yield per day (Ltrs)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 15"
                      value={newCattle.yieldPerDay}
                      onChange={(e) => setNewCattle({...newCattle, yieldPerDay: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Health Record</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Healthy / Under Treatment"
                      value={newCattle.healthRecord}
                      onChange={(e) => setNewCattle({...newCattle, healthRecord: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Vaccination Dates</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2024-05-12, 2024-11-15"
                      value={newCattle.vaccinationDates}
                      onChange={(e) => setNewCattle({...newCattle, vaccinationDates: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">AI / Calving Record</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Calved: Jan 2024"
                      value={newCattle.aiCalvingRecord}
                      onChange={(e) => setNewCattle({...newCattle, aiCalvingRecord: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-200 transition-all active:scale-95 mt-4"
                >
                  Complete Registration / पंजीकरण पूरा करें
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Service Modals */}
      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-slideInUp">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl">
                    {activeService === 'feed' ? '🌾' : activeService === 'vet' ? '💊' : '🛡️'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                      {activeService === 'feed' ? 'Order Animal Feed' : activeService === 'vet' ? 'Veterinary Support' : 'Insurance Registry'}
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Partner Service</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveService(null)}
                  className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              {activeService === 'loan' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
                    <h4 className="text-xl font-black text-emerald-900 mb-4 uppercase tracking-tight">Available Credit Limit: ₹ 50,000</h4>
                    <p className="text-sm text-emerald-700 font-medium leading-relaxed">Based on your consistent supply of 12L+ daily for the last 6 months, you are eligible for an interest-free advance.</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Request Amount / ऋण राशि</label>
                      <input type="number" placeholder="e.g. 10000" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Purpose / उद्देश्य</label>
                      <select className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all font-black text-slate-800 shadow-inner appearance-none">
                        <option>Cattle Purchase / पशु खरीद</option>
                        <option>Farm Upgrades / फार्म सुधार</option>
                        <option>Emergency / आपातकालीन</option>
                        <option>Education / शिक्षा</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-500/20 transition-all active:scale-95">
                    Submit Request / आवेदन करें
                  </button>
                </div>
              )}

              {activeService === 'feed' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'High Protein Mix', price: '₹1,250', unit: '50KG Bag', img: 'https://picsum.photos/seed/feed1/200/200' },
                      { name: 'Mineral Supplement', price: '₹450', unit: '5KG Pack', img: 'https://picsum.photos/seed/feed2/200/200' },
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                        <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <p className="font-black text-slate-800 text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{item.unit}</p>
                          <p className="text-blue-600 font-black mt-1">{item.price}</p>
                        </div>
                        <button className="ml-auto w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-blue-600 hover:text-white transition-all">
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Delivery Address</p>
                    <p className="text-sm font-black text-slate-800">North Unit #12, Village Rampur, Sector 4</p>
                  </div>
                  <button className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">
                    Place Order / ऑर्डर दें
                  </button>
                </div>
              )}

              {activeService === 'vet' && (
                <div className="space-y-8">
                  <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">👨‍⚕️</div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Available Now</p>
                      <p className="text-lg font-black text-emerald-900">Dr. Satish Kumar (Senior Vet)</p>
                      <p className="text-xs text-emerald-700 font-medium">Estimated response: 15 mins</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <button className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-4 hover:border-blue-500 transition-all">
                      <span className="text-3xl">📞</span>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Audio Call</span>
                    </button>
                    <button className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-4 hover:border-blue-500 transition-all">
                      <span className="text-3xl">📹</span>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Video Consult</span>
                    </button>
                  </div>
                  <button className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20">
                    Book Emergency Visit / डॉक्टर बुलाएं
                  </button>
                </div>
              )}

              {activeService === 'insurance' && (
                <div className="space-y-8">
                  <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
                    <h4 className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-6 border-b border-indigo-200 pb-4">Active Policies / सक्रिय बीमा</h4>
                    <div className="space-y-4">
                      {[
                        { id: 'POL-8829', tag: 'TAG-1042', coverage: '₹85,000', expiry: 'Dec 2025' },
                        { id: 'POL-8830', tag: 'TAG-1088', coverage: '₹1,20,000', expiry: 'Jan 2026' },
                      ].map((pol, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-indigo-100">
                          <div>
                            <p className="font-black text-slate-800 text-sm">{pol.id}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Cattle: {pol.tag}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-indigo-600">{pol.coverage}</p>
                            <p className="text-[9px] text-slate-400 font-black uppercase">Exp: {pol.expiry}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">
                    Register New Policy / नया बीमा करें
                  </button>
                  <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Powered by Smart Dairy Insurance Partners</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerPanel;
