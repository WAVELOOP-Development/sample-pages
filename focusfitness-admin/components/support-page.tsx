"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  HelpCircle,
  Book,
  MessageCircle,
  ExternalLink,
  Users,
  Settings,
  CreditCard,
  Shield,
} from "lucide-react"

export function SupportPage() {
  const contactInfo = {
    email: "support@focusfitness.com",
    phone: "+1 (555) 123-HELP",
    address: "123 Fitness Street, Downtown, NY 10001",
    hours: "Monday - Friday: 6:00 AM - 10:00 PM\nSaturday - Sunday: 7:00 AM - 9:00 PM",
  }

  const helpTopics = [
    {
      icon: Users,
      title: "Member Management",
      description: "Adding, editing, and managing member profiles and information",
      articles: ["How to add a new member", "Updating member information", "Managing member status"],
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Recording payments, managing billing, and financial tracking",
      articles: ["Recording manual payments", "Setting up auto-renewal", "Generating payment reports"],
    },
    {
      icon: Settings,
      title: "System Settings",
      description: "Configuring gym settings, plans, and administrative options",
      articles: ["Creating membership plans", "Managing gym settings", "User permissions"],
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Account security, data protection, and privacy settings",
      articles: ["Password security", "Data backup procedures", "Privacy compliance"],
    },
  ]

  const quickLinks = [
    { title: "User Manual", description: "Complete guide to using the dashboard", icon: Book },
    { title: "Video Tutorials", description: "Step-by-step video guides", icon: ExternalLink },
    { title: "Community Forum", description: "Connect with other gym administrators", icon: MessageCircle },
    { title: "Feature Requests", description: "Suggest new features and improvements", icon: HelpCircle },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support & Help</h1>
          <p className="text-muted-foreground">Get help and find resources for managing your gym</p>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-sm text-muted-foreground">For general inquiries and technical support</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-sm text-primary hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-sm text-muted-foreground">For urgent issues and immediate assistance</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-sm text-primary hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Office Address</h3>
                  <p className="text-sm text-muted-foreground">Visit us for in-person support</p>
                  <p className="text-sm">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Support Hours</h3>
                  <p className="text-sm text-muted-foreground">When our team is available</p>
                  <p className="text-sm whitespace-pre-line">{contactInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help Topics
          </CardTitle>
          <CardDescription>Browse common topics and find answers to frequently asked questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {helpTopics.map((topic, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
                <div className="ml-13 space-y-1">
                  {topic.articles.map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                      <button className="text-sm text-primary hover:underline text-left">{article}</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Helpful resources and additional support options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <link.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Shield className="h-5 w-5" />
            Emergency Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-yellow-800">
              For critical system issues or emergencies that affect gym operations:
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-yellow-300 text-yellow-800">
                24/7 Emergency Line
              </Badge>
              <a href="tel:+15551234911" className="text-sm font-medium text-yellow-800 hover:underline">
                +1 (555) 123-4911
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current status of FocusFitness services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Dashboard System</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payment Processing</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Member Database</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backup Systems</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleString()} • All systems operational
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
