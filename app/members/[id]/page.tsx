"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Activity,
  Calendar,
  CreditCard,
  Mail,
  Phone,
  User,
  Clock,
  Award,
  Edit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembershipHistory } from "@/components/members/membership-history";
import { AttendanceChart } from "@/components/members/attendance-chart";
import { PaymentHistory } from "@/components/members/payment-history";
import { toast } from "sonner";

// Mock data for demonstration
const memberData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 000-0000",
  membershipType: "Premium",
  status: "active",
  joinDate: "2024-01-15",
  photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  lastVisit: "2024-03-21",
  membershipExpiry: "2024-12-31",
};

export default function MemberDetail() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Member deleted successfully");
      // Add navigation logic here
    } catch (error) {
      toast.error("Failed to delete member");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Member Details</h1>
          <p className="text-muted-foreground">
            View and manage member information
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Member
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            <Trash className="mr-2 h-4 w-4" />
            {isLoading ? "Deleting..." : "Delete Member"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={memberData.photo} alt={memberData.name} />
                <AvatarFallback>
                  {memberData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{memberData.name}</h3>
                <Badge variant={memberData.status === "active" ? "default" : "secondary"}>
                  {memberData.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{memberData.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{memberData.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(memberData.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Last visit {new Date(memberData.lastVisit).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {memberData.membershipType} Membership
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Expires {new Date(memberData.membershipExpiry).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="attendance">Attendance History</TabsTrigger>
          <TabsTrigger value="membership">Membership History</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>
                Member&apos;s attendance over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AttendanceChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="membership">
          <MembershipHistory />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}