"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

function SidebarFooterContent({ onLogout }: { onLogout: () => void }) {
  const { state } = useSidebar();

  const signOutButton = (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? You will need to log in again to
            access the admin dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-100 hover:text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (state === "collapsed") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{signOutButton}</div>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          Sign Out
        </TooltipContent>
      </Tooltip>
    );
  }

  return signOutButton;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
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
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r" collapsible="icon">
            <SidebarHeader className="border-b px-6 py-4 group-data-[collapsible=icon]:px-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary group-data-[collapsible=icon]:hidden">
                  <Dumbbell className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="group-data-[collapsible=icon]:hidden">
                  <h2 className="text-lg font-semibold">{gymName}</h2>
                  <p className="text-xs text-muted-foreground">
                    Admin Dashboard
                  </p>
                </div>
                <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:mx-auto" />
              </div>
            </SidebarHeader>

            <SidebarContent className="px-4 py-4 group-data-[collapsible=icon]:px-2">
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        onClick={() => router.push(item.href)}
                        tooltip={item.label}
                        className={`w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-red-600 text-white hover:bg-red-700 hover:text-white shadow-md"
                            : ""
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.label}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t px-4 py-4 group-data-[collapsible=icon]:px-2">
              <SidebarFooterContent onLogout={handleLogout} />
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
