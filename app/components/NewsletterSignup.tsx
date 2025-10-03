'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const fadeInVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  if (variant === 'compact') {
    return (
      <motion.div 
        className={`${className}`}
        {...fadeInVariants}
      >
        {isSubmitted ? (
          <motion.div 
            className="text-center text-primary-600 dark:text-primary-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xl mb-1">✅</div>
            <p className="font-medium">Subscribed!</p>
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={handleSubmit} 
            className="flex gap-2"
            {...fadeInVariants}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white text-sm transition-all duration-200"
            />
            <Button 
              type="submit" 
              size="sm" 
              disabled={isLoading}
              variant="primary"
              className="transition-all duration-200"
            >
              {isLoading ? '...' : 'Subscribe'}
            </Button>
          </motion.form>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`${className}`}
      {...fadeInVariants}
    >
      <Card className="overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-gray-900 dark:to-gray-800 opacity-50" />
        <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-5" />
        
        <CardHeader className="relative z-10">
          <motion.div 
            className="text-center"
            variants={staggerVariants}
            initial="initial"
            animate="animate"
            custom={0}
          >
            <Badge 
              variant="default"
              className="mb-4 bg-primary-500 hover:bg-primary-600 text-white shadow-sm"
            >
              📬 Stay Updated
            </Badge>
            <CardTitle className="text-2xl mb-2 font-bold text-gray-900 dark:text-white">
              Join the DESIST Newsletter
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300">
              Get the latest updates on safety features, community stories, and platform news
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="relative z-10">
          {isSubmitted ? (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="text-6xl mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                🎉
              </motion.div>
              <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">
                Welcome to the Community!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Thank you for subscribing! You&apos;ll receive your first newsletter within 24 hours.
              </p>
              <div className="flex justify-center gap-2">
                <Badge 
                  variant="secondary"
                  className="bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300"
                >
                  ✓ Email confirmed
                </Badge>
                <Badge 
                  variant="success"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  ✓ Preferences saved
                </Badge>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              variants={staggerVariants}
              initial="initial"
              animate="animate"
              custom={1}
            >
              {/* Email Input */}
              <motion.div
                variants={staggerVariants}
                custom={0}
              >
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
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
                />
              </motion.div>

              {/* Interest Selection */}
              <motion.div
                variants={staggerVariants}
                custom={1}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  What interests you? (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((option, index) => (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => handleInterestToggle(option.id)}
                      disabled={isLoading}
                      variants={staggerVariants}
                      custom={index + 2}
                      className={`p-3 rounded-lg border transition-all duration-200 text-left hover:shadow-sm ${
                        interests.includes(option.id)
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{option.emoji}</span>
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Privacy Notice */}
              <motion.div 
                className="text-xs text-gray-500 dark:text-gray-400 bg-secondary-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
                variants={staggerVariants}
                custom={8}
              >
                <p>
                  📋 By subscribing, you agree to receive email updates from DESIST. 
                  We respect your privacy and will never share your email with third parties. 
                  You can unsubscribe at any time.
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                variants={staggerVariants}
                custom={9}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full group relative overflow-hidden transition-all duration-300 hover:shadow-md"
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </div>
                  ) : (
                    <span className="group-hover:text-primary-100">📬 Subscribe to Newsletter</span>
                  )}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute right-0 w-12 h-full bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" /> */}
                </Button>
              </motion.div>

              {/* Benefits */}
              <motion.div 
                className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-100 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-lg border border-gray-100 dark:border-gray-700"
                variants={staggerVariants}
                custom={10}
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  What you&apos;ll get:
                </h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-primary-600 dark:text-primary-400">✓</span>
                    Weekly safety tips and best practices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-600 dark:text-primary-400">✓</span>
                    Early access to new features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-600 dark:text-primary-400">✓</span>
                    Community success stories
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-600 dark:text-primary-400">✓</span>
                    Exclusive event invitations
                  </li>
                </ul>
              </motion.div>
            </motion.form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
