"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface PlanFormProps {
  plan?: any
  onSubmit: (plan: any) => void
}

export function PlanForm({ plan, onSubmit }: PlanFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "Monthly",
    description: "",
    features: [] as string[],
    color: "bg-gray-100 text-gray-800",
  })
  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || "",
        price: plan.price?.toString() || "",
        duration: plan.duration || "Monthly",
        description: plan.description || "",
        features: plan.features || [],
        color: plan.color || "bg-gray-100 text-gray-800",
      })
    }
  }, [plan])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const planData = {
      ...formData,
      price: Number.parseFloat(formData.price),
    }
    onSubmit(planData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Plan Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Premium"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration *</Label>
          <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Quarterly">Quarterly</SelectItem>
              <SelectItem value="Annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Badge Color</Label>
          <Select value={formData.color} onValueChange={(value) => handleChange("color", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bg-gray-100 text-gray-800">Gray</SelectItem>
              <SelectItem value="bg-blue-100 text-blue-800">Blue</SelectItem>
              <SelectItem value="bg-purple-100 text-purple-800">Purple</SelectItem>
              <SelectItem value="bg-green-100 text-green-800">Green</SelectItem>
              <SelectItem value="bg-yellow-100 text-yellow-800">Yellow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Brief description of the plan"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {feature}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(index)} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">{plan ? "Update Plan" : "Create Plan"}</Button>
      </div>
    </form>
  )
}
