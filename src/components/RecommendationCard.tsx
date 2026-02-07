
import React from 'react';
import { Sparkles, Clock, Droplets, Sun, Moon, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AnalysisResults {
  confidence: number;
  issues: Array<{
    type: string;
    severity: string;
    areas: string[];
    confidence: number;
  }>;
  skinType: string;
  overallHealth: string;
}

interface RecommendationCardProps {
  results: AnalysisResults;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ results }) => {
  const getRecommendations = () => {
    const recommendations = {
      products: [] as string[],
      routine: {
        morning: [] as string[],
        evening: [] as string[]
      },
      lifestyle: [] as string[]
    };

    // Base recommendations based on skin type
    switch (results.skinType.toLowerCase()) {
      case 'combination':
        recommendations.products.push('Gentle foaming cleanser', 'Niacinamide serum', 'Oil-free moisturizer');
        break;
      case 'oily':
        recommendations.products.push('Salicylic acid cleanser', 'Clay mask', 'Lightweight moisturizer');
        break;
      case 'dry':
        recommendations.products.push('Cream cleanser', 'Hyaluronic acid serum', 'Rich moisturizer');
        break;
      default:
        recommendations.products.push('Gentle cleanser', 'Vitamin C serum', 'Daily moisturizer');
    }

    // Issue-specific recommendations
    results.issues.forEach(issue => {
      switch (issue.type.toLowerCase()) {
        case 'acne':
          recommendations.products.push('Benzoyl peroxide treatment', 'Non-comedogenic sunscreen');
          recommendations.lifestyle.push('Change pillowcases frequently', 'Avoid touching face');
          break;
        case 'dark circles':
          recommendations.products.push('Caffeine eye cream', 'Vitamin K serum');
          recommendations.lifestyle.push('Get 7-8 hours of sleep', 'Use cold compress');
          break;
        case 'dryness':
          recommendations.products.push('Ceramide moisturizer', 'Face oil');
          recommendations.lifestyle.push('Use humidifier', 'Drink more water');
          break;
      }
    });

    // Basic routine
    recommendations.routine.morning = [
      'Gentle cleanser',
      'Vitamin C serum',
      'Moisturizer',
      'Sunscreen SPF 30+'
    ];

    recommendations.routine.evening = [
      'Cleanser',
      'Treatment serum',
      'Moisturizer',
      'Face oil (if needed)'
    ];

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      {/* Main Recommendations Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span>Personalized Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Based on your {results.skinType.toLowerCase()} skin type and {results.issues.length} detected issue{results.issues.length !== 1 ? 's' : ''}
          </div>

          {/* Product Recommendations */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>Recommended Products</span>
            </h4>
            <div className="space-y-2">
              {recommendations.products.slice(0, 4).map((product, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{product}</span>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            View Full Product List
          </Button>
        </CardContent>
      </Card>

      {/* Daily Routine Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Daily Routine</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Morning Routine */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span>Morning</span>
            </h4>
            <div className="space-y-2">
              {recommendations.routine.morning.map((step, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evening Routine */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Moon className="h-4 w-4 text-indigo-500" />
              <span>Evening</span>
            </h4>
            <div className="space-y-2">
              {recommendations.routine.evening.map((step, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Lifestyle Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.lifestyle.length > 0 ? (
              recommendations.lifestyle.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{tip}</span>
                </div>
              ))
            ) : (
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Maintain a consistent skincare routine</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Stay hydrated and eat a balanced diet</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Get adequate sleep and manage stress</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking Prompt */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Track Your Progress</h4>
          <p className="text-sm text-gray-600 mb-4">
            Take a new photo in 2-4 weeks to see how your skin improves with these recommendations.
          </p>
          <Button variant="outline" size="sm">
            Set Reminder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationCard;
