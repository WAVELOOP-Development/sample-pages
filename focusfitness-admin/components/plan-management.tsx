"use client";

import { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
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
  Edit,
  Calendar,
  Users,
  LandPlot,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { PlanForm } from "@/components/plan-form";
import { RenewalForm } from "@/components/renewal-form";

// Mock plan types data
const mockPlanTypes = [
  {
    id: "1",
    name: "Basic",
    price: 1500,
    duration: "Monthly",
    features: ["Gym Access", "Locker Room", "Basic Equipment"],
    color: "bg-gray-100 text-gray-800",
    description: "Perfect for beginners",
  },
  {
    id: "2",
    name: "Premium",
    price: 3000,
    duration: "Monthly",
    features: [
      "All Basic Features",
      "Group Classes",
      "Personal Training (2 sessions)",
      "Nutrition Consultation",
    ],
    color: "bg-blue-100 text-blue-800",
    description: "Most popular choice",
  },
  {
    id: "3",
    name: "VIP",
    price: 9000,
    duration: "Monthly",
    features: [
      "All Premium Features",
      "Unlimited Personal Training",
      "Priority Booking",
      "Guest Passes (4/month)",
      "Spa Access",
    ],
    color: "bg-purple-100 text-purple-800",
    description: "Ultimate fitness experience",
  },
];

// Mock member plans data with expiration tracking
const mockMemberPlans = [
  {
    id: "1",
    memberId: "1",
    memberName: "Sarah Johnson",
    memberAvatar: "/diverse-woman-portrait.png",
    planType: "Premium",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    status: "Active",
    autoRenew: true,
    daysUntilExpiry: 15,
  },
  {
    id: "2",
    memberId: "2",
    memberName: "Mike Chen",
    memberAvatar: "/thoughtful-man.png",
    planType: "Basic",
    startDate: "2024-02-20",
    endDate: "2024-07-05",
    status: "Expiring Soon",
    autoRenew: false,
    daysUntilExpiry: 5,
  },
  {
    id: "3",
    memberId: "3",
    memberName: "Emily Rodriguez",
    memberAvatar: "/diverse-woman-portrait.png",
    planType: "VIP",
    startDate: "2024-03-10",
    endDate: "2024-09-10",
    status: "Active",
    autoRenew: true,
    daysUntilExpiry: 75,
  },
  {
    id: "4",
    memberId: "4",
    memberName: "David Wilson",
    memberAvatar: "/thoughtful-man.png",
    planType: "Premium",
    startDate: "2023-12-05",
    endDate: "2024-06-25",
    status: "Expired",
    autoRenew: false,
    daysUntilExpiry: -5,
  },
  {
    id: "5",
    memberId: "5",
    memberName: "Lisa Thompson",
    memberAvatar: "/diverse-woman-portrait.png",
    planType: "Basic",
    startDate: "2024-04-12",
    endDate: "2024-10-12",
    status: "Active",
    autoRenew: true,
    daysUntilExpiry: 105,
  },
];

export function PlanManagement() {
  const [planTypes, setPlanTypes] = useState(mockPlanTypes);
  const [memberPlans, setMemberPlans] = useState(mockMemberPlans);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planTypeFilter, setPlanTypeFilter] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedMemberPlan, setSelectedMemberPlan] = useState<any>(null);
  const [isPlanFormOpen, setIsPlanFormOpen] = useState(false);
  const [isRenewalFormOpen, setIsRenewalFormOpen] = useState(false);

  const filteredMemberPlans = memberPlans.filter((plan) => {
    const matchesSearch = plan.memberName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      plan.status.toLowerCase().replace(" ", "") === statusFilter;
    const matchesPlanType =
      planTypeFilter === "all" ||
      plan.planType.toLowerCase() === planTypeFilter;
    return matchesSearch && matchesStatus && matchesPlanType;
  });

  const getStatusBadge = (status: string, daysUntilExpiry: number) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "expiring soon":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Expiring Soon
          </Badge>
        );
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanTypeBadge = (planType: string) => {
    const plan = planTypes.find((p) => p.name === planType);
    if (!plan) return <Badge variant="outline">{planType}</Badge>;

    switch (planType.toLowerCase()) {
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
        return <Badge variant="secondary">{planType}</Badge>;
    }
  };

  const handleAddPlan = () => {
    setSelectedPlan(null);
    setIsPlanFormOpen(true);
  };

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    setIsPlanFormOpen(true);
  };

  const handleRenewPlan = (memberPlan: any) => {
    setSelectedMemberPlan(memberPlan);
    setIsRenewalFormOpen(true);
  };

  const handleSavePlan = (planData: any) => {
    if (selectedPlan) {
      setPlanTypes(
        planTypes.map((p) =>
          p.id === selectedPlan.id ? { ...planData, id: selectedPlan.id } : p
        )
      );
    } else {
      const newPlan = { ...planData, id: (planTypes.length + 1).toString() };
      setPlanTypes([...planTypes, newPlan]);
    }
    setIsPlanFormOpen(false);
    setSelectedPlan(null);
  };

  const handleSaveRenewal = (renewalData: any) => {
    setMemberPlans(
      memberPlans.map((plan) =>
        plan.id === selectedMemberPlan.id
          ? {
              ...plan,
              endDate: renewalData.endDate,
              status: "Active",
              autoRenew: renewalData.autoRenew,
              daysUntilExpiry: Math.ceil(
                (new Date(renewalData.endDate).getTime() -
                  new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              ),
            }
          : plan
      )
    );
    setIsRenewalFormOpen(false);
    setSelectedMemberPlan(null);
  };

  // Calculate statistics
  const totalMembers = memberPlans.length;
  const activeMembers = memberPlans.filter(
    (plan) => plan.status === "Active"
  ).length;
  const expiringSoon = memberPlans.filter(
    (plan) => plan.daysUntilExpiry <= 30 && plan.daysUntilExpiry > 0
  ).length;
  const expired = memberPlans.filter(
    (plan) => plan.status === "Expired"
  ).length;
  const totalRevenue = memberPlans
    .filter((plan) => plan.status === "Active")
    .reduce((sum, plan) => {
      const planType = planTypes.find((p) => p.name === plan.planType);
      return sum + (planType?.price || 0);
    }, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Plan Management</h1>
          <p className="text-muted-foreground">
            Manage membership plans and track renewals
          </p>
        </div>
        <Dialog open={isPlanFormOpen} onOpenChange={setIsPlanFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddPlan} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Plan Type
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedPlan ? "Edit Plan Type" : "Add New Plan Type"}
              </DialogTitle>
              <DialogDescription>
                {selectedPlan
                  ? "Update the plan information"
                  : "Create a new membership plan type"}
              </DialogDescription>
            </DialogHeader>
            <PlanForm plan={selectedPlan} onSubmit={handleSavePlan} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Plan Statistics Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-3xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              {activeMembers} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-3xl font-bold">{expiringSoon}</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-3xl font-bold">{expired}</div>
            <p className="text-xs text-muted-foreground">Need renewal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan Count</CardTitle>
            <LandPlot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-3xl font-bold">
              {mockPlanTypes.length}
            </div>
            <p className="text-xs text-muted-foreground">Total plans</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Plan Types and Member Plans */}
      <Tabs defaultValue="member-plans" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="member-plans">Member Plans</TabsTrigger>
          <TabsTrigger value="plan-types">Plan Types</TabsTrigger>
        </TabsList>

        {/* Member Plans Tab */}
        <TabsContent value="member-plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Plans & Renewals</CardTitle>
              <CardDescription>
                Track and manage individual member plan subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="relative w-full sm:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expiringsoon">
                        Expiring Soon
                      </SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={planTypeFilter}
                    onValueChange={setPlanTypeFilter}
                  >
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      {mockPlanTypes.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead>Auto Renew</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMemberPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={plan.memberAvatar || "/placeholder.svg"}
                                alt={plan.memberName}
                              />
                              <AvatarFallback>
                                {plan.memberName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{plan.memberName}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getPlanTypeBadge(plan.planType)}</TableCell>
                        <TableCell>
                          {getStatusBadge(plan.status, plan.daysUntilExpiry)}
                        </TableCell>
                        <TableCell>
                          {new Date(plan.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(plan.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {plan.daysUntilExpiry > 0 ? (
                              <span
                                className={
                                  plan.daysUntilExpiry <= 30
                                    ? "text-yellow-600 font-medium"
                                    : ""
                                }
                              >
                                {plan.daysUntilExpiry} days
                              </span>
                            ) : (
                              <span className="text-red-600 font-medium">
                                Expired
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {plan.autoRenew ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="outline">No</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRenewPlan(plan)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Renew
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 lg:hidden">
                {filteredMemberPlans.map((plan) => (
                  <Card key={plan.id} className="border rounded-lg p-4">
                    <div className="space-y-3">
                      {/* Member Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage
                              src={plan.memberAvatar || "/placeholder.svg"}
                              alt={plan.memberName}
                            />
                            <AvatarFallback>
                              {plan.memberName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate">
                              {plan.memberName}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRenewPlan(plan)}
                          className="whitespace-nowrap"
                        >
                          <Calendar className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Renew</span>
                        </Button>
                      </div>

                      {/* Status and Plan Badges */}
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(plan.status, plan.daysUntilExpiry)}
                        {getPlanTypeBadge(plan.planType)}
                        {plan.autoRenew && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Auto Renew
                          </Badge>
                        )}
                      </div>

                      {/* Plan Details */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Start Date:
                          </span>
                          <span className="text-sm">
                            {new Date(plan.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            End Date:
                          </span>
                          <span className="text-sm">
                            {new Date(plan.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Days Left:
                          </span>
                          <span
                            className={`text-sm ${
                              plan.daysUntilExpiry > 0
                                ? plan.daysUntilExpiry <= 30
                                  ? "text-yellow-600 font-medium"
                                  : ""
                                : "text-red-600 font-medium"
                            }`}
                          >
                            {plan.daysUntilExpiry > 0
                              ? `${plan.daysUntilExpiry} days`
                              : "Expired"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plan Types Tab */}
        <TabsContent value="plan-types" className="space-y-4">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {planTypes.map((plan) => (
              <Card key={plan.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPlan(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">
                      LKR {plan.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per {plan.duration.toLowerCase()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Features:</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      {
                        memberPlans.filter(
                          (mp) =>
                            mp.planType === plan.name && mp.status === "Active"
                        ).length
                      }{" "}
                      active members
                    </div>
                    <Progress
                      value={
                        (memberPlans.filter(
                          (mp) =>
                            mp.planType === plan.name && mp.status === "Active"
                        ).length /
                          totalMembers) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Renewal Form Dialog */}
      <Dialog open={isRenewalFormOpen} onOpenChange={setIsRenewalFormOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Renew Membership Plan</DialogTitle>
            <DialogDescription>
              Update the membership plan renewal details
            </DialogDescription>
          </DialogHeader>
          {selectedMemberPlan && (
            <RenewalForm
              availablePlans={mockPlanTypes}
              memberPlan={selectedMemberPlan}
              onSubmit={handleSaveRenewal}
              onCancel={() => setIsRenewalFormOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
