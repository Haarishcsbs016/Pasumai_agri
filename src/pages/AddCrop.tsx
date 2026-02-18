
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const AddCrop: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [cropName, setCropName] = useState('');
  const [acreage, setAcreage] = useState('');
  const [cropType, setCropType] = useState('existing'); // 'existing' or 'planning'
  
  const textClass = language === 'ta' ? 'font-tamil' : '';
  
  // Mock crop list
  const cropOptions = [
    { value: 'rice', label: language === 'en' ? 'Rice' : 'நெல்' },
    { value: 'tomato', label: language === 'en' ? 'Tomato' : 'தக்காளி' },
    { value: 'sugarcane', label: language === 'en' ? 'Sugarcane' : 'கரும்பு' },
    { value: 'banana', label: language === 'en' ? 'Banana' : 'வாழை' },
    { value: 'okra', label: language === 'en' ? 'Okra' : 'வெண்டைக்காய்' },
    { value: 'cotton', label: language === 'en' ? 'Cotton' : 'பருத்தி' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!cropName || !date || !acreage || isNaN(parseFloat(acreage))) {
      toast({
        title: language === 'en' ? 'Error' : 'பிழை',
        description: language === 'en' 
          ? 'Please fill all fields correctly.' 
          : 'அனைத்து புலங்களையும் சரியாக நிரப்பவும்.',
        variant: "destructive",
      });
      return;
    }
    
    // Success notification
    toast({
      title: language === 'en' ? 'Success' : 'வெற்றி',
      description: language === 'en' 
        ? 'Crop added successfully!' 
        : 'பயிர் வெற்றிகரமாக சேர்க்கப்பட்டது!',
    });
    
    // Navigate back to crops page
    navigate('/crops');
  };
  
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${textClass}`}>{t('addCrop')}</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className={textClass}>
                {language === 'en' ? 'Crop Details' : 'பயிர் விவரங்கள்'}
              </CardTitle>
              <CardDescription className={textClass}>
                {language === 'en' 
                  ? 'Add details about your crop for personalized guidance.' 
                  : 'தனிப்பயனாக்கப்பட்ட வழிகாட்டுதலுக்கு உங்கள் பயிர் பற்றிய விவரங்களைச் சேர்க்கவும்.'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Crop Type Selection */}
              <div className="flex flex-col space-y-3">
                <Label className={textClass}>
                  {language === 'en' ? 'Crop Status' : 'பயிர் நிலை'}
                </Label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="existing" 
                      name="cropType" 
                      value="existing"
                      checked={cropType === 'existing'} 
                      onChange={() => setCropType('existing')}
                      className="mr-2"
                    />
                    <Label htmlFor="existing" className={textClass}>
                      {language === 'en' ? 'Already Planted' : 'ஏற்கனவே நடப்பட்டது'}
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="planning" 
                      name="cropType" 
                      value="planning"
                      checked={cropType === 'planning'} 
                      onChange={() => setCropType('planning')}
                      className="mr-2"
                    />
                    <Label htmlFor="planning" className={textClass}>
                      {language === 'en' ? 'Planning to Plant' : 'நட திட்டமிடுகிறேன்'}
                    </Label>
                  </div>
                </div>
              </div>
              
              {/* Crop Name */}
              <div className="space-y-2">
                <Label htmlFor="cropName" className={textClass}>{t('cropName')}</Label>
                <Select onValueChange={setCropName}>
                  <SelectTrigger className="w-full">
                    <SelectValue 
                      placeholder={language === 'en' ? "Select crop" : "பயிரைத் தேர்ந்தெடுக்கவும்"} 
                      className={textClass}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map(option => (
                      <SelectItem key={option.value} value={option.value} className={textClass}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Date Picker */}
              <div className="space-y-2">
                <Label htmlFor="plantedDate" className={textClass}>
                  {cropType === 'existing' 
                    ? t('plantedDate') 
                    : language === 'en' 
                      ? 'Planned Planting Date' 
                      : 'திட்டமிடப்பட்ட நடவு தேதி'}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Acreage */}
              <div className="space-y-2">
                <Label htmlFor="acreage" className={textClass}>{t('acreage')}</Label>
                <div className="flex">
                  <Input
                    id="acreage"
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="0.0"
                    value={acreage}
                    onChange={(e) => setAcreage(e.target.value)}
                    className="rounded-r-none"
                  />
                  <div className="bg-muted border border-l-0 border-input rounded-r-md flex items-center px-3">
                    <span className={textClass}>
                      {language === 'en' ? 'acres' : 'ஏக்கர்'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-5">
              <Button 
                type="button" 
                onClick={() => navigate('/crops')} 
                variant="outline" 
                className={textClass}
              >
                {language === 'en' ? 'Cancel' : 'ரத்து செய்'}
              </Button>
              <Button type="submit" className={textClass}>{t('submit')}</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddCrop;
