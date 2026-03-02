
import React from 'react';
import { AppPanel } from '../types';

interface SidebarProps {
  activePanel: AppPanel;
  onSelect: (panel: AppPanel) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePanel, onSelect, isOpen }) => {
  const menuItems = [
    { id: AppPanel.WEBSITE, label: 'Public Website', icon: '🌐' },
    { id: AppPanel.ADMIN, label: 'Central Dashboard', icon: '📊' },
    { id: AppPanel.REPORTS, label: 'Reports Center', icon: '📝' },
    { id: AppPanel.FARMER, label: 'Farmer App', icon: '🚜' },
    { id: AppPanel.BMC, label: 'BMC Center', icon: '❄️' },
    { id: AppPanel.TANKER, label: 'Tanker GPS', icon: '🚛' },
    { id: AppPanel.FACTORY, label: 'Factory ERP', icon: '🏭' },
    { id: AppPanel.CNDF, label: 'CNDF Hub', icon: '🏢' },
    { id: AppPanel.BOOTH, label: 'Booth App', icon: '🏪' },
    { id: AppPanel.CUSTOMER, label: 'Customer App', icon: '🛍️' },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-900 h-full text-white flex flex-col shadow-xl z-50`}>
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white shrink-0">
          SD
        </div>
        {isOpen && <span className="font-bold text-lg tracking-tight whitespace-nowrap">Smart Dairy ERP</span>}
      </div>
      
      <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              activePanel === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            {isOpen && <span className="font-medium text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold overflow-hidden shrink-0">
            <img src="https://picsum.photos/40/40" alt="Avatar" />
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">dairy_admin_01</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
