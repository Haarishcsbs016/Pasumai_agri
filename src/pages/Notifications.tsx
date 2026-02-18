
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar, Droplet, CloudRain, AlertTriangle, Leaf } from 'lucide-react';

const Notifications: React.FC = () => {
  const { language } = useLanguage();
  const textClass = language === 'ta' ? 'font-tamil' : '';

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'irrigation',
      title: language === 'en' ? 'Irrigation Reminder' : 'நீர்ப்பாசன நினைவூட்டல்',
      message: language === 'en' 
        ? 'Your tomato crop needs irrigation today' 
        : 'உங்கள் தக்காளி பயிருக்கு இன்று நீர்ப்பாசனம் தேவை',
      date: '2023-04-18T08:00:00',
      icon: Droplet,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      type: 'weather',
      title: language === 'en' ? 'Weather Alert' : 'வானிலை எச்சரிக்கை',
      message: language === 'en' 
        ? 'Heavy rain expected tomorrow in your area' 
        : 'நாளை உங்கள் பகுதியில் கனமழை எதிர்பார்க்கப்படுகிறது',
      date: '2023-04-18T07:30:00',
      icon: CloudRain,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
    },
    {
      id: 3,
      type: 'alert',
      title: language === 'en' ? 'Pest Alert' : 'பூச்சி எச்சரிக்கை',
      message: language === 'en' 
        ? 'Potential pest infestation detected in rice crop area' 
        : 'நெல் பயிர் பகுதியில் பூச்சிகளின் தொற்று கண்டறியப்பட்டுள்ளது',
      date: '2023-04-17T16:45:00',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
    {
      id: 4,
      type: 'fertilizer',
      title: language === 'en' ? 'Fertilizer Application' : 'உரமிடல் நினைவூட்டல்',
      message: language === 'en' 
        ? 'Time to apply fertilizer for your okra crop' 
        : 'உங்கள் வெண்டைக்காய் பயிருக்கு உரமிட வேண்டிய நேரம்',
      date: '2023-04-17T09:15:00',
      icon: Leaf,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      id: 5,
      type: 'schedule',
      title: language === 'en' ? 'Harvest Schedule' : 'அறுவடை அட்டவணை',
      message: language === 'en' 
        ? 'Your cucumber crop will be ready for harvest in 5 days' 
        : 'உங்கள் வெள்ளரிக்காய் பயிர் 5 நாட்களில் அறுவடைக்கு தயாராக இருக்கும்',
      date: '2023-04-16T14:30:00',
      icon: Calendar,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
  ];

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(language === 'en' ? 'en-US' : 'ta-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${textClass}`}>
            {language === 'en' ? 'Notifications' : 'அறிவிப்புகள்'}
          </h1>
          <div className="flex gap-2">
            <Bell className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Notifications list */}
        <Card>
          <CardHeader>
            <CardTitle className={`text-xl ${textClass}`}>
              {language === 'en' ? 'Recent Notifications' : 'சமீபத்திய அறிவிப்புகள்'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg flex items-start ${notification.bgColor} border border-${notification.color.replace('text-', '')}/20`}
                >
                  <div className={`p-2 rounded-full ${notification.color} bg-white mr-3 flex-shrink-0`}>
                    <notification.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${textClass}`}>{notification.title}</h3>
                      <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                    </div>
                    <p className={`${textClass} text-gray-600 mt-1`}>{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {notifications.length === 0 && (
          <div className="text-center p-10">
            <Bell className="mx-auto h-10 w-10 text-gray-400" />
            <p className={`mt-2 text-gray-500 ${textClass}`}>
              {language === 'en' ? 'No notifications yet' : 'இன்னும் அறிவிப்புகள் இல்லை'}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Notifications;
