"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"

interface AddPaymentFormProps {
  onSubmit: (payment: any) => void
  members: any[]
}

export function AddPaymentForm({ onSubmit, members }: AddPaymentFormProps) {
  const [formData, setFormData] = useState({
    memberId: "",
    memberName: "",
    amount: "",
    period: "",
    method: "",
    notes: "",
  })
  const [memberSearch, setMemberSearch] = useState("")
  const [showMemberList, setShowMemberList] = useState(false)

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearch.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.memberId || !formData.amount || !formData.period || !formData.method) {
      alert("Please fill in all required fields")
      return
    }

    onSubmit({
      ...formData,
      amount: Number.parseFloat(formData.amount),
    })

    // Reset form
    setFormData({
      memberId: "",
      memberName: "",
      amount: "",
      period: "",
      method: "",
      notes: "",
    })
    setMemberSearch("")
  }

  const handleMemberSelect = (member: any) => {
    setFormData((prev) => ({
      ...prev,
      memberId: member.id,
      memberName: member.name,
    }))
    setMemberSearch(member.name)
    setShowMemberList(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Generate current and next month options
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long", year: "numeric" })
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Member Selection */}
      <div className="space-y-2">
        <Label htmlFor="member">Select Member *</Label>
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="member"
              value={memberSearch}
              onChange={(e) => {
                setMemberSearch(e.target.value)
                setShowMemberList(true)
              }}
              onFocus={() => setShowMemberList(true)}
              placeholder="Search for a member..."
              className="pl-10"
              required
            />
          </div>
          {showMemberList && memberSearch && (
            <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer"
                  onClick={() => handleMemberSelect(member)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Time Period */}
        <div className="space-y-2">
          <Label htmlFor="period">Time Period *</Label>
          <Select value={formData.period} onValueChange={(value) => handleChange("period", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select billing period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={currentMonth}>{currentMonth}</SelectItem>
              <SelectItem value={nextMonth}>{nextMonth}</SelectItem>
              <SelectItem value="Annual 2024">Annual 2024</SelectItem>
              <SelectItem value="Quarterly Q2 2024">Quarterly Q2 2024</SelectItem>
              <SelectItem value="Quarterly Q3 2024">Quarterly Q3 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="amount">Price *</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-2">
        <Label htmlFor="method">Payment Method *</Label>
        <Select value={formData.method} onValueChange={(value) => handleChange("method", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Payment Gateway">Payment Gateway</SelectItem>
            <SelectItem value="Direct Bank Deposit">Direct Bank Deposit</SelectItem>
            <SelectItem value="Cash">Cash</SelectItem>
            <SelectItem value="Credit Card">Credit Card</SelectItem>
            <SelectItem value="Check">Check</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Additional notes about this payment..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Record Payment</Button>
      </div>
    </form>
  )
}
