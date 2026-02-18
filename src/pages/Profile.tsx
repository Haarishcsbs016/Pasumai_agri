
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, LogOut } from 'lucide-react';
import LanguageToggle from '@/components/common/LanguageToggle';
import { Separator } from '@/components/ui/separator';

const Profile: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  
  const textClass = language === 'ta' ? 'font-tamil' : '';

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${textClass}`}>{t('profile')}</h1>
        
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-4 rounded-full">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <CardTitle className={textClass}>{user?.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {user?.phoneNumber}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className={`font-medium mb-2 ${textClass}`}>
                    {language === 'en' ? 'Farm Information' : 'பண்ணை தகவல்'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">
                        {language === 'en' ? 'Total Farm Area' : 'மொத்த பண்ணை பரப்பளவு'}
                      </p>
                      <p className="font-medium">8 {language === 'en' ? 'acres' : 'ஏக்கர்'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">
                        {language === 'en' ? 'Active Crops' : 'செயலில் உள்ள பயிர்கள்'}
                      </p>
                      <p className="font-medium">4</p>
                    </div>
                    <div>
                      <p className="text-gray-500">
                        {language === 'en' ? 'Village' : 'கிராமம்'}
                      </p>
                      <p className="font-medium">{language === 'en' ? 'Thiruvaiyaru' : 'திருவையாறு'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">
                        {language === 'en' ? 'District' : 'மாவட்டம்'}
                      </p>
                      <p className="font-medium">{language === 'en' ? 'Thanjavur' : 'தஞ்சாவூர்'}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className={`font-medium mb-2 ${textClass}`}>
                    {t('language')}
                  </h3>
                  <LanguageToggle />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Button 
                onClick={logout} 
                variant="destructive" 
                className={`flex items-center gap-2 ${textClass}`}
              >
                <LogOut className="h-4 w-4" />
                {t('logout')}
              </Button>
            </CardFooter>
          </Card>
          
          {/* App Info */}
          <Card>
            <CardHeader>
              <CardTitle className={textClass}>
                {language === 'en' ? 'About PasumaiAI' : 'பசுமை AI பற்றி'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-sm space-y-4">
              <p className={textClass}>
                {language === 'en' 
                  ? 'PasumaiAI is your smart farming assistant, helping you optimize crop management, get timely alerts, and increase your yield.' 
                  : 'பசுமை AI உங்கள் ஸ்மார்ட் விவசாய உதவியாளர், பயிர் மேலாண்மையை உகந்ததாக்க, சரியான நேரத்தில் எச்சரிக்கைகளைப் பெற மற்றும் உங்கள் விளைச்சலை அதிகரிக்க உதவுகிறது.'}
              </p>
              <p className={textClass}>
                {language === 'en' ? 'Version 1.0.0' : 'பதிப்பு 1.0.0'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
