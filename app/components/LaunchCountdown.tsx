'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface LaunchCountdownProps {
  launchDate: string; // ISO date string
  title?: string;
  description?: string;
  onLaunchComplete?: () => void;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const LaunchCountdown: React.FC<LaunchCountdownProps> = ({
  launchDate,
  title = "DESIST Launch",
  description = "Get ready for the ultimate anti-harassment platform",
  onLaunchComplete,
  className = ""
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [emailSignup, setEmailSignup] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = new Date(launchDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsLaunched(true);
        if (onLaunchComplete) {
          onLaunchComplete();
        }
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        total: difference
      };
    };

    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining());
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [launchDate]); // Removed onLaunchComplete from dependencies

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSignup.trim()) return;

    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setEmailSignup('');

    // In a real implementation, you would send this to your newsletter service
    console.log('Newsletter signup:', emailSignup);
  };

  const timeUnits = [
    { label: 'Days', value: timeRemaining.days, color: 'from-red-500 to-red-600' },
    { label: 'Hours', value: timeRemaining.hours, color: 'from-orange-500 to-orange-600' },
    { label: 'Minutes', value: timeRemaining.minutes, color: 'from-blue-500 to-blue-600' },
    { label: 'Seconds', value: timeRemaining.seconds, color: 'from-purple-500 to-purple-600' }
  ];

  const milestones = [
    { 
      title: 'Beta Testing Complete', 
      status: 'completed', 
      date: 'August 15, 2025',
      description: '1,000+ beta testers provided feedback'
    },
    { 
      title: 'Security Audit Passed', 
      status: 'completed', 
      date: 'August 25, 2025',
      description: 'Independent security review completed'
    },
    { 
      title: 'App Store Approval', 
      status: 'in-progress', 
      date: 'September 1, 2025',
      description: 'iOS and Android apps under review'
    },
    { 
      title: 'Official Launch', 
      status: isLaunched ? 'completed' : 'upcoming', 
      date: new Date(launchDate).toISOString().split('T')[0],
      description: 'Full platform goes live'
    }
  ];

  if (isLaunched) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center w-full max-w-2xl mx-auto"
        >
          <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-4">
                {title} is Now Live!
              </h2>
              <p className="text-lg text-green-700 dark:text-green-400 mb-6">
                Join thousands of users already making a difference
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-green-600 hover:bg-green-700">
                  🚀 Start Using DESIST
                </Button>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                  📱 Download Mobile App
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                🚀 Coming Soon
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`bg-gradient-to-br ${unit.color} rounded-xl p-4 text-white shadow-lg`}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={unit.value}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-3xl md:text-4xl font-bold"
                      >
                        {unit.value.toString().padStart(2, '0')}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-sm font-medium opacity-90 mt-2">
                      {unit.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Launch Milestones */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Launch Progress
              </h3>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50"
                  >
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-yellow-500 animate-pulse' :
                      'bg-gray-300 dark:bg-gray-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {milestone.title}
                        </h4>
                        <Badge variant={
                          milestone.status === 'completed' ? 'default' :
                          milestone.status === 'in-progress' ? 'secondary' : 'outline'
                        } className="text-xs">
                          {milestone.status === 'completed' ? '✅ Done' :
                           milestone.status === 'in-progress' ? '⏳ In Progress' : '📅 Planned'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {milestone.description} • {milestone.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Be the First to Know
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get notified the moment DESIST launches, plus exclusive early access features
              </p>
              
              {isSubscribed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-green-600 dark:text-green-400"
                >
                  <div className="text-2xl mb-2">✅</div>
                  <p className="font-medium">Thank you for subscribing!</p>
                  <p className="text-sm">We&apos;ll notify you as soon as we launch.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={emailSignup}
                    onChange={(e) => setEmailSignup(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Notify Me
                  </Button>
                </form>
              )}
            </div>

            {/* Social Sharing */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Spread the word about DESIST:
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = `Join me in supporting DESIST - the new platform fighting harassment and building safer communities! 🛡️ Launch countdown: ${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`;
                    const url = window.location.href;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                  }}
                  className="text-blue-500 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  📱 Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'DESIST Launch Countdown',
                        text: 'Check out the countdown to DESIST launch - fighting harassment together!',
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      // You could show a toast notification here
                    }
                  }}
                  className="text-green-500 border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  🔗 Share Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
