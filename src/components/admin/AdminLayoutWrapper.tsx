'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // Don't show sidebar on login page
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-cream">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
