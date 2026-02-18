
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, Droplet, Wind, Thermometer, Compass, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Weather: React.FC = () => {
  const { language } = useLanguage();
  const textClass = language === 'ta' ? 'font-tamil' : '';

  // Mock data for weather forecast
  const currentWeather = {
    temp: 28,
    condition: language === 'en' ? 'Sunny' : 'வெயில்',
    humidity: 65,
    wind: 12,
    windDirection: 'NE',
    rain: 0,
  };
  
  const forecast = [
    {
      day: language === 'en' ? 'Today' : 'இன்று',
      date: new Date().toLocaleDateString(),
      temp: 28,
      tempMin: 22,
      icon: CloudSun,
      condition: language === 'en' ? 'Sunny' : 'வெயில்',
      rain: 0,
    },
    {
      day: language === 'en' ? 'Tomorrow' : 'நாளை',
      date: new Date(Date.now() + 86400000).toLocaleDateString(),
      temp: 27,
      tempMin: 21,
      icon: CloudSun,
      condition: language === 'en' ? 'Partly Cloudy' : 'ஓரளவு மேகமூட்டம்',
      rain: 10,
    },
    {
      day: language === 'en' ? 'Wednesday' : 'புதன்',
      date: new Date(Date.now() + 172800000).toLocaleDateString(),
      temp: 29,
      tempMin: 23,
      icon: Droplet,
      condition: language === 'en' ? 'Light Rain' : 'லேசான மழை',
      rain: 40,
    },
    {
      day: language === 'en' ? 'Thursday' : 'வியாழன்',
      date: new Date(Date.now() + 259200000).toLocaleDateString(),
      temp: 30,
      tempMin: 24,
      icon: CloudSun,
      condition: language === 'en' ? 'Sunny' : 'வெயில்',
      rain: 0,
    },
    {
      day: language === 'en' ? 'Friday' : 'வெள்ளி',
      date: new Date(Date.now() + 345600000).toLocaleDateString(),
      temp: 31,
      tempMin: 25,
      icon: CloudSun,
      condition: language === 'en' ? 'Sunny' : 'வெயில்',
      rain: 0,
    },
  ];
  
  const weatherAlerts = [
    {
      type: language === 'en' ? 'Rain Expected' : 'மழை எதிர்பார்க்கப்படுகிறது',
      message: language === 'en' 
        ? 'Light rain expected on Wednesday. Consider delaying fertilizer application.' 
        : 'புதன்கிழமை லேசான மழை எதிர்பார்க்கப்படுகிறது. உரமிடுவதை தள்ளிப்போடுங்கள்.',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      type: language === 'en' ? 'Temperature Rise' : 'வெப்பநிலை அதிகரிப்பு',
      message: language === 'en' 
        ? 'Temperature will rise to 31°C by end of week. Ensure adequate irrigation.' 
        : 'வார இறுதியில் வெப்பநிலை 31°C ஆக உயரும். போதுமான நீர்ப்பாசனத்தை உறுதி செய்க.',
      color: 'bg-amber-100 text-amber-800',
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${textClass}`}>
            {language === 'en' ? 'Weather Forecast' : 'வானிலை முன்னறிவிப்பு'}
          </h1>
          <div className="flex gap-2">
            <CloudSun className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Current Weather */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className={`text-3xl font-bold ${textClass}`}>
                  {language === 'en' ? 'Current Weather' : 'தற்போதைய வானிலை'}
                </h2>
                <p className="text-blue-100">
                  {language === 'en' ? 'Your farm area' : 'உங்கள் பண்ணை பகுதி'} • {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <CloudSun className="h-16 w-16 mr-4" />
                <div>
                  <span className="text-4xl font-bold">{currentWeather.temp}°C</span>
                  <p className={textClass}>{currentWeather.condition}</p>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Droplet className="h-6 w-6 text-blue-500 mb-2" />
                <p className="text-sm text-gray-500">
                  {language === 'en' ? 'Humidity' : 'ஈரப்பதம்'}
                </p>
                <p className="font-bold">{currentWeather.humidity}%</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Wind className="h-6 w-6 text-blue-500 mb-2" />
                <p className="text-sm text-gray-500">
                  {language === 'en' ? 'Wind' : 'காற்று'}
                </p>
                <p className="font-bold">{currentWeather.wind} km/h</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Compass className="h-6 w-6 text-blue-500 mb-2" />
                <p className="text-sm text-gray-500">
                  {language === 'en' ? 'Direction' : 'திசை'}
                </p>
                <p className="font-bold">{currentWeather.windDirection}</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Thermometer className="h-6 w-6 text-blue-500 mb-2" />
                <p className="text-sm text-gray-500">
                  {language === 'en' ? 'Rain' : 'மழை'}
                </p>
                <p className="font-bold">{currentWeather.rain}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className={textClass}>
              {language === 'en' ? '5-Day Forecast' : '5-நாள் முன்னறிவிப்பு'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto pb-2 space-x-4">
              {forecast.map((day, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex-shrink-0 w-28 rounded-lg p-3 text-center", 
                    i === 0 ? "bg-primary text-white" : "bg-gray-50"
                  )}
                >
                  <p className={`font-medium ${textClass}`}>{day.day}</p>
                  <p className="text-xs opacity-80">{day.date}</p>
                  <div className="my-2 flex justify-center">
                    <day.icon className={cn("h-8 w-8", i === 0 ? "text-white" : "text-blue-500")} />
                  </div>
                  <p className="text-xl font-bold">{day.temp}°</p>
                  <p className="text-sm opacity-80">{day.tempMin}°</p>
                  <p className={`text-xs mt-1 ${textClass}`}>{day.condition}</p>
                  {day.rain > 0 && (
                    <div className="mt-1 inline-flex items-center text-xs">
                      <Droplet className="h-3 w-3 mr-1" />
                      <span>{day.rain}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <div>
          <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>
            {language === 'en' ? 'Weather Alerts' : 'வானிலை எச்சரிக்கைகள்'}
          </h2>
          <div className="space-y-3">
            {weatherAlerts.map((alert, i) => (
              <div key={i} className={`p-4 rounded-lg ${alert.color}`}>
                <h3 className={`font-medium mb-1 ${textClass}`}>{alert.type}</h3>
                <p className={`text-sm ${textClass}`}>{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Weather Advisory */}
        <Card>
          <CardHeader>
            <CardTitle className={textClass}>
              {language === 'en' ? 'Crop Weather Advisory' : 'பயிர் வானிலை ஆலோசனை'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className={`font-medium ${textClass}`}>
                  {language === 'en' ? 'Rice' : 'நெல்'}
                </h3>
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
              <p className={`mt-2 text-sm text-gray-600 ${textClass}`}>
                {language === 'en' 
                  ? 'With upcoming rain on Wednesday, delay fertilizer application until Thursday when conditions are dry.' 
                  : 'புதன்கிழமை மழை வருவதால், வெப்பமான நிலைமைகள் உள்ள வியாழக்கிழமை வரை உரமிடுவதை தாமதப்படுத்தவும்.'}
              </p>
              <Button variant="link" size="sm" className="mt-1 p-0 h-auto text-primary">
                <span className={`mr-1 ${textClass}`}>
                  {language === 'en' ? 'View detailed recommendations' : 'விரிவான பரிந்துரைகளைக் காண'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className={`font-medium ${textClass}`}>
                  {language === 'en' ? 'Tomato' : 'தக்காளி'}
                </h3>
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
              <p className={`mt-2 text-sm text-gray-600 ${textClass}`}>
                {language === 'en' 
                  ? 'Temperature rise may increase water needs. Increase irrigation frequency from Friday.' 
                  : 'வெப்பநிலை உயர்வு நீர் தேவைகளை அதிகரிக்கலாம். வெள்ளிக்கிழமை முதல் நீர்ப்பாசன அதிர்வெண்ணை அதிகரிக்கவும்.'}
              </p>
              <Button variant="link" size="sm" className="mt-1 p-0 h-auto text-primary">
                <span className={`mr-1 ${textClass}`}>
                  {language === 'en' ? 'View detailed recommendations' : 'விரிவான பரிந்துரைகளைக் காண'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Weather;
