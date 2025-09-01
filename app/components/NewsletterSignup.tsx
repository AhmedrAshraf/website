'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface NewsletterSignupProps {
  variant?: 'compact' | 'full' | 'modal';
  onSuccess?: () => void;
  className?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  variant = 'full',
  onSuccess,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const interestOptions = [
    { id: 'launch', label: 'Product Launches', emoji: '🚀' },
    { id: 'safety', label: 'Safety Tips', emoji: '🛡️' },
    { id: 'community', label: 'Community Updates', emoji: '🤝' },
    { id: 'research', label: 'Research & Reports', emoji: '📊' },
    { id: 'events', label: 'Events & Webinars', emoji: '📅' },
    { id: 'partnerships', label: 'Partnerships', emoji: '🤲' },
  ];

  const handleInterestToggle = (interestId: string) => {
    setInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real implementation, you would integrate with:
    // - Mailchimp, ConvertKit, or other email service
    // - Your backend API to store the subscription
    // - Analytics to track conversions

    console.log('Newsletter subscription:', { email, interests });

    setIsSubmitted(true);
    setIsLoading(false);

    if (onSuccess) {
      onSuccess();
    }

    // Reset form after a delay
    setTimeout(() => {
      setEmail('');
      setInterests([]);
      setIsSubmitted(false);
    }, 3000);
  };

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        {isSubmitted ? (
          <div className="text-center text-green-600 dark:text-green-400">
            <div className="text-xl mb-1">✅</div>
            <p className="font-medium">Subscribed!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            />
            <Button 
              type="submit" 
              size="sm" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? '...' : 'Subscribe'}
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <Card>
        <CardHeader>
          <div className="text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              📬 Stay Updated
            </Badge>
            <CardTitle className="text-2xl mb-2">
              Join the DESIST Newsletter
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Get the latest updates on safety features, community stories, and platform news
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                Welcome to the Community!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Thank you for subscribing! You&apos;ll receive your first newsletter within 24 hours.
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                  ✓ Email confirmed
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                  ✓ Preferences saved
                </Badge>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Interest Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  What interests you? (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleInterestToggle(option.id)}
                      disabled={isLoading}
                      className={`p-3 rounded-lg border transition-all text-left ${
                        interests.includes(option.id)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{option.emoji}</span>
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p>
                  📋 By subscribing, you agree to receive email updates from DESIST. 
                  We respect your privacy and will never share your email with third parties. 
                  You can unsubscribe at any time.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3"
                disabled={isLoading || !email.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  '📬 Subscribe to Newsletter'
                )}
              </Button>

              {/* Benefits */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  What you&apos;ll get:
                </h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    Weekly safety tips and best practices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    Early access to new features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    Community success stories
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    Exclusive event invitations
                  </li>
                </ul>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
