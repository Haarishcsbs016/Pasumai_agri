
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, TrendingUp, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Market: React.FC = () => {
  const { t, language } = useLanguage();
  
  const textClass = language === 'ta' ? 'font-tamil' : '';

  // Mock data for price trends
  const priceData = [
    { name: 'Jan', rice: 1800, tomato: 25, sugarcane: 3000, banana: 18 },
    { name: 'Feb', rice: 1900, tomato: 20, sugarcane: 3200, banana: 20 },
    { name: 'Mar', rice: 2000, tomato: 15, sugarcane: 3300, banana: 24 },
    { name: 'Apr', rice: 2200, tomato: 10, sugarcane: 3500, banana: 22 },
    { name: 'May', rice: 2250, tomato: 12, sugarcane: 3400, banana: 21 },
    { name: 'Jun', rice: 2100, tomato: 18, sugarcane: 3200, banana: 19 },
  ];

  // Market insights
  const insights = [
    {
      crop: language === 'en' ? 'Tomato' : 'தக்காளி',
      price: '₹ 12/kg',
      trend: 'down',
      change: '20%',
      forecast: language === 'en' 
        ? 'Expected to rise in 2 weeks' 
        : '2 வாரங்களில் உயர எதிர்பார்க்கப்படுகிறது',
    },
    {
      crop: language === 'en' ? 'Rice' : 'நெல்',
      price: '₹ 2250/quintal',
      trend: 'up',
      change: '5%',
      forecast: language === 'en' 
        ? 'Stable price expected' 
        : 'நிலையான விலை எதிர்பார்க்கப்படுகிறது',
    },
    {
      crop: language === 'en' ? 'Banana' : 'வாழைப்பழம்',
      price: '₹ 21/dozen',
      trend: 'down',
      change: '3%',
      forecast: language === 'en' 
        ? 'Slight increase next month' 
        : 'அடுத்த மாதம் சிறிது அதிகரிக்கும்',
    },
  ];

  // Recommendations
  const recommendations = [
    {
      crop: language === 'en' ? 'Okra' : 'வெண்டைக்காய்',
      reason: language === 'en' 
        ? 'Low supply in market currently' 
        : 'சந்தையில் தற்போது குறைவான விநியோகம்',
    },
    {
      crop: language === 'en' ? 'Onion' : 'வெங்காயம்',
      reason: language === 'en' 
        ? 'Expected price rise next season' 
        : 'அடுத்த பருவத்தில் எதிர்பார்க்கப்படும் விலை உயர்வு',
    },
  ];

  return (
    <AppLayout>
      <div>
        <h1 className={`text-2xl font-bold mb-6 ${textClass}`}>{t('market')}</h1>
        
        <div className="space-y-8">
          {/* Price Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle className={textClass}>
                {language === 'en' ? 'Price Trends' : 'விலை போக்குகள்'}
              </CardTitle>
              <CardDescription className={textClass}>
                {language === 'en' 
                  ? '6-month market price trend for major crops' 
                  : 'முக்கிய பயிர்களுக்கான 6 மாத சந்தை விலை போக்கு'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={priceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      label={{ 
                        value: language === 'en' ? 'Month' : 'மாதம்', 
                        position: 'insideBottom', 
                        offset: -5 
                      }} 
                    />
                    <YAxis 
                      label={{ 
                        value: language === 'en' ? 'Price (₹)' : 'விலை (₹)', 
                        angle: -90, 
                        position: 'insideLeft' 
                      }} 
                    />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rice" stroke="#8884d8" name={language === 'en' ? 'Rice' : 'நெல்'} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="tomato" stroke="#FF5733" name={language === 'en' ? 'Tomato' : 'தக்காளி'} />
                    <Line type="monotone" dataKey="sugarcane" stroke="#82ca9d" name={language === 'en' ? 'Sugarcane' : 'கரும்பு'} />
                    <Line type="monotone" dataKey="banana" stroke="#FFBB28" name={language === 'en' ? 'Banana' : 'வாழை'} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Market Insights */}
          <Card>
            <CardHeader>
              <CardTitle className={textClass}>
                {language === 'en' ? 'Market Insights' : 'சந்தை நுண்ணறிவுகள்'}
              </CardTitle>
              <CardDescription className={textClass}>
                {language === 'en' 
                  ? 'Current prices and forecasts' 
                  : 'தற்போதைய விலைகள் மற்றும் முன்கணிப்புகள்'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <h4 className={`font-medium ${textClass}`}>{item.crop}</h4>
                      <p className="text-lg font-bold">{item.price}</p>
                      <div className="flex items-center mt-1">
                        {item.trend === 'up' ? (
                          <div className="flex items-center text-green-600">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            <span>{item.change}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <ArrowDown className="h-4 w-4 mr-1" />
                            <span>{item.change}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className={`text-sm ${textClass}`}>{item.forecast}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Planting Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${textClass}`}>
                <Zap className="h-5 w-5 text-yellow-500" />
                {language === 'en' ? 'Recommended Crops to Plant' : 'நடவு செய்ய பரிந்துரைக்கப்படும் பயிர்கள்'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((item, index) => (
                  <div key={index} className="flex items-center border-l-4 border-green-500 pl-4 py-2">
                    <div className="mr-4 p-2 bg-green-100 rounded-full">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className={`font-medium ${textClass}`}>{item.crop}</h4>
                      <p className={`text-sm text-gray-600 ${textClass}`}>{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Market;
