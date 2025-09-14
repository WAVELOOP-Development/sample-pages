"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Eye,
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
  Building,
  Banknote,
  PiggyBank,
  X,
} from "lucide-react";
import { AddPaymentForm } from "@/components/add-payment-form";
import { PaymentHistory } from "@/components/payment-history";

// Mock member data
const mockMembers = [
  {
    id: "1",
    fullName: "Sarah Johnson",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    plan: "Premium",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/10.webp",
  },
  {
    id: "2",
    fullName: "Mike Chen",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    plan: "Basic",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
  },
  {
    id: "3",
    fullName: "Emily Rodriguez",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    plan: "Premium",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
  },
  {
    id: "4",
    fullName: "David Wilson",
    name: "David Wilson",
    email: "david.wilson@email.com",
    plan: "Basic",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/3.webp",
  },
  {
    id: "5",
    fullName: "Lisa Thompson",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    plan: "VIP",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/7.webp",
  },
];

// Mock payment data
const mockPayments = [
  {
    id: "PAY-001",
    memberId: "1",
    memberName: "Sarah Johnson",
    amount: 1500,
    period: "June 2024",
    method: "Credit Card",
    status: "Completed",
    date: "2024-06-01",
    paymentDate: "2024-06-01",
    transactionId: "TXN-12345",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/10.webp",
  },
  {
    id: "PAY-002",
    memberId: "2",
    memberName: "Mike Chen",
    amount: 1500,
    period: "June 2024",
    method: "Direct Bank Deposit",
    status: "Completed",
    date: "2024-06-05",
    paymentDate: "2024-06-05",
    transactionId: "TXN-12346",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
  },
  {
    id: "PAY-003",
    memberId: "3",
    memberName: "Emily Rodriguez",
    amount: 3000,
    period: "June 2024",
    method: "Payment Gateway",
    status: "Completed",
    date: "2024-06-03",
    paymentDate: "2024-06-03",
    transactionId: "TXN-12347",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/7.webp",
  },
  {
    id: "PAY-004",
    memberId: "1",
    memberName: "Sarah Johnson",
    amount: 3000,
    period: "May 2024",
    method: "Credit Card",
    status: "Completed",
    date: "2024-05-01",
    paymentDate: "2024-05-01",
    transactionId: "TXN-12348",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp",
  },
  {
    id: "PAY-005",
    memberId: "5",
    memberName: "Lisa Thompson",
    amount: 9000,
    period: "June 2024",
    method: "Cash",
    status: "Completed",
    date: "2024-06-10",
    paymentDate: "2024-06-10",
    transactionId: "TXN-12349",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/3.webp",
  },
  {
    id: "PAY-006",
    memberId: "4",
    memberName: "David Wilson",
    amount: 2000,
    period: "June 2024",
    method: "Credit Card",
    status: "Pending",
    date: "2024-06-12",
    paymentDate: "2024-06-12",
    transactionId: "TXN-12350",
    gymId: "gym-001",
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/5.webp",
  },
];

export function FinancialManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [isPaymentHistoryDialogOpen, setIsPaymentHistoryDialogOpen] =
    useState(false);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Use mock data instead of API calls
    setMembers(mockMembers);
    setPayments(mockPayments);
  }, []);

  const filteredMembers = members.filter(
    (member) =>
      member.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = payments
    .filter((payment) => payment.gymId === "gym-001")
    .filter((payment) => {
      const matchesMethod =
        paymentMethodFilter === "all" ||
        payment.method.toLowerCase().includes(paymentMethodFilter);
      const matchesStatus =
        statusFilter === "all" || payment.status.toLowerCase() === statusFilter;
      return matchesMethod && matchesStatus;
    });

  const mappedPayments = filteredPayments.map((payment) => {
    // Get member name from members list
    const member = members.find((m) => m.id === payment.memberId);
    // Format period from paymentDate
    const period = payment.paymentDate
      ? new Date(payment.paymentDate).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "";
    return {
      ...payment,
      memberName: member?.name || payment.memberName || "",
      period,
      status: payment.status || "Completed",
      date: payment.paymentDate || payment.date,
    };
  });

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "credit card":
      case "payment gateway":
        return <CreditCard className="h-4 w-4" />;
      case "direct bank deposit":
        return <Building className="h-4 w-4" />;
      case "cash":
        return <Banknote className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (!status || typeof status !== "string") {
      return <Badge variant="secondary">Unknown</Badge>;
    }
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewPaymentHistory = (member: any) => {
    setSelectedMember(member);
    setIsPaymentHistoryDialogOpen(true);
  };

  const handleAddPayment = async (paymentData: any) => {
    // Create a new payment with mock data
    const newPayment = {
      id: `PAY-${String(payments.length + 1).padStart(3, "0")}`,
      ...paymentData,
      status: "Completed",
      date: new Date().toISOString().split("T")[0],
      paymentDate: new Date().toISOString().split("T")[0],
      transactionId: `TXN-${Math.random().toString(36).substr(2, 9)}`,
      gymId: "gym-001",
    };

    // Add the new payment to the existing payments
    setPayments((prevPayments) => [...prevPayments, newPayment]);
    setIsAddPaymentDialogOpen(false);
  };

  // Calculate financial metrics
  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const monthlyRevenue = payments
    .filter((payment) => (payment.date ?? "").startsWith("2024-06"))
    .reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(
    (payment) => payment.status === "Completed"
  ).length;
  const averagePayment = totalRevenue / payments.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Management</h1>
          <p className="text-muted-foreground">
            Manage payments and track financial performance
          </p>
        </div>
        <Dialog
          open={isAddPaymentDialogOpen}
          onOpenChange={setIsAddPaymentDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>
                Record a new payment transaction for a member.
              </DialogDescription>
            </DialogHeader>
            <AddPaymentForm onSubmit={handleAddPayment} members={members} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Financial Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              LKR {totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">All time revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              LKR {monthlyRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedPayments} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Payment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              LKR {averagePayment.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Payment Records and Recent Payments */}
      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Payment Records</TabsTrigger>
          <TabsTrigger value="recent">Recent Payments</TabsTrigger>
        </TabsList>

        {/* Payment Records Tab */}
        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Records</CardTitle>
              <CardDescription>
                Search for members and view their payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search members by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {searchTerm && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Search Results
                    </h3>
                    <div className="space-y-2">
                      {filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {(member.name ?? "")
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .filter(Boolean)
                                  .join("") || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {member.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{member.plan}</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewPaymentHistory(member)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View History
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!searchTerm && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Search for a member to view their payment history</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Payments Tab */}
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>
                    All payment transactions and their details
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={paymentMethodFilter}
                    onValueChange={setPaymentMethodFilter}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="bank">Bank Deposit</SelectItem>
                      <SelectItem value="gateway">Payment Gateway</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappedPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.id}
                      </TableCell>
                      <TableCell>{payment.memberName}</TableCell>
                      <TableCell>{payment.period}</TableCell>
                      <TableCell className="font-medium">
                        LKR {(Number(payment.amount) || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(payment.method)}
                          <span className="text-sm">{payment.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        {payment.date
                          ? new Date(payment.date).toLocaleDateString()
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment History Custom Dialog */}
      <CustomDialog
        open={isPaymentHistoryDialogOpen}
        onOpenChange={setIsPaymentHistoryDialogOpen}
      >
        <CustomDialogContent>
          <CustomDialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <CustomDialogTitle>Payment History</CustomDialogTitle>
                <CustomDialogDescription>
                  Complete payment history for {selectedMember?.name}
                </CustomDialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaymentHistoryDialogOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CustomDialogHeader>
          <div className="px-6 pb-6 flex-1 overflow-y-auto">
            {selectedMember && (
              <PaymentHistory member={selectedMember} payments={payments} />
            )}
          </div>
        </CustomDialogContent>
      </CustomDialog>
    </div>
  );
}

// Custom Dialog Components
interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function CustomDialog({ open, onOpenChange, children }: CustomDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Focus management
      setTimeout(() => {
        if (dialogRef.current) {
          const firstFocusable = dialogRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          firstFocusable?.focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 transition-opacity duration-200 animate-in fade-in-0" />

      {/* Dialog Content */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-6xl max-h-[90vh] animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

interface CustomDialogContentProps {
  children: React.ReactNode;
}

function CustomDialogContent({ children }: CustomDialogContentProps) {
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl w-full h-full max-h-[90vh] overflow-hidden flex flex-col">
      {children}
    </div>
  );
}

function CustomDialogHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      {children}
    </div>
  );
}

function CustomDialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold leading-none tracking-tight">
      {children}
    </h2>
  );
}

function CustomDialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground mt-1">{children}</p>;
}
