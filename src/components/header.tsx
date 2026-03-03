
import React from 'react';
import { AppPanel } from '@/types';

interface HeaderProps {
  activePanel: AppPanel;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ activePanel }) => {
  const panelTitles: Record<AppPanel, string> = {
    [AppPanel.ADMIN]: 'Owner & Admin Dashboard',
    [AppPanel.FARMER]: 'Farmer Mobile Application',
    [AppPanel.BMC]: 'Bulk Milk Collection (BMC) Center',
    [AppPanel.TANKER]: 'Tanker GPS & IoT Tracking',
    [AppPanel.FACTORY]: 'Factory Processing Unit',
    [AppPanel.CNDF]: 'CNDF Distribution Center',
    [AppPanel.BOOTH]: 'Booth / Vendor Application',
    [AppPanel.CUSTOMER]: 'Customer E-commerce Portal',
    [AppPanel.REPORTS]: 'Analytics & Reports Center',
    [AppPanel.WEBSITE]: 'Smart Dairy Corporate Portal',
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{panelTitles[activePanel]}</h1>
        <p className="text-xs text-slate-500 font-medium">Real-time data synced via Cloud ERP</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          System Live
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
