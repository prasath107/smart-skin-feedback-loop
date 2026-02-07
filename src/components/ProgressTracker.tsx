
import React from 'react';
import { TrendingUp, Calendar, Camera, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ProgressTracker: React.FC = () => {
  // Mock data for demonstration
  const mockProgress = {
    totalAnalyses: 1,
    daysTracking: 1,
    improvementScore: 0,
    nextAnalysisDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    streak: 0,
    goals: [
      { name: 'Reduce Acne', progress: 0, target: 80 },
      { name: 'Improve Hydration', progress: 0, target: 90 },
      { name: 'Even Skin Tone', progress: 0, target: 75 }
    ]
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Progress Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockProgress.totalAnalyses}</div>
              <div className="text-sm text-gray-600">Analyses</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">{mockProgress.daysTracking}</div>
              <div className="text-sm text-gray-600">Days Tracking</div>
            </div>
          </div>

          <div className="text-center p-4 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900 mb-1">Start Your Journey</h4>
            <p className="text-sm text-gray-600 mb-3">
              Take regular photos to track your skin improvement over time.
            </p>
            <Button size="sm" variant="outline">
              Set Reminder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Goals Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-purple-600" />
            <span>Skin Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockProgress.goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{goal.name}</span>
                <span className="text-sm text-gray-600">{goal.progress}% / {goal.target}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
          
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Goals will update as you track your progress
            </p>
            <Button variant="outline" size="sm">
              Customize Goals
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Analysis Reminder */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900">Next Analysis</h4>
              <p className="text-sm text-blue-700">
                Recommended: {formatDate(mockProgress.nextAnalysisDate)}
              </p>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Remind Me
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips for Better Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tips for Better Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Take photos in the same lighting conditions</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Use the same angle and distance</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Track progress weekly or bi-weekly</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Be consistent with your skincare routine</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
