"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ShopManagement } from "@/components/shop-management"

export default function ShopPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ShopManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
