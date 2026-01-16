import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Store, Shield } from "lucide-react";

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your store settings</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Store Information
              </CardTitle>
              <CardDescription>
                Basic information about your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input value="VYSTRA" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input value="aaryan100m@gmail.com" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone 1</Label>
                  <Input value="8830764356" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Phone 2</Label>
                  <Input value="7499452407" disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Shipping Settings
              </CardTitle>
              <CardDescription>
                Configure shipping options and rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Free Shipping Threshold (₹)</Label>
                  <Input type="number" value="999" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Standard Shipping Rate (₹)</Label>
                  <Input type="number" value="49" disabled />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Contact support to update shipping settings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
              <CardDescription>
                Admin access and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Admin roles are managed through the database. Contact your
                developer to add or remove admin users.
              </p>
              <Button variant="outline" disabled>
                Manage Admin Users
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
