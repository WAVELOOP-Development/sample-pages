"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PlanManagement } from "@/components/plan-management"

export default function PlansPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <PlanManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
