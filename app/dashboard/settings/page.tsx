"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Star, UserCircle } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [accountForm, setAccountForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com"
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyDigest: true,
    jobAlerts: true,
    darkMode: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAccountUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Account details updated successfully");
    }, 1000);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      toast.success("Password updated successfully");
    }, 1000);
  };
  
  const handlePreferencesUpdate = () => {
    toast.success("Preferences updated");
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5" />
                      <span>Account Details</span>
                    </CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleAccountUpdate}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={accountForm.name} 
                          onChange={e => setAccountForm({...accountForm, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={accountForm.email} 
                          onChange={e => setAccountForm({...accountForm, email: e.target.value})}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update details"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      <span>Password</span>
                    </CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <form onSubmit={handlePasswordUpdate}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input 
                          id="current" 
                          type="password" 
                          value={passwordForm.currentPassword}
                          onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input 
                          id="new" 
                          type="password" 
                          value={passwordForm.newPassword}
                          onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm New Password</Label>
                        <Input 
                          id="confirm" 
                          type="password" 
                          value={passwordForm.confirmPassword}
                          onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Change password"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Danger Zone</span>
                    </CardTitle>
                    <CardDescription>
                      Actions here cannot be undone
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Deleting your account will remove all of your data from our servers. This action is permanent and cannot be reversed.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                        <span>Email Notifications</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive emails about account activity
                        </span>
                      </Label>
                      <Switch 
                        id="email-notifications" 
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, emailNotifications: checked})
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="weekly-digest" className="flex flex-col space-y-1">
                        <span>Weekly Digest</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive a weekly summary of your account activity
                        </span>
                      </Label>
                      <Switch 
                        id="weekly-digest" 
                        checked={preferences.weeklyDigest}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, weeklyDigest: checked})
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="job-alerts" className="flex flex-col space-y-1">
                        <span>Job Alerts</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications about new jobs matching your profile
                        </span>
                      </Label>
                      <Switch 
                        id="job-alerts" 
                        checked={preferences.jobAlerts}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, jobAlerts: checked})
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handlePreferencesUpdate}>
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="subscription" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Current Plan: Free</span>
                    </CardTitle>
                    <CardDescription>
                      Upgrade to access premium features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-1">Free Plan</h3>
                      <p className="text-sm text-muted-foreground mb-2">Your current plan includes:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 1 resume template</li>
                        <li>• Basic AI suggestions</li>
                        <li>• PDF export</li>
                        <li>• Limited saves (1 resume)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4 bg-primary/5">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium mb-1 flex items-center">
                            Pro Plan
                            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Recommended</span>
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">$9.99/month</p>
                        </div>
                        <Button>Upgrade</Button>
                      </div>
                      <ul className="text-sm space-y-1 mt-3">
                        <li>• 10+ premium templates</li>
                        <li>• Advanced AI optimization</li>
                        <li>• Job description matching</li>
                        <li>• Unlimited resumes</li>
                        <li>• Cover letter assistance</li>
                        <li>• Priority support</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}