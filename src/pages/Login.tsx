import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LanguageToggle from '@/components/common/LanguageToggle';
import { Leaf, Sprout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated, login, verifyOTP } = useAuth();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const textClass = language === 'ta' ? 'font-tamil' : '';

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(phoneNumber);
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please enter the OTP sent to your mobile.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await verifyOTP(otp);
      if (!success) {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-primary-100">
      <header className="w-full p-4 flex justify-end">
        <LanguageToggle />
      </header>
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-block bg-white p-3 rounded-full shadow-lg mb-4">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
            <h1 className={`text-3xl font-bold text-primary ${textClass}`}>{t('appName')}</h1>
            <p className={`mt-2 text-sm text-gray-600 ${textClass}`}>
              {language === 'en' 
                ? 'Smart Farming Assistant' 
                : 'விவசாய உதவியாளர்'}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className={textClass}>
                {isOtpSent ? t('enterOTP') : t('login')}
              </CardTitle>
              <CardDescription className={textClass}>
                {language === 'en' 
                  ? (isOtpSent 
                      ? 'Enter the OTP sent to your phone' 
                      : 'Enter your phone number to continue') 
                  : (isOtpSent 
                      ? 'உங்கள் தொலைபேசிக்கு அனுப்பப்பட்ட OTP ஐ உள்ளிடவும்' 
                      : 'தொடர உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {!isOtpSent ? (
                <form onSubmit={handlePhoneSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className={textClass}>{t('phoneNumber')}</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        maxLength={10}
                        className="text-lg"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className={`w-full ${textClass}`} 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          {t('getOTP')}
                        </span>
                      ) : (
                        t('getOTP')
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp" className={textClass}>{t('enterOTP')}</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="1234"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={4}
                        className="text-lg tracking-widest text-center"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className={`w-full ${textClass}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          {t('verifyOTP')}
                        </span>
                      ) : (
                        t('verifyOTP')
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-center">
              {isOtpSent && (
                <Button
                  variant="link"
                  onClick={() => setIsOtpSent(false)}
                  className={textClass}
                >
                  {language === 'en' 
                    ? 'Change phone number' 
                    : 'தொலைபேசி எண்ணை மாற்றவும்'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <footer className="text-center py-4">
        <div className="flex items-center justify-center space-x-1 text-gray-500 text-sm">
          <Sprout className="h-4 w-4" />
          <span className={textClass}>
            {language === 'en' 
              ? '© 2023 PasumaiAI. All rights reserved.' 
              : '© 2023 பசுமை AI. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
