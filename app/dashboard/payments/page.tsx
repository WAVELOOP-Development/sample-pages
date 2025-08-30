"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FinancialManagement } from "@/components/financial-management"

export default function PaymentsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <FinancialManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
