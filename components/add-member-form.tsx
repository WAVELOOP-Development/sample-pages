"use client";

import type React from "react";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

interface AddMemberFormProps {
  onSubmit: (member: any) => void;
  onCancel?: () => void;
  initialData?: any;
  mode?: "add" | "edit";
}

export function AddMemberForm({
  onSubmit,
  onCancel,
  initialData,
  mode = "add",
}: AddMemberFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    plan: initialData?.plan || "",
    status: initialData?.status || "Active",
    emergencyContact: initialData?.emergencyContact || "",
    emergencyPhone: initialData?.emergencyPhone || "",
    notes: initialData?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (mode === "add") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        plan: "",
        status: "Active",
        emergencyContact: "",
        emergencyPhone: "",
        notes: "",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="plan">Membership Plan *</Label>
          <Select
            value={formData.plan}
            onValueChange={(value) => handleChange("plan", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basic">Basic - $29/month</SelectItem>
              <SelectItem value="Premium">Premium - $49/month</SelectItem>
              <SelectItem value="VIP">VIP - $79/month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleChange("emergencyContact", e.target.value)}
            placeholder="Emergency contact name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyPhone">Emergency Phone</Label>
          <Input
            id="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={(e) => handleChange("emergencyPhone", e.target.value)}
            placeholder="Emergency contact phone"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Additional notes about the member"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "edit" ? "Update Member" : "Add Member"}
        </Button>
      </div>
    </form>
  );
}
