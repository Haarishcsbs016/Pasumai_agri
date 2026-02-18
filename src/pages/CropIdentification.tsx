
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, ArrowRight, Loader2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CropIdentification: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  
  const textClass = language === 'ta' ? 'font-tamil' : '';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: language === 'en' ? 'Error' : 'பிழை',
        description: language === 'en' 
          ? 'Please select an image file.' 
          : 'தயவுசெய்து ஒரு படக்கோப்பைத் தேர்ந்தெடுக்கவும்.',
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleTakePhoto = () => {
    // In a real app, this would access the camera
    toast({
      description: language === 'en' 
        ? 'Camera functionality would open here in the real app.' 
        : 'உண்மையான பயன்பாட்டில் இங்கே கேமரா செயல்பாடு திறக்கும்.',
    });
  };
  
  const handleScan = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock result
      const mockResult = {
        crop: language === 'en' ? 'Tomato' : 'தக்காளி',
        confidence: 95,
        health: language === 'en' ? 'Healthy' : 'ஆரோக்கியமான',
        disease: null,
        recommendations: [
          language === 'en' 
            ? 'Continue regular irrigation every 3 days.' 
            : '3 நாட்களுக்கு ஒருமுறை வழக்கமான பாசனத்தைத் தொடரவும்.',
          language === 'en' 
            ? 'Apply nitrogen-rich fertilizer in 10 days.' 
            : '10 நாட்களில் நைட்ரஜன் நிறைந்த உரத்தைப் பயன்படுத்தவும்.',
        ],
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const handleReset = () => {
    setImage(null);
    setResult(null);
  };
  
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${textClass}`}>{t('cropIdentify')}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className={textClass}>
              {language === 'en' ? 'Plant Analysis' : 'தாவர ஆய்வு'}
            </CardTitle>
            <CardDescription className={textClass}>
              {language === 'en' 
                ? 'Take or upload a photo of your crop to identify it and check for diseases.' 
                : 'உங்கள் பயிரை அடையாளம் காணவும், நோய்களைச் சரிபார்க்கவும் ஒரு புகைப்படத்தை எடுக்கவும் அல்லது பதிவேற்றவும்.'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!image ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Take Photo Button */}
                <Button 
                  onClick={handleTakePhoto} 
                  className={`h-40 flex flex-col gap-3 ${textClass}`}
                  variant="outline"
                >
                  <Camera className="h-10 w-10" />
                  <span>{t('captureImage')}</span>
                </Button>
                
                {/* Upload Photo Button */}
                <label className={`cursor-pointer`}>
                  <div className="h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center hover:border-primary hover:bg-primary-50 transition-colors">
                    <Upload className="h-10 w-10 text-gray-400 mb-3" />
                    <span className={`text-gray-600 ${textClass}`}>{t('uploadImage')}</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div>
                {/* Image Preview */}
                <div className="relative mb-4">
                  <img 
                    src={image} 
                    alt="Crop" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  
                  {!result && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2 bg-white"
                      onClick={handleReset}
                    >
                      {language === 'en' ? 'Change' : 'மாற்று'}
                    </Button>
                  )}
                </div>
                
                {isAnalyzing ? (
                  <div className="flex flex-col items-center p-8">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                    <p className={textClass}>
                      {language === 'en' 
                        ? 'Analyzing your crop...' 
                        : 'உங்கள் பயிரை ஆய்வு செய்கிறது...'}
                    </p>
                  </div>
                ) : result ? (
                  <div className="space-y-4">
                    {/* Analysis Results */}
                    <div className="p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center mb-2">
                        <Check className="h-5 w-5 text-green-600 mr-2" />
                        <h3 className={`font-medium ${textClass}`}>
                          {language === 'en' ? 'Analysis Complete' : 'பகுப்பாய்வு முடிந்தது'}
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className={`text-sm text-gray-500 ${textClass}`}>
                            {language === 'en' ? 'Identified Crop' : 'அடையாளம் காணப்பட்ட பயிர்'}
                          </p>
                          <p className={`font-bold text-lg ${textClass}`}>{result.crop}</p>
                        </div>
                        
                        <div>
                          <p className={`text-sm text-gray-500 ${textClass}`}>
                            {language === 'en' ? 'Health Status' : 'ஆரோக்கிய நிலை'}
                          </p>
                          <p className={`font-medium text-green-600 ${textClass}`}>{result.health}</p>
                        </div>
                        
                        <div>
                          <p className={`text-sm text-gray-500 ${textClass}`}>
                            {language === 'en' ? 'Recommendations' : 'பரிந்துரைகள்'}
                          </p>
                          <ul className="list-disc ml-6 mt-1">
                            {result.recommendations.map((rec: string, i: number) => (
                              <li key={i} className={`text-sm ${textClass}`}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleReset}
                      className={`w-full ${textClass}`}
                    >
                      {language === 'en' ? 'Scan Another Crop' : 'மற்றொரு பயிரை ஸ்கேன் செய்யவும்'}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handleScan}
                    className={`w-full ${textClass}`}
                  >
                    <span className="mr-2">{t('scanCrop')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CropIdentification;
