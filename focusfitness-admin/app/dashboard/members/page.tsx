"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MemberManagement } from "@/components/member-management"

export default function MembersPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <MemberManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
