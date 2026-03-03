
import React, { useState, useMemo } from 'react';
import { AppPanel } from '@/types';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import FarmerPanel from '@/panels/farmer-panel';
import BMCPanel from '@/panels/bmc-panel';
import TankerPanel from '@/panels/tanker-panel';
import FactoryPanel from '@/panels/factory-panel';
import CNDFPanel from '@/panels/cndf-panel';
import BoothPanel from '@/panels/booth-panel';
import CustomerPanel from '@/panels/customer-panel';
import AdminDashboard from '@/panels/admin-dashboard';
import ReportsPanel from '@/panels/reports-panel';
import PublicWebsite from '@/panels/public-website';

const App: React.FC = () => {
  const [activePanel, setActivePanel] = useState<AppPanel>(AppPanel.WEBSITE);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderPanel = useMemo(() => {
    switch (activePanel) {
      case AppPanel.FARMER: return <FarmerPanel />;
      case AppPanel.BMC: return <BMCPanel />;
      case AppPanel.TANKER: return <TankerPanel />;
      case AppPanel.FACTORY: return <FactoryPanel />;
      case AppPanel.CNDF: return <CNDFPanel />;
      case AppPanel.BOOTH: return <BoothPanel />;
      case AppPanel.CUSTOMER: return <CustomerPanel />;
      case AppPanel.ADMIN: return <AdminDashboard />;
      case AppPanel.REPORTS: return <ReportsPanel />;
      case AppPanel.WEBSITE: return <PublicWebsite onEnterStore={() => setActivePanel(AppPanel.CUSTOMER)} />;
      default: return <AdminDashboard />;
    }
  }, [activePanel]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar 
        activePanel={activePanel} 
        onSelect={setActivePanel} 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          activePanel={activePanel} 
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          <div className="max-w-[1600px] mx-auto animate-fadeIn">
            {renderPanel}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
