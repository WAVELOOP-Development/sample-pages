"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export function ShopManagement() {
  const router = useRouter();

  const handleNavigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[90vh] bg-white p-6 flex items-center justify-center">
      <Card className="max-w-md bg-white shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-red-600" />
          </div>

          <CardTitle className="text-2xl font-bold text-black mb-2">
            Shop Management
          </CardTitle>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-red-600" />
            <span className="text-lg font-semibold text-black">
              Coming Soon
            </span>
          </div>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-black mb-6">
            Shop Management is coming soon. This feature is currently under
            development and will be available in the next update.
          </p>

          <Button
            onClick={handleNavigateToDashboard}
            className="bg-red-600 hover:bg-red-700 text-white border-0"
          >
            Navigate to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
