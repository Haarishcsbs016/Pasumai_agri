
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Droplet, Leaf, Calendar, Plus, ArrowRight } from 'lucide-react';

const Crops: React.FC = () => {
  const { t, language } = useLanguage();
  
  const textClass = language === 'ta' ? 'font-tamil' : '';
  
  // Mock data
  const crops = [
    {
      id: 1,
      name: language === 'en' ? 'Rice' : 'நெல்',
      plantedDate: '2023-03-15',
      area: 2.5,
      irrigationDue: '2023-04-02',
      fertilizerDue: '2023-04-10',
      daysToHarvest: 45,
      expectedPrice: 2200,
      image: 'https://source.unsplash.com/random/400x300/?rice,paddy',
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
      image: 'https://source.unsplash.com/random/400x300/?tomato',
    },
    {
      id: 3,
      name: language === 'en' ? 'Sugarcane' : 'கரும்பு',
      plantedDate: '2023-02-10',
      area: 3,
      irrigationDue: '2023-04-05',
      fertilizerDue: '2023-04-20',
      daysToHarvest: 90,
      expectedPrice: 3500,
      image: 'https://source.unsplash.com/random/400x300/?sugarcane',
    },
    {
      id: 4,
      name: language === 'en' ? 'Banana' : 'வாழை',
      plantedDate: '2023-01-05',
      area: 1.5,
      irrigationDue: '2023-04-03',
      fertilizerDue: '2023-04-25',
      daysToHarvest: 120,
      expectedPrice: 25,
      image: 'https://source.unsplash.com/random/400x300/?banana',
    },
  ];

  // Groups sorted by planting date (newest first)
  const currentCrops = crops
    .slice()
    .sort((a, b) => new Date(b.plantedDate).getTime() - new Date(a.plantedDate).getTime());

  return (
    <AppLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${textClass}`}>{t('crops')}</h1>
          <Link to="/crops/add">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              <span className={textClass}>{t('addCrop')}</span>
            </Button>
          </Link>
        </div>

        {/* Crop List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCrops.map(crop => (
            <Card key={crop.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={crop.image} 
                  alt={crop.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className={textClass}>{crop.name}</CardTitle>
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {crop.area} {language === 'en' ? 'acres' : 'ஏக்கர்'}
                  </div>
                </div>
                <CardDescription className={textClass}>
                  {language === 'en' ? 'Planted on' : 'நடப்பட்ட நாள்'}: {new Date(crop.plantedDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 my-2 text-sm">
                  <div className="p-2 bg-blue-50 rounded-md flex flex-col items-center justify-center">
                    <Droplet className="h-4 w-4 text-blue-500 mb-1" />
                    <span className={`text-xs text-center text-gray-600 ${textClass}`}>
                      {language === 'en' ? 'Water on' : 'நீர்பாய்ச்சு'}<br />
                      {new Date(crop.irrigationDue).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md flex flex-col items-center justify-center">
                    <Leaf className="h-4 w-4 text-green-500 mb-1" />
                    <span className={`text-xs text-center text-gray-600 ${textClass}`}>
                      {language === 'en' ? 'Fertilize on' : 'உரமிடு'}<br />
                      {new Date(crop.fertilizerDue).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="p-2 bg-amber-50 rounded-md flex flex-col items-center justify-center">
                    <Calendar className="h-4 w-4 text-amber-500 mb-1" />
                    <span className={`text-xs text-center text-gray-600 ${textClass}`}>
                      {language === 'en' ? 'Harvest in' : 'அறுவடைக்கு'}<br />
                      {crop.daysToHarvest} {language === 'en' ? 'days' : 'நாட்கள்'}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button className={textClass} variant="outline">
                  {t('guideMe')}
                </Button>
                <Link to={`/crops/${crop.id}`}>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <span className={`mr-1 ${textClass}`}>{t('viewDetails')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          
          {/* Add Crop Card */}
          <Link to="/crops/add" className="block">
            <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-full min-h-[300px] hover:border-primary hover:bg-primary-50 transition-colors">
              <div className="text-center p-4">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className={`text-lg font-medium ${textClass}`}>{t('addCrop')}</h3>
                <p className={`text-sm text-gray-500 mt-2 ${textClass}`}>
                  {language === 'en' 
                    ? 'Add new crop to track' 
                    : 'புதிய பயிரை கண்காணிக்க சேர்க்கவும்'}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Crops;
