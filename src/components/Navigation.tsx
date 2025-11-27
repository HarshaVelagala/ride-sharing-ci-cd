import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, History, User, MapPin, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'book', label: 'Book Ride', icon: Car },
    { id: 'track', label: 'Track Driver', icon: MapPin },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-center gap-2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-elevated border border-border">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'ride' : 'ghost'}
            size="sm"
            onClick={() => onTabChange(item.id)}
            className="gap-2 px-4 py-2 rounded-full"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
        <div className="w-px h-6 bg-border mx-2" />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAuthClick}
          className="gap-2 px-4 py-2 rounded-full"
        >
          {user ? (
            <>
              <LogOut className="h-4 w-4" />
              Logout
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Login
            </>
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="fixed top-4 right-4 z-50 rounded-full shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleMobileMenu} />
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-16 right-4 bg-white rounded-2xl shadow-elevated border border-border p-4 z-50 min-w-[200px]">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'ride' : 'ghost'}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start gap-3 h-12"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {activeTab === item.id && (
                    <Badge variant="secondary" className="ml-auto">
                      Active
                    </Badge>
                  )}
                </Button>
              ))}
              <div className="border-t pt-2 mt-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleAuthClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start gap-3 h-12"
                >
                  {user ? (
                    <>
                      <LogOut className="h-4 w-4" />
                      Logout
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Login
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border p-4 z-30">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onTabChange(item.id)}
                className="flex-col gap-1 h-auto py-2 px-3"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAuthClick}
              className="flex-col gap-1 h-auto py-2 px-3"
            >
              {user ? (
                <LogOut className="h-4 w-4" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              <span className="text-xs">{user ? 'Logout' : 'Login'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navigation;