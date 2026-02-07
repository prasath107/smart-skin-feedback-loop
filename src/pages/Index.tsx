
import React from 'react';
import { Camera, Upload, Sparkles, Heart, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ImageCapture from '@/components/ImageCapture';
import SkinAnalysis from '@/components/SkinAnalysis';
import RecommendationCard from '@/components/RecommendationCard';
import FeedbackSystem from '@/components/FeedbackSystem';
import ProgressTracker from '@/components/ProgressTracker';

const Index = () => {
  const [currentStep, setCurrentStep] = React.useState<'capture' | 'analyzing' | 'results'>('capture');
  const [analysisResults, setAnalysisResults] = React.useState(null);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setCurrentStep('analyzing');
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const mockResults = {
        confidence: 92,
        issues: [
          { type: 'Acne', severity: 'Moderate', areas: ['Forehead', 'Chin'], confidence: 87 },
          { type: 'Dark Circles', severity: 'Mild', areas: ['Under Eyes'], confidence: 94 },
          { type: 'Dryness', severity: 'Light', areas: ['Cheeks'], confidence: 76 }
        ],
        skinType: 'Combination',
        overallHealth: 'Good'
      };
      setAnalysisResults(mockResults);
      setCurrentStep('results');
    }, 3000);
  };

  const handleNewAnalysis = () => {
    setCurrentStep('capture');
    setAnalysisResults(null);
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  SmartSkin
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Skin Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Trusted by 10K+ users</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'capture' && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Your Skin's Potential
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Get personalized skincare recommendations powered by advanced AI analysis. 
                Upload a photo or use your camera to start your skin journey.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Instant Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Personalized Tips</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Privacy Protected</span>
                </div>
              </div>
            </div>

            {/* Image Capture Component */}
            <ImageCapture onImageCapture={handleImageCapture} />

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Advanced Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Our AI identifies acne, dark circles, wrinkles, and skin texture with 95% accuracy.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Smart Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Get personalized product suggestions and daily routines tailored to your skin type.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Monitor your skin improvement over time with detailed analytics and insights.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Skin</h3>
              <p className="text-gray-600 mb-8">Our AI is carefully examining your photo to provide the most accurate analysis...</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Detecting facial features</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                  <span>Analyzing skin texture</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-400"></div>
                  <span>Generating recommendations</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'results' && analysisResults && (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Your Skin Analysis</h2>
                <p className="text-gray-600">Based on advanced AI analysis</p>
              </div>
              <Button onClick={handleNewAnalysis} variant="outline" className="flex items-center space-x-2">
                <Camera className="h-4 w-4" />
                <span>New Analysis</span>
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Analysis Results */}
              <div className="lg:col-span-2">
                <SkinAnalysis results={analysisResults} image={capturedImage} />
              </div>

              {/* Recommendations Sidebar */}
              <div className="space-y-6">
                <RecommendationCard results={analysisResults} />
                <ProgressTracker />
              </div>
            </div>

            {/* Feedback System */}
            <div className="mt-12">
              <FeedbackSystem onFeedbackSubmit={(feedback) => console.log('Feedback:', feedback)} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">SmartSkin</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted AI companion for healthier, more beautiful skin.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Skin Analysis</li>
                <li>Product Recommendations</li>
                <li>Progress Tracking</li>
                <li>Expert Tips</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>FAQ</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <p className="text-sm text-gray-400 mb-4">
                Join our community for the latest skincare tips and updates.
              </p>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Heart className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Star className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SmartSkin. All rights reserved. Made with ❤️ for healthy skin.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
