"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Calendar, CreditCard, Package } from "lucide-react";

interface OrderDetailsProps {
  order: any;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Shipped
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{order.id}</h2>
          <p className="text-muted-foreground">
            Order placed on {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        {getStatusBadge(order.status)}
      </div>

      <Separator />

      {/* Order Information Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="text-sm">{order.customerName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Customer ID
              </label>
              <p className="text-sm">{order.customerId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Order Date
              </label>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-3 w-3" />
                {new Date(order.date).toLocaleDateString()}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Payment Method
              </label>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-3 w-3" />
                {order.paymentMethod}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <div className="text-sm">{order.status}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Items included in this order</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>LKR {item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">
                    LKR {(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator className="my-4" />

          <div className="flex justify-end">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Subtotal:</span>
                <span className="text-sm font-medium">
                  LKR {order.total.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Tax:</span>
                <span className="text-sm font-medium">LKR 0.00</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">Total:</span>
                <span className="text-lg font-bold">
                  LKR {order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
