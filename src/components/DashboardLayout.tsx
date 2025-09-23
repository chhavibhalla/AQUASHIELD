import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Droplets, 
  Home, 
  MapPin, 
  Activity, 
  TrendingUp, 
  Bell, 
  Users, 
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/overview', label: 'Overview', icon: Home },
    { path: '/map', label: 'Map View', icon: MapPin },
    { path: '/sensors', label: 'Sensors', icon: Activity },
    { path: '/risk-forecast', label: 'Risk Forecast', icon: TrendingUp },
    { path: '/alerts', label: 'Alerts & Dispatch', icon: Bell },
    { path: '/volunteers', label: 'Community', icon: Users },
    { path: '/admin', label: 'Admin Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-md">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">AquaShield</h2>
            <p className="text-xs text-muted-foreground">Water Quality Monitor</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.path}
              className={`w-full justify-start gap-3 h-12 ${
                isActive(item.path) 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Status & Logout */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <Badge className="bg-success/10 text-success border-success/20">
            System Online
          </Badge>
          <Badge className="text-xs">
            v2.1.0
          </Badge>
        </div>
        
        <Button 
    
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground border border-border"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-card border-r border-border shadow-sm">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-foreground">AquaShield</h2>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="p-1.5">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0" asChild>
                <div>
                    <SidebarContent />
                </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;