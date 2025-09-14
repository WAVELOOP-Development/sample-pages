"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddMemberForm({
  onSubmit,
  onCancel,
  initialData = {},
  mode = "add",
  loading = false,
}: {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  mode?: "add" | "edit";
  loading?: boolean;
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    plan: initialData.plan || "",
    emergencyContact: initialData.emergencyName || "",
    emergencyPhone: initialData.emergencyNumber || "",
    notes: initialData.notes || "",
    status: initialData.status || "active",
  });
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const errs: any = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10,}$/.test(form.phone))
      errs.phone = "Valid phone required";
    if (!form.plan.trim()) errs.plan = "Plan is required";
    return errs;
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <form className="space-y-6 px-2 py-2" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Full Name<span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <div className="text-red-500 text-xs mt-1">{errors.name}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email<span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <div className="text-red-500 text-xs mt-1">{errors.email}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="plan">
            Plan<span className="text-red-500">*</span>
          </label>
          <Select
            value={form.plan}
            onValueChange={(value) => setForm({ ...form, plan: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
            </SelectContent>
          </Select>
          {errors.plan && (
            <div className="text-red-500 text-xs mt-1">{errors.plan}</div>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="emergencyContact"
          >
            Emergency Contact Name
          </label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            placeholder="Emergency Contact Name"
            value={form.emergencyContact}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="emergencyPhone"
          >
            Emergency Contact Phone
          </label>
          <Input
            id="emergencyPhone"
            name="emergencyPhone"
            placeholder="Emergency Contact Phone"
            value={form.emergencyPhone}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="notes">
          Additional Notes
        </label>
        <Input
          id="notes"
          name="notes"
          placeholder="Additional Notes"
          value={form.notes}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : mode === "edit"
            ? "Update"
            : "Add Member"}
        </Button>
      </div>
    </form>
  );
}
