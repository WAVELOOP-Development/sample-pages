"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
} from "lucide-react";

export function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [gymName, setGymName] = useState("");
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@focusfitness.com",
    phone: "+1 (555) 123-4567",
    role: "Gym Manager",
    gymName: "FocusFitness Downtown",
    address: "123 Fitness Street, Downtown, NY 10001",
    joinDate: "2023-01-15",
    bio: "Experienced fitness professional with over 10 years in gym management. Passionate about helping people achieve their fitness goals and creating a welcoming environment for all members.",
    avatar: "/gym-manager.png",
  });

  const [editData, setEditData] = useState(profileData);

  useEffect(() => {
    const storedGymName = localStorage.getItem("gym_name") || "FocusFitness";
    setGymName(storedGymName);
    setProfileData((prev) => ({ ...prev, gymName: storedGymName }));
    setEditData((prev) => ({ ...prev, gymName: storedGymName }));
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    // In a real app, this would save to a backend
    localStorage.setItem("gym_name", editData.gymName);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit} className="w-full sm:w-auto">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="about">About FocusFitness</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0">
                  <AvatarImage
                    src={profileData.avatar || "/placeholder.svg"}
                    alt={profileData.name}
                  />
                  <AvatarFallback className="text-lg">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {profileData.name}
                    </h2>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 self-center sm:self-auto">
                      <Shield className="h-3 w-3 mr-1" />
                      {profileData.role}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{profileData.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>
                        Member since{" "}
                        {new Date(profileData.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm">{profileData.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm">{profileData.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm">{profileData.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <p className="text-sm">{profileData.role}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Gym Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gymName">Gym Name</Label>
                  {isEditing ? (
                    <Input
                      id="gymName"
                      value={editData.gymName}
                      onChange={(e) => handleChange("gymName", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm">{profileData.gymName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={editData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm">{profileData.address}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <p className="text-sm">
                    {new Date(profileData.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bio Section */}
          <Card>
            <CardHeader>
              <CardTitle>Bio</CardTitle>
              <CardDescription>
                Tell us about yourself and your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  rows={4}
                  placeholder="Write a brief bio about yourself..."
                />
              ) : (
                <p className="text-sm leading-relaxed">{profileData.bio}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About FocusFitness</CardTitle>
              <CardDescription>
                Learn more about our mission and values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  At FocusFitness, we believe that fitness is not just about
                  physical strength, but about building confidence, community,
                  and a healthier lifestyle. Our mission is to provide a
                  welcoming, inclusive environment where people of all fitness
                  levels can achieve their personal goals.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Our Values</h3>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium">Inclusivity</h4>
                    <p className="text-sm text-muted-foreground">
                      We welcome everyone, regardless of fitness level, age, or
                      background.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Excellence</h4>
                    <p className="text-sm text-muted-foreground">
                      We strive for the highest standards in equipment,
                      facilities, and service.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Community</h4>
                    <p className="text-sm text-muted-foreground">
                      We foster connections and support among our members and
                      staff.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Innovation</h4>
                    <p className="text-sm text-muted-foreground">
                      We continuously evolve our programs and technology to
                      serve you better.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Our Story</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Founded in 2020, FocusFitness started as a small community gym
                  with a big vision. We wanted to create a space where fitness
                  meets friendship, where goals are achieved together, and where
                  every member feels valued and supported. Today, we continue to
                  grow while maintaining our core commitment to personal
                  attention and community spirit.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
