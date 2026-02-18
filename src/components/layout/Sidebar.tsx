import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, Leaf, Camera, BarChart3, User, LogOut, Menu, X, Bell, CloudSun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/common/LanguageToggle';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Sidebar: React.FC = () => {
  const { t, language } = useLanguage();
  const { logout, user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const textClass = language === 'ta' ? 'font-tamil' : '';

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: Home },
    { name: t('crops'), path: '/crops', icon: Leaf },
    { name: t('cropIdentify'), path: '/crop-identification', icon: Camera },
    { name: t('market'), path: '/market', icon: BarChart3 },
    { name: t('weather'), path: '/weather', icon: CloudSun },
    { name: t('notifications'), path: '/notifications', icon: Bell },
    { name: t('profile'), path: '/profile', icon: User },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4">
        <div className="flex-1">
          <h2 className={`text-2xl font-bold text-primary ${textClass}`}>{t('appName')}</h2>
        </div>
      </div>
      
      <Separator className="my-2" />
      
      <div className="flex-1 py-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg mb-1",
              isActive(item.path) 
                ? "bg-primary text-primary-foreground" 
                : "text-gray-700 hover:bg-primary-50"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className={textClass}>{item.name}</span>
          </Link>
        ))}
      </div>
      
      <div className="p-4 mt-auto">
        <LanguageToggle />
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${textClass}`}>{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.phoneNumber}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout} 
            className="text-gray-500 hover:text-red-500"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <SidebarContent />
        </div>
      </div>
      
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <h1 className={`text-xl font-bold text-primary ${textClass}`}>{t('appName')}</h1>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle className={`text-xl font-bold text-primary ${textClass}`}>{t('appName')}</SheetTitle>
            </SheetHeader>
            <div className="mt-4 h-[calc(100vh-5rem)]">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
