
import React, { useState } from 'react';
import { getDemandForecast } from '@/Services/geminiService';

const CNDFPanel: React.FC = () => {
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecast, setForecast] = useState<any>(null);

  const runAIModel = async () => {
    setIsForecasting(true);
    try {
      const data = await getDemandForecast('North Region', [
        { date: '2023-10-01', sales: 1200 },
        { date: '2023-10-02', sales: 1350 },
        { date: '2023-10-03', sales: 1100 },
      ]);
      setForecast(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsForecasting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-900 p-8 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold mb-2">AI Demand Forecasting</h2>
          <p className="opacity-70 max-w-md">Optimize your distribution logs using Gemini-powered predictive analytics for better inventory management.</p>
        </div>
        <button 
          onClick={runAIModel}
          disabled={isForecasting}
          className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all flex items-center gap-2"
        >
          {isForecasting ? (
            <span className="animate-spin inline-block w-6 h-6 border-4 border-indigo-900 border-t-transparent rounded-full"></span>
          ) : '✨ Generate Forecast'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-6 flex items-center gap-2 text-slate-800">
            <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">📅</span>
            Distribution Schedule
          </h3>
          <div className="space-y-4">
            {[
              { booth: 'Booth #12 - Civil Lines', status: 'Dispatched', time: '05:30 AM', loads: '420L' },
              { booth: 'Booth #05 - Model Town', status: 'Pending', time: '06:15 AM', loads: '380L' },
              { booth: 'Booth #19 - Railway Colony', status: 'In Transit', time: '05:50 AM', loads: '550L' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">{item.booth}</h4>
                  <p className="text-xs text-slate-500">Scheduled: {item.time} • Load: {item.loads}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.status === 'Dispatched' ? 'bg-green-100 text-green-700' :
                  item.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative min-h-[400px]">
          {forecast ? (
            <div className="animate-fadeIn">
               <h3 className="font-bold mb-6 text-slate-800">AI Predictions Results</h3>
               <div className="space-y-4">
                 {forecast.forecast.map((f: any, i: number) => (
                   <div key={i} className="p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-slate-800">{f.date}</span>
                        <span className="text-indigo-600 font-black text-lg">{f.expectedDemandLiters} L</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.recommendation}</p>
                   </div>
                 ))}
               </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">No Forecast Data</h3>
              <p className="text-sm text-slate-500 max-w-xs">Run the AI Model to see predicted demand for the next week based on historical data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CNDFPanel;
