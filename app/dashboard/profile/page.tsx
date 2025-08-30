"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminProfile } from "@/components/admin-profile"

export default function ProfilePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <AdminProfile />
      </DashboardLayout>
    </AuthGuard>
  )
}
