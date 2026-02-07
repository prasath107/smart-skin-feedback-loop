
import React, { useState } from 'react';
import { Star, MessageSquare, Send, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface FeedbackData {
  rating: number;
  comment: string;
  helpfulness: 'helpful' | 'not-helpful' | null;
}

interface FeedbackSystemProps {
  onFeedbackSubmit: (feedback: FeedbackData) => void;
}

const FeedbackSystem: React.FC<FeedbackSystemProps> = ({ onFeedbackSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [helpfulness, setHelpfulness] = useState<'helpful' | 'not-helpful' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please provide a rating before submitting.');
      return;
    }

    const feedbackData: FeedbackData = {
      rating,
      comment: comment.trim(),
      helpfulness
    };

    onFeedbackSubmit(feedbackData);
    setIsSubmitted(true);
    toast.success('Thank you for your feedback! This helps us improve our AI.');
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-700 mb-4">
            Your feedback has been submitted successfully. It will help us improve our AI analysis for everyone.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
            <Star className="h-4 w-4 fill-current" />
            <span>Your rating: {rating} stars</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <span>Help Us Improve</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Your feedback helps our AI learn and provide better recommendations for everyone.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Section */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">How accurate were your results?</h4>
          <div className="flex items-center space-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all duration-200 hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            {getRatingText(hoveredRating || rating)}
          </p>
        </div>

        {/* Helpfulness Section */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Were the recommendations helpful?</h4>
          <div className="flex space-x-3">
            <Button
              variant={helpfulness === 'helpful' ? 'default' : 'outline'}
              onClick={() => setHelpfulness('helpful')}
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful</span>
            </Button>
            <Button
              variant={helpfulness === 'not-helpful' ? 'default' : 'outline'}
              onClick={() => setHelpfulness('not-helpful')}
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="h-4 w-4 rotate-180" />
              <span>Not Helpful</span>
            </Button>
          </div>
        </div>

        {/* Comment Section */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Additional Comments (Optional)</h4>
          <Textarea
            placeholder="Share any specific feedback about the analysis or recommendations..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            Your comments help us understand what works and what needs improvement.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white flex items-center space-x-2 px-6 py-2"
          >
            <Send className="h-4 w-4" />
            <span>Submit Feedback</span>
          </Button>
        </div>

        {/* Privacy Note */}
        <div className="text-xs text-gray-500 border-t pt-4">
          <p>
            🔒 Your feedback is anonymous and helps improve our AI model. 
            No personal information is stored with your feedback.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSystem;
