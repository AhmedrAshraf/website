'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface SurveyQuestion {
  id: string;
  type: 'rating' | 'multiple-choice' | 'text' | 'yes-no';
  question: string;
  required?: boolean;
  options?: string[];
  maxRating?: number;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  estimatedTime: number;
  incentive?: string;
}

type SurveyResponse = string | number | boolean;

interface SurveyModalProps {
  onClose: () => void;
  onComplete: (responses: Record<string, SurveyResponse>) => void;
}

export const SurveyModal: React.FC<SurveyModalProps> = ({ onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, SurveyResponse>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const survey: Survey = {
    id: 'user-experience-q3-2025',
    title: 'Help Us Improve DESIST',
    description: 'Your feedback helps us build better safety tools and community features.',
    estimatedTime: 3,
    incentive: 'Get early access to new features',
    questions: [
      {
        id: 'satisfaction',
        type: 'rating',
        question: 'How satisfied are you with DESIST overall?',
        required: true,
        maxRating: 5
      },
      {
        id: 'most-valuable-feature',
        type: 'multiple-choice',
        question: 'Which feature do you find most valuable?',
        required: true,
        options: [
          'Real-time harassment protection',
          'Community support forums',
          'Emergency resources',
          'Educational content',
          'Stealth mode features',
          'Badge system'
        ]
      },
      {
        id: 'safety-improvement',
        type: 'yes-no',
        question: 'Has DESIST improved your online safety?',
        required: true
      },
      {
        id: 'recommendation-likelihood',
        type: 'rating',
        question: 'How likely are you to recommend DESIST to others?',
        required: true,
        maxRating: 10
      },
      {
        id: 'missing-features',
        type: 'text',
        question: 'What features or improvements would you like to see?',
        required: false
      },
      {
        id: 'community-engagement',
        type: 'multiple-choice',
        question: 'How do you prefer to engage with the community?',
        required: false,
        options: [
          'Reading posts and stories',
          'Participating in discussions',
          'Sharing my own experiences',
          'Joining campaigns and challenges',
          'Mentoring others',
          'I prefer not to engage publicly'
        ]
      }
    ]
  };

  const currentQ = survey.questions[currentQuestion];
  const isLastQuestion = currentQuestion === survey.questions.length - 1;
  const progress = ((currentQuestion + 1) / survey.questions.length) * 100;

  const handleResponse = (value: SurveyResponse) => {
    setResponses(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
      onComplete(responses);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (!currentQ.required) return true;
    return responses[currentQ.id] !== undefined && responses[currentQ.id] !== '';
  };

  const renderQuestion = () => {
    const currentResponse = responses[currentQ.id];

    switch (currentQ.type) {
      case 'rating':
        const maxRating = currentQ.maxRating || 5;
        return (
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {Array.from({ length: maxRating }, (_, i) => i + 1).map(rating => (
                <button
                  key={rating}
                  onClick={() => handleResponse(rating)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    currentResponse === rating
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Very Dissatisfied</span>
              <span>Very Satisfied</span>
            </div>
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQ.options?.map(option => (
              <button
                key={option}
                onClick={() => handleResponse(option)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  currentResponse === option
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    currentResponse === option
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {currentResponse === option && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'yes-no':
        return (
          <div className="flex justify-center gap-4">
            {['Yes', 'No'].map(answer => (
              <button
                key={answer}
                onClick={() => handleResponse(answer === 'Yes')}
                className={`px-8 py-4 rounded-lg border-2 transition-all ${
                  currentResponse === (answer === 'Yes')
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={typeof currentResponse === 'string' ? currentResponse : ''}
            onChange={(e) => handleResponse(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
          />
        );

      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your feedback is invaluable in helping us improve DESIST. As a thank you, 
            you now have early access to new features!
          </p>
          <div className="flex justify-center mb-6">
            <Badge className="bg-green-600 text-white">
              🎁 Early Access Unlocked
            </Badge>
          </div>
          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
            Continue Using DESIST
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-blue-600 text-white">
                📊 Quick Survey
              </Badge>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <CardTitle className="text-2xl mb-2">{survey.title}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {survey.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>⏱️ ~{survey.estimatedTime} minutes</span>
              {survey.incentive && (
                <span>🎁 {survey.incentive}</span>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Question {currentQuestion + 1} of {survey.questions.length}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {currentQ.question}
                {currentQ.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              {renderQuestion()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentQ.required && !canProceed() && (
                  <span className="text-red-500">* Required question</span>
                )}
              </div>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLastQuestion ? 'Complete Survey' : 'Next →'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// Hook to manage survey modal display
export const useSurveyModal = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    // Check if user should see survey
    const lastSurvey = localStorage.getItem('last-survey-date');
    const userJoinDate = localStorage.getItem('user-join-date');
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Show survey if:
    // 1. User hasn't taken a survey in 30 days
    // 2. User has been active for at least 7 days
    // 3. It's not their first session
    if (userJoinDate) {
      const joinDate = new Date(userJoinDate);
      const sevenDaysAfterJoin = new Date(joinDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const shouldShow = 
        (!lastSurvey || new Date(lastSurvey) < thirtyDaysAgo) &&
        currentDate > sevenDaysAfterJoin &&
        Math.random() < 0.1; // 10% chance to show survey

      if (shouldShow) {
        // Delay showing survey to not interrupt user flow
        const timer = setTimeout(() => {
          setShowSurvey(true);
        }, 30000); // Show after 30 seconds

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleComplete = (responses: Record<string, SurveyResponse>) => {
    localStorage.setItem('last-survey-date', new Date().toISOString());
    localStorage.setItem('survey-responses', JSON.stringify(responses));
    
    // In a real implementation, send to your analytics/backend
    console.log('Survey completed:', responses);
    
    setShowSurvey(false);
  };

  const handleClose = () => {
    localStorage.setItem('survey-dismissed', new Date().toISOString());
    setShowSurvey(false);
  };

  return {
    showSurvey,
    handleComplete,
    handleClose,
    SurveyModal: showSurvey ? (
      <SurveyModal onComplete={handleComplete} onClose={handleClose} />
    ) : null
  };
};
