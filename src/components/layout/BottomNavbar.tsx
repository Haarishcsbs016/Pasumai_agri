import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Leaf, Camera, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavbar: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const textClass = language === 'ta' ? 'font-tamil text-xs' : 'text-xs';

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: Home },
    { name: t('crops'), path: '/crops', icon: Leaf },
    { name: t('cropIdentify'), path: '/crop-identification', icon: Camera },
    { name: t('market'), path: '/market', icon: BarChart3 },
    { name: t('profile'), path: '/profile', icon: User },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-4 shadow-lg md:hidden z-10">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full",
            isActive(item.path) 
              ? "text-primary" 
              : "text-gray-500 hover:text-primary"
          )}
        >
          <item.icon className="h-5 w-5 mb-1" />
          <span className={textClass}>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavbar;
