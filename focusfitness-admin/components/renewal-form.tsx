"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

interface RenewalFormProps {
  availablePlans: any[];
  memberPlan: any;
  onSubmit: (renewal: any) => void;
  onCancel: () => void;
}

export function RenewalForm({
  availablePlans,
  memberPlan,
  onSubmit,
  onCancel,
}: RenewalFormProps) {
  const [formData, setFormData] = useState({
    planType: "",
    duration: "1",
    endDate: "",
    autoRenew: false,
    notes: "",
  });

  useEffect(() => {
    if (memberPlan) {
      // Calculate new end date based on current end date + 1 month
      const currentEndDate = new Date(memberPlan.endDate);
      const newEndDate = new Date(currentEndDate);
      newEndDate.setMonth(newEndDate.getMonth() + 1);

      setFormData({
        planType: memberPlan.planType || "",
        duration: "1",
        endDate: newEndDate.toISOString().split("T")[0],
        autoRenew: memberPlan.autoRenew || false,
        notes: "",
      });
    }
  }, [memberPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDurationChange = (duration: string) => {
    const currentEndDate = new Date(memberPlan.endDate);
    const newEndDate = new Date(currentEndDate);

    switch (duration) {
      case "1":
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        break;
      case "3":
        newEndDate.setMonth(newEndDate.getMonth() + 3);
        break;
      case "6":
        newEndDate.setMonth(newEndDate.getMonth() + 6);
        break;
      case "12":
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        break;
    }

    setFormData((prev) => ({
      ...prev,
      duration,
      endDate: newEndDate.toISOString().split("T")[0],
    }));
  };

  const getPlanPrice = (planType: string, duration: string) => {
    const selectedPlan = availablePlans.find((plan) => plan.name === planType);
    const basePrice = selectedPlan ? selectedPlan.price : 0;
    const months = Number.parseInt(duration);
    return basePrice * months;
  };

  return (
    <div className="space-y-6">
      {/* Member Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Member Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={memberPlan.memberAvatar || "/placeholder.svg"}
                alt={memberPlan.memberName}
              />
              <AvatarFallback>
                {memberPlan.memberName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{memberPlan.memberName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{memberPlan.planType}</Badge>
                <span className="text-sm text-muted-foreground">
                  Current expiry:{" "}
                  {new Date(memberPlan.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Renewal Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="planType">Plan Type</Label>
            <Select
              value={formData.planType}
              onValueChange={(value) => handleChange("planType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent>
                {availablePlans.map((planType) => (
                  <SelectItem key={planType.id} value={planType.name}>
                    {planType.name} - LKR {planType.price}/month
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Renewal Duration</Label>
            <Select
              value={formData.duration}
              onValueChange={handleDurationChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month</SelectItem>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">New End Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="autoRenew"
            checked={formData.autoRenew}
            onCheckedChange={(checked) => handleChange("autoRenew", checked)}
          />
          <Label htmlFor="autoRenew">Enable auto-renewal</Label>
        </div>

        {/* Pricing Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Renewal Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{formData.planType}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">
                  {formData.duration} month(s)
                </span>
              </div>
              <div className="flex justify-between">
                <span>New End Date:</span>
                <span className="font-medium">
                  {new Date(formData.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total Amount:</span>
                <span>
                  LKR{" "}
                  {getPlanPrice(formData.planType, formData.duration).toFixed(
                    2,
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="hover:bg-gray-100 hover:text-black"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="hover:bg-red-700">
            Renew Membership
          </Button>
        </div>
      </form>
    </div>
  );
}
