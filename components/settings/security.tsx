"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="border-b-2 border-primary-light">
          <CardTitle>Two-factor Authentication</CardTitle>
          <CardDescription>
            To ensure it's genuinely you accessing your account and for any
            transaction you initiate, enhancing the security of your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Authentication</Label>
              <p className="text-sm text-muted-foreground">
                You'll receive a verification code via text message. A mobile
                phone is required for this process.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Authentication</Label>
              <p className="text-sm text-muted-foreground">
                A verification code will be dispatched to the email address you
                provided during your account setup.
              </p>
            </div>
            <Switch />
          </div>
          <Button className="w-full sm:w-auto">Update</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Account Password</CardTitle>
          <CardDescription>
            Change your login password using this field, an sms will be sent to
            your mail to validate this request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" />
              </div>
            </div>
            <Button className="w-full sm:w-auto">Change Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
