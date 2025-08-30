"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SupportPage } from "@/components/support-page"

export default function Support() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <SupportPage />
      </DashboardLayout>
    </AuthGuard>
  )
}
