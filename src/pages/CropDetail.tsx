
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, 
  Droplet, 
  Calendar, 
  Sun, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  FileSpreadsheet,
  User,
  Microscope,
  ArrowLeft
} from 'lucide-react';

const CropDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const textClass = language === 'ta' ? 'font-tamil' : '';
  
  // Mock data for crop details
  const crops = {
    '1': {
      id: 1,
      name: language === 'en' ? 'Rice' : 'நெல்',
      plantedDate: '2023-03-15',
      area: 2.5,
      variety: language === 'en' ? 'ADT 43' : 'ஏடிடி 43',
      irrigationDue: '2023-04-02',
      fertilizerDue: '2023-04-10',
      daysToHarvest: 45,
      growthStage: language === 'en' ? 'Tillering' : 'செடி விரிதல்',
      growthProgress: 55,
      image: 'https://source.unsplash.com/random/800x600/?rice,paddy',
      expectedPrice: 2200,
      currentMarketPrice: 2180,
      priceHistory: [2100, 2120, 2150, 2180, 2200],
      tasks: [
        {
          name: language === 'en' ? 'Water the field' : 'வயலுக்கு நீர் பாய்ச்சவும்',
          date: '2023-04-02',
          completed: false,
        },
        {
          name: language === 'en' ? 'Apply fertilizer' : 'உரம் இடவும்',
          date: '2023-04-10',
          completed: false,
        }
      ],
      notes: [
        {
          date: '2023-03-20',
          content: language === 'en' 
            ? 'Good germination observed across the field. Uniform growth.' 
            : 'வயல் முழுவதும் நல்ல முளைப்பு காணப்பட்டது. சீரான வளர்ச்சி.',
          author: language === 'en' ? 'Me' : 'நான்',
        },
        {
          date: '2023-03-28',
          content: language === 'en' 
            ? 'Applied first dose of fertilizer. Observed some yellowing in north section.' 
            : 'முதல் தவணை உரம் இடப்பட்டது. வடக்கு பகுதியில் சிறிது மஞ்சள் நிறமாதல் காணப்பட்டது.',
          author: language === 'en' ? 'Me' : 'நான்',
        }
      ],
      healthStatus: [
        {
          type: language === 'en' ? 'Pest Alert' : 'பூச்சி எச்சரிக்கை',
          status: language === 'en' ? 'Low Risk' : 'குறைந்த ஆபத்து',
          details: language === 'en' 
            ? 'Monitor for stem borer. Check field edges and spray if needed.' 
            : 'தண்டு துளைப்பானை கண்காணிக்கவும். வயல் விளிம்புகளை சரிபார்த்து, தேவைப்பட்டால் மருந்து தெளிக்கவும்.',
          color: 'bg-amber-100 text-amber-800',
        },
        {
          type: language === 'en' ? 'Disease Status' : 'நோய் நிலை',
          status: language === 'en' ? 'Healthy' : 'ஆரோக்கியமான',
          details: language === 'en' ? 'No disease symptoms observed' : 'நோய் அறிகுறிகள் எதுவும் காணப்படவில்லை',
          color: 'bg-green-100 text-green-800',
        }
      ]
    },
    '2': {
      id: 2,
      name: language === 'en' ? 'Tomato' : 'தக்காளி',
      plantedDate: '2023-03-25',
      area: 1,
      variety: language === 'en' ? 'PKM 1' : 'பிகேஎம் 1',
      irrigationDue: '2023-04-01',
      fertilizerDue: '2023-04-15',
      daysToHarvest: 30,
      growthStage: language === 'en' ? 'Flowering' : 'பூக்கும் நிலை',
      growthProgress: 70,
      image: 'https://source.unsplash.com/random/800x600/?tomato,plant',
      expectedPrice: 15,
      currentMarketPrice: 14,
      priceHistory: [13, 12, 13, 13.5, 14],
      tasks: [
        {
          name: language === 'en' ? 'Irrigate plants' : 'செடிகளுக்கு நீர் பாய்ச்சவும்',
          date: '2023-04-01',
          completed: false,
        },
        {
          name: language === 'en' ? 'Apply fertilizer' : 'உரம் இடவும்',
          date: '2023-04-15',
          completed: false,
        },
        {
          name: language === 'en' ? 'Stake plants' : 'செடிகளுக்கு தாங்கி அமைக்கவும்',
          date: '2023-04-05',
          completed: false,
        }
      ],
      notes: [
        {
          date: '2023-03-30',
          content: language === 'en' 
            ? 'Plants are growing well. Starting to see flower buds.' 
            : 'செடிகள் நன்றாக வளர்கின்றன. பூ மொட்டுகள் தெரிய ஆரம்பித்துள்ளன.',
          author: language === 'en' ? 'Me' : 'நான்',
        }
      ],
      healthStatus: [
        {
          type: language === 'en' ? 'Pest Alert' : 'பூச்சி எச்சரிக்கை',
          status: language === 'en' ? 'Medium Risk' : 'நடுத்தர ஆபத்து',
          details: language === 'en' 
            ? 'Watch for leaf miners and whiteflies. Consider applying neem oil spray.' 
            : 'இலை சுரங்கப்புழுக்கள் மற்றும் வெள்ளை ஈக்களை கவனிக்கவும். வேப்பெண்ணெய் தெளிப்பு பரிசீலிக்கவும்.',
          color: 'bg-amber-100 text-amber-800',
        },
        {
          type: language === 'en' ? 'Disease Status' : 'நோய் நிலை',
          status: language === 'en' ? 'Healthy' : 'ஆரோக்கியமான',
          details: language === 'en' ? 'No disease symptoms observed' : 'நோய் அறிகுறிகள் எதுவும் காணப்படவில்லை',
          color: 'bg-green-100 text-green-800',
        }
      ]
    }
  };
  
  const crop = crops[id as keyof typeof crops];
  
  if (!crop) {
    return (
      <AppLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Crop not found' : 'பயிர் கண்டுபிடிக்கப்படவில்லை'}
          </h2>
          <Link to="/crops">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Back to Crops' : 'பயிர்களுக்குத் திரும்பு'}
            </Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Link to="/crops" className="mr-3">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className={`text-2xl font-bold ${textClass}`}>{crop.name}</h1>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" className={textClass}>
              {language === 'en' ? 'Edit Crop' : 'பயிரைத் திருத்து'}
            </Button>
          </div>
        </div>
        
        {/* Hero section with image and summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 h-64 md:h-auto rounded-lg overflow-hidden">
            <img 
              src={crop.image} 
              alt={crop.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className={textClass}>
                  {language === 'en' ? 'Crop Summary' : 'பயிர் சுருக்கம்'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={`text-gray-500 ${textClass}`}>
                      {language === 'en' ? 'Growth Stage' : 'வளர்ச்சி நிலை'}:
                    </span>
                    <span className="font-medium">{crop.growthStage}</span>
                  </div>
                  <Progress value={crop.growthProgress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{language === 'en' ? 'Planted' : 'நடப்பட்டது'}</span>
                    <span>{language === 'en' ? 'Ready to Harvest' : 'அறுவடைக்கு தயார்'}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className={`text-xs text-gray-500 ${textClass}`}>
                      {language === 'en' ? 'Area' : 'பரப்பளவு'}
                    </p>
                    <p className="font-medium">{crop.area} {language === 'en' ? 'acres' : 'ஏக்கர்'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className={`text-xs text-gray-500 ${textClass}`}>
                      {language === 'en' ? 'Variety' : 'ரகம்'}
                    </p>
                    <p className="font-medium">{crop.variety}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className={`text-xs text-gray-500 ${textClass}`}>
                      {language === 'en' ? 'Days to Harvest' : 'அறுவடைக்கு நாட்கள்'}
                    </p>
                    <p className="font-medium">{crop.daysToHarvest} {language === 'en' ? 'days' : 'நாட்கள்'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className={`text-xs text-gray-500 ${textClass}`}>
                      {language === 'en' ? 'Planted Date' : 'நடவு செய்த தேதி'}
                    </p>
                    <p className="font-medium">{new Date(crop.plantedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tabs for different information */}
        <Tabs defaultValue="tasks">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="tasks" className={textClass}>
              {language === 'en' ? 'Tasks' : 'பணிகள்'}
            </TabsTrigger>
            <TabsTrigger value="health" className={textClass}>
              {language === 'en' ? 'Health' : 'ஆரோக்கியம்'}
            </TabsTrigger>
            <TabsTrigger value="market" className={textClass}>
              {language === 'en' ? 'Market' : 'சந்தை'}
            </TabsTrigger>
            <TabsTrigger value="reports" className={textClass}>
              {language === 'en' ? 'Reports' : 'அறிக்கைகள்'}
            </TabsTrigger>
            <TabsTrigger value="notes" className={textClass}>
              {language === 'en' ? 'Notes' : 'குறிப்புகள்'}
            </TabsTrigger>
          </TabsList>
          
          {/* Tasks */}
          <TabsContent value="tasks" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className={textClass}>
                  {language === 'en' ? 'Upcoming Tasks' : 'வரவிருக்கும் பணிகள்'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {crop.tasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-primary-50 rounded-full">
                        {task.name.includes(language === 'en' ? 'Water' : 'நீர்') ? (
                          <Droplet className="h-5 w-5 text-blue-500" />
                        ) : task.name.includes(language === 'en' ? 'fertilizer' : 'உரம்') ? (
                          <Leaf className="h-5 w-5 text-green-500" />
                        ) : (
                          <Calendar className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className={`font-medium ${textClass}`}>{task.name}</p>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? 'Due on' : 'தேதி'}: {new Date(task.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className={textClass}>
                        {language === 'en' ? 'Complete' : 'முடிந்தது'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className={`w-full ${textClass}`} variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Add New Task' : 'புதிய பணி சேர்க்க'}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className={textClass}>
                  {language === 'en' ? 'Recommendations' : 'பரிந்துரைகள்'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-primary-50 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sun className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className={`font-medium ${textClass}`}>
                        {language === 'en' ? 'Optimal Growing Conditions' : 'சிறந்த வளர்ச்சி நிலைமைகள்'}
                      </h4>
                      <p className={`mt-1 text-sm ${textClass}`}>
                        {language === 'en' 
                          ? `For ${crop.name} at ${crop.growthStage} stage, maintain soil moisture between 60-70%. Watch for pests as weather warms up.` 
                          : `${crop.growthStage} நிலையில் ${crop.name}, மண் ஈரப்பதத்தை 60-70% இடையே வைக்கவும். வானிலை வெப்பமடையும்போது பூச்சிகளைக் கவனிக்கவும்.`}
                      </p>
                      <Button variant="link" size="sm" className="mt-1 p-0 h-auto">
                        <span className={textClass}>
                          {language === 'en' ? 'View detailed guide' : 'விரிவான வழிகாட்டியைக் காண'}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Health */}
          <TabsContent value="health" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className={textClass}>
                  {language === 'en' ? 'Health Status' : 'ஆரோக்கிய நிலை'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {crop.healthStatus.map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg ${item.color}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`font-medium ${textClass}`}>{item.type}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full bg-white ${item.color.replace('bg-', 'text-').replace('100', '700')}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className={`text-sm ${textClass}`}>{item.details}</p>
                  </div>
                ))}
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className={`font-medium mb-2 ${textClass}`}>
                    {language === 'en' ? 'Health Monitoring' : 'ஆரோக்கிய கண்காணிப்பு'}
                  </h3>
                  <p className={`text-sm ${textClass}`}>
                    {language === 'en' 
                      ? 'Upload photos of your crop to check for pests and diseases. Our AI will analyze them and provide recommendations.' 
                      : 'பூச்சிகள் மற்றும் நோய்களை சரிபார்க்க உங்கள் பயிரின் படங்களை பதிவேற்றவும். எங்கள் AI அவற்றை ஆராய்ந்து பரிந்துரைகளை வழங்கும்.'}
                  </p>
                  <Button className={`mt-3 ${textClass}`}>
                    {language === 'en' ? 'Check Crop Health' : 'பயிர் ஆரோக்கியத்தை சரிபார்க்க'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Market */}
          <TabsContent value="market" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className={textClass}>
                  {language === 'en' ? 'Market Information' : 'சந்தை தகவல்'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className={`text-sm text-gray-500 ${textClass}`}>
                        {language === 'en' ? 'Current Market Price' : 'தற்போதைய சந்தை விலை'}
                      </p>
                      <p className="text-2xl font-bold">₹{crop.currentMarketPrice} 
                        <span className="text-sm text-gray-500">
                          {language === 'en' ? '/kg' : '/கிலோ'}
                        </span>
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className={`text-sm text-gray-500 ${textClass}`}>
                        {language === 'en' ? 'Expected Harvest Price' : 'எதிர்பார்க்கப்படும் அறுவடை விலை'}
                      </p>
                      <p className="text-2xl font-bold">₹{crop.expectedPrice}
                        <span className="text-sm text-gray-500">
                          {language === 'en' ? '/kg' : '/கிலோ'}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className={`font-medium mb-2 ${textClass}`}>
                      {language === 'en' ? 'Price Trend (Last 5 weeks)' : 'விலை போக்கு (கடந்த 5 வாரங்கள்)'}
                    </h3>
                    <div className="h-20 flex items-end space-x-2">
                      {crop.priceHistory.map((price, i) => {
                        const height = (price / Math.max(...crop.priceHistory)) * 100;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full bg-blue-500 rounded-t"
                              style={{ height: `${height}%` }}
                            ></div>
                            <span className="text-xs mt-1">₹{price}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <Button className={`w-full ${textClass}`}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Find Buyers' : 'வாங்குபவர்களைக் கண்டறியவும்'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Reports */}
          <TabsContent value="reports" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className={textClass}>
                  {language === 'en' ? 'Crop Reports' : 'பயிர் அறிக்கைகள்'}
                </CardTitle>
                <CardDescription className={textClass}>
                  {language === 'en' 
                    ? 'Review and download reports for this crop' 
                    : 'இந்த பயிருக்கான அறிக்கைகளை பார்வையிடவும் மற்றும் பதிவிறக்கவும்'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg flex items-center">
                    <FileSpreadsheet className="h-8 w-8 text-green-500 mr-3" />
                    <div className="flex-grow">
                      <h4 className={`font-medium ${textClass}`}>
                        {language === 'en' ? 'Growth Analysis' : 'வளர்ச்சி பகுப்பாய்வு'}
                      </h4>
                      <p className="text-sm text-gray-500">PDF • 2.3 MB</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      {language === 'en' ? 'View' : 'பார்க்க'}
                    </Button>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex items-center">
                    <FileSpreadsheet className="h-8 w-8 text-blue-500 mr-3" />
                    <div className="flex-grow">
                      <h4 className={`font-medium ${textClass}`}>
                        {language === 'en' ? 'Expense Tracker' : 'செலவு கண்காணிப்பான்'}
                      </h4>
                      <p className="text-sm text-gray-500">Excel • 1.5 MB</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      {language === 'en' ? 'View' : 'பார்க்க'}
                    </Button>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex items-center">
                    <FileSpreadsheet className="h-8 w-8 text-amber-500 mr-3" />
                    <div className="flex-grow">
                      <h4 className={`font-medium ${textClass}`}>
                        {language === 'en' ? 'Yield Prediction' : 'மகசூல் கணிப்பு'}
                      </h4>
                      <p className="text-sm text-gray-500">PDF • 1.8 MB</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      {language === 'en' ? 'View' : 'பார்க்க'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notes */}
          <TabsContent value="notes" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className={textClass}>
                  {language === 'en' ? 'Field Notes' : 'வயல் குறிப்புகள்'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {crop.notes.map((note, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-sm font-medium">{note.author}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(note.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`mt-2 text-sm ${textClass}`}>{note.content}</p>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <Button className={`w-full ${textClass}`}>
                      {language === 'en' ? 'Add New Note' : 'புதிய குறிப்பு சேர்க்க'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CropDetail;
