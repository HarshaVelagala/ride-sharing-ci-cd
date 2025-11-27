import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Star, 
  CreditCard, 
  MapPin, 
  Bell, 
  Shield, 
  HeadphonesIcon,
  Settings,
  Gift,
  TrendingUp,
  LogIn
} from 'lucide-react';

const UserProfile = () => {
  const { user: authUser } = useAuth();
  
  // Use auth user data or fallback to demo data
  const user = authUser ? {
    name: authUser.name,
    email: authUser.email,
    phone: authUser.phone || "+1 (555) 123-4567",
    avatar: "",
    rating: 4.8,
    totalRides: 127,
    memberSince: "January 2023",
    favorites: ["Home", "Work", "Airport"],
    paymentMethods: ["**** 4532", "**** 7891"],
    achievements: ["5-Star Rider", "Eco Warrior", "Night Owl"]
  } : null;

  const menuItems = [
    { icon: User, label: "Edit Profile", description: "Update your personal information" },
    { icon: CreditCard, label: "Payment Methods", description: "Manage cards and payment options" },
    { icon: MapPin, label: "Saved Places", description: "Home, work, and favorite locations" },
    { icon: Bell, label: "Notifications", description: "Ride updates and promotional offers" },
    { icon: Shield, label: "Privacy & Safety", description: "Your security and privacy settings" },
    { icon: Gift, label: "Promotions", description: "Active coupons and referral rewards" },
    { icon: HeadphonesIcon, label: "Support", description: "Get help or report an issue" },
    { icon: Settings, label: "Settings", description: "App preferences and account settings" },
  ];

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-elevated border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold mb-2">Welcome to Hop On Ride Out</h2>
              <p className="text-muted-foreground">
                Please sign in to view your profile and access all features
              </p>
            </div>
            <Button variant="hero" className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="shadow-elevated border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 ring-2 ring-primary ring-offset-2">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-primary text-white text-lg font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{user.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{user.totalRides} rides</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <TrendingUp className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{user.totalRides}</p>
              <p className="text-xs text-muted-foreground">Total Rides</p>
            </div>
            <div className="text-center p-3 bg-secondary/5 rounded-lg border border-secondary/20">
              <Star className="h-5 w-5 text-secondary mx-auto mb-1" />
              <p className="text-lg font-bold text-secondary">{user.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center p-3 bg-accent rounded-lg border">
              <Gift className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">$25</p>
              <p className="text-xs text-muted-foreground">Credits</p>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {user.achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200 cursor-pointer border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="w-2 h-2 bg-muted rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-elevated border-0">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="hero" className="w-full gap-2">
            <Gift className="h-4 w-4" />
            Refer Friends & Earn $10
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <HeadphonesIcon className="h-4 w-4" />
              Support
            </Button>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Member Since */}
      <div className="text-center text-sm text-muted-foreground">
        Member since {user.memberSince}
      </div>
    </div>
  );
};

export default UserProfile;