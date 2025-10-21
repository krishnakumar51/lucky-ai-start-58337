import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Mail, Calendar, Shield } from 'lucide-react';

const User = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto bg-scraper-bg-card border-scraper-border">
          <CardHeader>
            <CardTitle className="text-scraper-text-primary">Access Denied</CardTitle>
            <CardDescription className="text-scraper-text-muted">
              You need to be logged in to view this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-scraper-text-primary mb-2">
            User Profile
          </h1>
          <p className="text-scraper-text-muted">
            Manage your account information and preferences
          </p>
        </div>

        {/* Top banner with avatar */}
        <Card className="bg-scraper-bg-card border-scraper-border mb-6">
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-scraper-bg-secondary flex items-center justify-center text-scraper-text-primary text-xl font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xl font-semibold text-scraper-text-primary">{user.email}</div>
                <div className="text-sm text-scraper-text-muted">Member since {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Information */}
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-scraper-text-primary">
                <UserIcon className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-scraper-text-muted">
                Your basic account details
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-scraper-text-muted" />
                <div>
                  <p className="text-sm font-medium text-scraper-text-primary">
                    Email
                  </p>
                  <p className="text-sm text-scraper-text-muted">
                    {user.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-scraper-text-muted" />
                <div>
                  <p className="text-sm font-medium text-scraper-text-primary">
                    Member Since
                  </p>
                  <p className="text-sm text-scraper-text-muted">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-scraper-text-muted" />
                <div>
                  <p className="text-sm font-medium text-scraper-text-primary">
                    Account Status
                  </p>
                  <p className="text-sm text-green-400">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader>
              <CardTitle className="text-scraper-text-primary">Account Actions</CardTitle>
              <CardDescription className="text-scraper-text-muted">
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-secondary"
              >
                Change Password
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-secondary"
              >
                Update Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-secondary"
              >
                Privacy Settings
              </Button>
              <Button 
                onClick={logout}
                variant="destructive" 
                className="w-full justify-start"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader>
              <CardTitle className="text-scraper-text-primary">Usage Statistics</CardTitle>
              <CardDescription className="text-scraper-text-muted">
                Your activity overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-scraper-text-muted">Scraping Sessions</span>
                <span className="text-sm font-medium text-scraper-text-primary">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-scraper-text-muted">Data Points Collected</span>
                <span className="text-sm font-medium text-scraper-text-primary">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-scraper-text-muted">Last Activity</span>
                <span className="text-sm font-medium text-scraper-text-primary">2 hours ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;