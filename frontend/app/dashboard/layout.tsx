import type { Metadata } from 'next'
import './global.css';


export const metadata: Metadata = {
  title: 'TaskFlow - Dashboard',
  description: 'Professional task management dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  )
}