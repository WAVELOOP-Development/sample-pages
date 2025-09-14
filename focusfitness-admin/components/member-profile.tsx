"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Edit,
  UserCheck,
} from "lucide-react";

interface MemberProfileProps {
  member: any;
}

// Mock payment history
const mockPaymentHistory = [
  {
    date: "2024-06-01",
    amount: "$49.00",
    method: "Credit Card",
    status: "Paid",
  },
  {
    date: "2024-05-01",
    amount: "$49.00",
    method: "Credit Card",
    status: "Paid",
  },
  {
    date: "2024-04-01",
    amount: "$49.00",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    date: "2024-03-01",
    amount: "$49.00",
    method: "Credit Card",
    status: "Paid",
  },
  { date: "2024-02-01", amount: "$49.00", method: "Cash", status: "Paid" },
];

export function MemberProfile({ member }: MemberProfileProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "suspended":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan?: string) => {
    if (!plan) return <Badge variant="secondary">No Plan</Badge>;
    switch (plan.toLowerCase()) {
      case "vip":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            VIP
          </Badge>
        );
      case "premium":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Premium
          </Badge>
        );
      case "basic":
        return <Badge variant="outline">Basic</Badge>;
      default:
        return <Badge variant="secondary">{plan}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Member Header */}
      <div className="flex items-start gap-6 ">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={member.imageUrl || "/placeholder.svg"}
            alt={member.fullName}
          />
          <AvatarFallback className="text-lg">
            {member.fullName
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold">{member.fullName}</h2>
            {getStatusBadge(member.status)}
            {getPlanBadge(member.planName)}
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {member.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {member.phoneNumber}
            </div>
          </div>
        </div>
        {/*<Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>*/}
      </div>

      <Separator />

      {/* Member Details Grid */}
      <div className="flex flex-col gap-4">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Full Name
              </label>
              <p className="text-sm">{member.fullName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="text-sm">{member.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Phone
              </label>
              <p className="text-sm">{member.phoneNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Emergency Contact
              </label>
              <p className="text-sm">
                {member.emergencyName && member.emergencyNumber
                  ? `${member.emergencyName} - (${member.emergencyNumber})`
                  : "N/A"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Next Payment
              </label>
              <p className="text-sm">
                {member.startDate
                  ? new Date(
                      new Date(member.startDate).setMonth(
                        new Date(member.startDate).getMonth() + 1
                      )
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Membership Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Membership Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Plan
              </label>
              <p className="text-sm">{member.planName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Join Date
              </label>
              <p className="text-sm">
                {member.startDate
                  ? new Date(member.startDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Next Payment
              </label>
              <p className="text-sm">
                {member.startDate
                  ? new Date(
                      new Date(member.startDate).setMonth(
                        new Date(member.startDate).getMonth() + 1
                      )
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      {/*<Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Recent payment transactions for this member
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPaymentHistory.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {payment.amount}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>*/}
    </div>
  );
}
