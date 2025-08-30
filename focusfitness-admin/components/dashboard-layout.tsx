"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Users,
  ShoppingCart,
  CreditCard,
  Calendar,
  User,
  HelpCircle,
  LogOut,
  Dumbbell,
  Home,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Members", href: "/dashboard/members" },
  { icon: ShoppingCart, label: "Shop", href: "/dashboard/shop" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
  { icon: Calendar, label: "Plans", href: "/dashboard/plans" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [gymName, setGymName] = useState("");

  useState(() => {
    const name = localStorage.getItem("gym_name") || "FocusFitness";
    setGymName(name);
  });

  const handleLogout = () => {
    localStorage.removeItem("focusfitness_auth");
    localStorage.removeItem("gym_name");
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Dumbbell className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{gymName}</h2>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.href)}
                    className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t px-4 py-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background px-6 py-4">
            <div className="flex items-center gap-4">
              {/*<SidebarTrigger />*/}

              <div className="flex-1">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back! Here's what's happening at your gym today.
                </p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
