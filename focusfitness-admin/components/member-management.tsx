"use client";

import { useEffect, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Loader2,
} from "lucide-react";
import { AddMemberForm } from "@/components/add-member-form";
import { MemberProfile } from "@/components/member-profile";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: string;
  gymId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  planName: string;
  emergencyName?: string;
  emergencyNumber?: string;
  additionalNotes?: string;
  endDate?: string | null;
  imageUrl?: string;
  status: string;
  lastPayment?: string;
  startDate?: string;
  updatedAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  avatar?: string;
}

export function MemberManagement() {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Sample data for members
  useEffect(() => {
    const sampleMembers: Member[] = [
      {
        id: "john082455",
        gymId: "gym-001",
        fullName: "John Smith",
        email: "john.smith@email.com",
        phoneNumber: "0123456780",
        planName: "Basic Plan",
        emergencyName: "Jane Smith",
        emergencyNumber: "9876543201",
        additionalNotes: "Prefers morning workouts",
        endDate: null,
        imageUrl: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
        status: "Active",
        lastPayment: "2025-01-15T10:30:00.000Z",
        startDate: "2024-01-15T00:00:00.000Z",
        updatedAt: {
          _seconds: 1757763086,
          _nanoseconds: 920000000,
        },
        avatar: "",
      },
      {
        id: "sarah082456",
        gymId: "gym-001",
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phoneNumber: "0123456781",
        planName: "VIP Plan",
        emergencyName: "Mike Johnson",
        emergencyNumber: "9876543202",
        additionalNotes: "Has knee injury - avoid high impact exercises",
        endDate: null,
        imageUrl: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        status: "Active",
        lastPayment: "2025-02-20T14:15:00.000Z",
        startDate: "2024-02-20T00:00:00.000Z",
        updatedAt: {
          _seconds: 1757763087,
          _nanoseconds: 930000000,
        },
        avatar: "",
      },
      {
        id: "mike082457",
        gymId: "gym-001",
        fullName: "Mike Davis",
        email: "mike.davis@email.com",
        phoneNumber: "0123456782",
        planName: "Basic Plan",
        emergencyName: "Lisa Davis",
        emergencyNumber: "9876543203",
        additionalNotes: "",
        endDate: "2024-12-10T00:00:00.000Z",
        imageUrl: "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp",
        status: "Expired",
        lastPayment: "2024-11-10T09:45:00.000Z",
        startDate: "2023-12-10T00:00:00.000Z",
        updatedAt: {
          _seconds: 1757763088,
          _nanoseconds: 940000000,
        },
        avatar: "",
      },
      {
        id: "emily082458",
        gymId: "gym-001",
        fullName: "Emily Wilson",
        email: "emily.wilson@email.com",
        phoneNumber: "0123456783",
        planName: "Premium Plan",
        emergencyName: "Tom Wilson",
        emergencyNumber: "9876543204",
        additionalNotes: "Personal trainer sessions on Tuesdays",
        endDate: null,
        imageUrl: "https://mdbcdn.b-cdn.net/img/new/avatars/10.webp",
        status: "Active",
        lastPayment: "2025-03-01T16:20:00.000Z",
        startDate: "2024-03-01T00:00:00.000Z",
        updatedAt: {
          _seconds: 1757763089,
          _nanoseconds: 950000000,
        },
        avatar: "",
      },
      {
        id: "david082459",
        gymId: "gym-001",
        fullName: "David Brown",
        email: "david.brown@email.com",
        phoneNumber: "0123456784",
        planName: "Basic Plan",
        emergencyName: "Carol Brown",
        emergencyNumber: "9876543205",
        additionalNotes: "Vegetarian diet preferences",
        endDate: null,
        imageUrl: "https://mdbcdn.b-cdn.net/img/new/avatars/7.webp",
        status: "Suspended",
        lastPayment: "2024-10-08T12:00:00.000Z",
        startDate: "2024-01-08T00:00:00.000Z",
        updatedAt: {
          _seconds: 1757763090,
          _nanoseconds: 960000000,
        },
        avatar: "",
      },
    ];

    setMembers(sampleMembers);
  }, []);

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || member.status?.toLowerCase() === statusFilter;
    const matchesPlan =
      planFilter === "all" || member.planName?.toLowerCase() === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

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

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "vip plan":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            VIP Plan
          </Badge>
        );
      case "premium plan":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Premium Plan
          </Badge>
        );
      case "basic plan":
        return <Badge variant="outline">Basic Plan</Badge>;
      default:
        return <Badge variant="secondary">{plan}</Badge>;
    }
  };

  const handleAddMember = (newMember: any) => {
    setIsLoading(true);

    // Simulate async operation
    setTimeout(() => {
      const newMemberData: Member = {
        id: Math.random().toString(36).slice(2),
        gymId: "gym-001",
        fullName: newMember.name,
        email: newMember.email,
        phoneNumber: newMember.phone,
        planName: newMember.plan,
        emergencyName: newMember.emergencyContact,
        emergencyNumber: newMember.emergencyPhone,
        additionalNotes: newMember.notes,
        endDate: null,
        imageUrl: "",
        status: "Active",
        lastPayment: new Date().toISOString(),
        startDate: new Date().toISOString(),
        updatedAt: {
          _seconds: Math.floor(Date.now() / 1000),
          _nanoseconds: (Date.now() % 1000) * 1000000,
        },
        avatar: "",
      };

      setMembers((prev) => {
        const updated = [...prev, newMemberData].sort((a, b) => {
          const aDate = a.startDate ? new Date(a.startDate).getTime() : 0;
          const bDate = b.startDate ? new Date(b.startDate).getTime() : 0;
          return bDate - aDate;
        });
        return updated;
      });

      setIsAddDialogOpen(false);
      setIsLoading(false);

      toast({
        title: "Member Added",
        description: `${newMemberData.fullName} was added successfully.`,
      });
    }, 1000);
  };

  const handleViewProfile = (member: any) => {
    setSelectedMember(member);
    setIsProfileDialogOpen(true);
  };

  const handleDeleteMember = (memberId: string) => {
    setIsDeleteLoading(true);

    // Simulate async operation
    setTimeout(() => {
      setMembers(members.filter((member) => member.id !== memberId));
      setIsDeleteLoading(false);
      setMemberToDelete(null);

      toast({
        title: "Member Deleted",
        description: "Member was deleted successfully.",
      });
    }, 500);
  };

  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleUpdateMember = (updatedData: any) => {
    if (!editingMember) return;
    setIsLoading(true);

    // Simulate async operation
    setTimeout(() => {
      const updatedMember = {
        fullName: updatedData.name,
        email: updatedData.email,
        phoneNumber: updatedData.phone,
        planName: updatedData.plan,
        emergencyName: updatedData.emergencyContact,
        emergencyNumber: updatedData.emergencyPhone,
        additionalNotes: updatedData.notes,
        status: updatedData.status,
      };

      setMembers(
        members.map((member) =>
          member.id === editingMember.id
            ? { ...member, ...updatedMember }
            : member
        )
      );

      setIsLoading(false);
      setIsEditDialogOpen(false);
      setEditingMember(null);

      toast({
        title: "Member Updated",
        description: `${updatedData.name} was updated successfully.`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Member Management</h1>
          <p className="text-muted-foreground">
            Manage your gym members and their information
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Enter the member's information to create their profile.
              </DialogDescription>
            </DialogHeader>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
            ) : (
              <AddMemberForm
                onSubmit={handleAddMember}
                onCancel={() => setIsAddDialogOpen(false)}
                loading={isLoading}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update only the fields you want to change. Leave other fields
              blank.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            editingMember && (
              <AddMemberForm
                onSubmit={handleUpdateMember}
                onCancel={() => setIsEditDialogOpen(false)}
                initialData={{
                  name: editingMember.fullName,
                  email: editingMember.email,
                  phone: editingMember.phoneNumber,
                  plan: editingMember.planName,
                  emergencyName: editingMember.emergencyName,
                  emergencyNumber: editingMember.emergencyNumber,
                  notes: editingMember.additionalNotes,
                  status: editingMember.status,
                }}
                mode="edit"
                loading={isLoading}
              />
            )
          )}
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{members.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold ">
              {
                members.filter((m) => m.status?.toLowerCase() === "active")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                members.filter((m) => m.status?.toLowerCase() === "expired")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              New This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                members.filter((m) => {
                  if (!m.startDate) return false;
                  const date = new Date(m.startDate);
                  const now = new Date();
                  return (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>Search and filter your gym members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="basic plan">Basic Plan</SelectItem>
                  <SelectItem value="premium plan">Premium Plan</SelectItem>
                  <SelectItem value="vip plan">VIP Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Members Table */}
          <div className="mt-6">
            {isDeleteLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.imageUrl || "/placeholder.svg"}
                              alt={member.fullName}
                            />
                            <AvatarFallback>
                              {member.fullName
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.fullName}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {member.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {member.phoneNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getPlanBadge(member.planName)}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3" />
                          {member.startDate
                            ? new Date(member.startDate).toLocaleDateString()
                            : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.lastPayment
                          ? new Date(member.lastPayment).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewProfile(member)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditMember(member)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will remove {member.fullName} from
                                  the member list. This action can be undone by
                                  refreshing the page or re-adding the member.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-white hover:bg-gray-100 hover:text-black transition-all cursor-pointer">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteMember(member.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Member Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Member Profile</DialogTitle>
            <DialogDescription>
              View detailed information about this member
            </DialogDescription>
          </DialogHeader>
          {selectedMember && <MemberProfile member={selectedMember} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
