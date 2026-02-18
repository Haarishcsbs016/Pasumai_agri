
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudSun, Droplet, Leaf, Calendar, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  
  const textClass = language === 'ta' ? 'font-tamil' : '';

  // Mock data
  const weatherInfo = {
    temp: 28,
    condition: language === 'en' ? 'Sunny' : 'வெயில்',
    humidity: 65,
  };
  
  const crops = [
    {
      id: 1,
      name: language === 'en' ? 'Rice' : 'நெல்',
      plantedDate: '2023-03-15',
      area: 2.5,
      irrigationDue: '2023-04-02', // Next irrigation date
      fertilizerDue: '2023-04-10', // Next fertilizer date
      daysToHarvest: 45,
      expectedPrice: 2200,
    },
    {
      id: 2,
      name: language === 'en' ? 'Tomato' : 'தக்காளி',
      plantedDate: '2023-03-25',
      area: 1,
      irrigationDue: '2023-04-01',
      fertilizerDue: '2023-04-15',
      daysToHarvest: 30,
      expectedPrice: 15,
    },
  ];
  
  const notifications = [
    {
      id: 1,
      type: 'irrigation',
      message: language === 'en' 
        ? 'Irrigation due tomorrow for Tomato' 
        : 'நாளை தக்காளிக்கு நீர் பாய்ச்ச வேண்டியுள்ளது',
      icon: Droplet,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      type: 'weather',
      message: language === 'en' 
        ? 'Light rain expected tomorrow' 
        : 'நாளை லேசான மழை எதிர்பார்க்கப்படுகிறது',
      icon: CloudSun,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
    },
    {
      id: 3,
      type: 'alert',
      message: language === 'en' 
        ? 'Pest alert for Rice crop' 
        : 'நெல் பயிருக்கு பூச்சி எச்சரிக்கை',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${textClass}`}>
            {t('welcome')}, {user?.name}!
          </h1>
        </div>
        
        {/* Weather Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className={`flex items-center ${textClass}`}>
              <CloudSun className="mr-2 h-5 w-5 text-blue-500" />
              {t('weather')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold">{weatherInfo.temp}°C</h3>
                <p className={`text-gray-500 ${textClass}`}>{weatherInfo.condition}</p>
              </div>
              <div className="text-right">
                <div className={`text-gray-500 ${textClass}`}>
                  {language === 'en' ? 'Humidity' : 'ஈரப்பதம்'}: {weatherInfo.humidity}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Crop Summary */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-semibold ${textClass}`}>{t('crops')}</h2>
            <Link to="/crops">
              <Button variant="outline" size="sm">
                <span className={textClass}>
                  {language === 'en' ? 'View All' : 'அனைத்தையும் பார்க்க'}
                </span>
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crops.map(crop => (
              <Card key={crop.id} className="overflow-hidden">
                <div className="bg-primary-100 p-3">
                  <h3 className={`text-lg font-bold ${textClass}`}>{crop.name}</h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Area' : 'பரப்பளவு'}: {crop.area} {language === 'en' ? 'acres' : 'ஏக்கர்'}
                  </p>
                </div>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm font-medium text-gray-500 flex items-center ${textClass}`}>
                        <Droplet className="mr-1 h-4 w-4 text-blue-500" /> {t('irrigationDue')}
                      </p>
                      <p className="font-medium">{new Date(crop.irrigationDue).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium text-gray-500 flex items-center ${textClass}`}>
                        <Leaf className="mr-1 h-4 w-4 text-green-500" /> {t('fertilizerDue')}
                      </p>
                      <p className="font-medium">{new Date(crop.fertilizerDue).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium text-gray-500 flex items-center ${textClass}`}>
                        <Calendar className="mr-1 h-4 w-4 text-orange-500" /> {t('daysToHarvest')}
                      </p>
                      <p className="font-medium">{crop.daysToHarvest} {language === 'en' ? 'days' : 'நாட்கள்'}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className={`w-full ${textClass}`} variant="outline">
                    {t('guideMe')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Link to="/crops/add" className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-full min-h-[200px] hover:border-primary hover:bg-primary-50 transition-colors">
                <div className="text-center p-4">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className={`font-medium ${textClass}`}>{t('addCrop')}</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${textClass}`}>{t('notifications')}</h2>
          
          <div className="space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg flex items-center ${notification.bgColor}`}
              >
                <div className={`p-2 rounded-full ${notification.color} bg-white mr-3 flex-shrink-0`}>
                  <notification.icon className="h-5 w-5" />
                </div>
                <p className={`${textClass} flex-grow`}>{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
