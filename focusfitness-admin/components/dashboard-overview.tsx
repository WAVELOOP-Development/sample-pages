"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  DollarSign,
  Calendar,
  UserPlus,
  ShoppingCart,
  Activity,
  Target,
} from "lucide-react";

// Mock data for charts
const memberGrowthData = [
  { month: "Jan", members: 120 },
  { month: "Feb", members: 135 },
  { month: "Mar", members: 148 },
  { month: "Apr", members: 162 },
  { month: "May", members: 178 },
  { month: "Jun", members: 195 },
];

const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 13200 },
  { month: "Mar", revenue: 14100 },
  { month: "Apr", revenue: 15300 },
  { month: "May", revenue: 16800 },
  { month: "Jun", revenue: 18200 },
];

const membershipData = [
  { name: "Basic", value: 45, color: "#b2b2b2" },
  { name: "Premium", value: 35, color: "#E54E25" },
  { name: "VIP", value: 20, color: "#000000" },
];

const COLORS = ["#6366f1", "#4f46e5", "#3b82f6"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function DashboardOverview() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at your gym today.
        </p>
      </div>
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">195</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">LKR 135,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today Attendance
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">Peak: 2-4 PM</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-start items-end">
              <div className="text-3xl font-bold">73%</div>
              <p className="text-xs text-muted-foreground ml-2">Used</p>
            </div>
            <Progress value={73} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Member Growth</CardTitle>
            <CardDescription>
              Monthly member acquisition over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={memberGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="members"
                  fill="hsl(var(--primary))"
                  barSize={60}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
            <CardDescription>Current membership plan breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-full justify-between">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={membershipData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {membershipData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {membershipData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">
                      {entry.name}: {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`LKR ${value}`, "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#000000"
                activeDot={{ r: 8 }}
              />

              {/* <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#6366f1", strokeWidth: 2 }}
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button
              className="h-auto p-4 flex flex-col gap-2 cursor-pointer"
              onClick={() => router.push("/dashboard/members")}
            >
              <UserPlus className="h-5 w-5" />
              <span>Add Member</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2 bg-transparent  cursor-pointer"
              onClick={() => router.push("/dashboard/payments")}
            >
              <DollarSign className="h-5 w-5" />
              <span>Record Payment</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2 bg-transparent  cursor-pointer"
              onClick={() => router.push("/dashboard/shop")}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>New Order</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2 bg-transparent  cursor-pointer"
              onClick={() => router.push("/dashboard/plans")}
            >
              <Calendar className="h-5 w-5" />
              <span>Add Plan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New member registration</p>
                <p className="text-xs text-muted-foreground">
                  Sarah Johnson joined Premium plan
                </p>
              </div>
              <Badge variant="secondary">2 min ago</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-xs text-muted-foreground">
                  Monthly payment from Mike Chen
                </p>
              </div>
              <Badge variant="secondary">15 min ago</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Shop order completed</p>
                <p className="text-xs text-muted-foreground">
                  Protein powder order #1234
                </p>
              </div>
              <Badge variant="secondary">1 hour ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
