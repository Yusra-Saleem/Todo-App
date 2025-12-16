'use client';

import DashboardSidebar from '@/components/DashboardSidebar';
import { useState } from 'react';

export default function Analytics() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        toggleCollapse={toggleSidebar} 
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} p-6`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <p className="text-gray-300">Task analytics and insights will be displayed here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}