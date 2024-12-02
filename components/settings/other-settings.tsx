"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";

export default function OtherSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="border-b-2 border-primary-light">
          <CardTitle>Language Settings</CardTitle>
          <CardDescription>
            Change your language settings to your preferred language.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <Label>New Language</Label>
              <Select>
                <SelectTrigger className="w-[350px]">
                  <SelectValue placeholder="English UK" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-uk">English UK</SelectItem>
                  <SelectItem value="en-us">English US</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="ml-auto">Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dark Mode</CardTitle>
          <CardDescription>
            We will adjust the appearance of your dashboard to what you want
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="light" className="md:space-y-6 space-y-4">
            <div className="flex justify-between w-full items-center space-x-2">
              <Label htmlFor="light">Light Mode</Label>
              <Checkbox value="light" id="light" />
            </div>
            <div className="flex justify-between w-full items-center space-x-2">
              <Label htmlFor="dark">Dark Mode</Label>
              <Checkbox value="dark" id="dark" />
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log out of all devices</CardTitle>
          <CardDescription>
            If you detect any unusual activities, ensure to log out of UZEL on
            all devices and web browsers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col">
          <p className="text-sm text-muted-foreground">
            If you notice any unusual activity on your account, such as an
            unrecognized login or an unexpected account activity, it is
            important to take immediate steps to safeguard your UZEL account.
          </p>
          <Button variant="destructive" className="ml-auto">
            Logout of all devices
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Close your account</CardTitle>
          <CardDescription>Do you want to stop using UZEL?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col">
          <p className="text-sm text-muted-foreground">
            Hello. We are pained to see you leave us. By clicking on the button
            below, you will begin the process of deleting your UZEL account.
            Once you've done so, you will no longer have access to the account.
          </p>
          <Button variant="destructive" className="ml-auto">
            Close my UZEL account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
