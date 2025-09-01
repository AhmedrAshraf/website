'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AppDownloadCTA } from '../../components/AppDownloadCTA';
import Link from 'next/link';

export default function StealthModePage() {
  const features = [
    {
      icon: '🔒',
      title: 'Hidden App Icon',
      description: 'Disguise the DESIST app to look like a calculator, weather app, or other innocuous utility.'
    },
    {
      icon: '🛡️',
      title: 'Secure PIN Access',
      description: 'Access your safety tools and resources through a secret PIN that only you know.'
    },
    {
      icon: '📱',
      title: 'Panic Mode',
      description: 'Quickly exit to a decoy screen if someone unexpectedly looks at your phone.'
    },
    {
      icon: '🔄',
      title: 'Quick Switch',
      description: 'Instantly switch between stealth mode and normal mode based on your safety needs.'
    },
    {
      icon: '📞',
      title: 'Emergency Contacts',
      description: 'Access emergency contacts and safety resources even in stealth mode.'
    },
    {
      icon: '🤐',
      title: 'No Notifications',
      description: 'All notifications are disabled in stealth mode to maintain your privacy and safety.'
    }
  ];

  const scenarios = [
    {
      title: 'Workplace Harassment',
      description: 'Document incidents discreetly while maintaining professional appearances.',
      icon: '🏢'
    },
    {
      title: 'Domestic Situations',
      description: 'Access safety resources without raising suspicion in your living environment.',
      icon: '🏠'
    },
    {
      title: 'Public Transportation',
      description: 'Report incidents and access help while appearing to use a normal app.',
      icon: '🚌'
    },
    {
      title: 'Social Settings',
      description: 'Get support and document experiences without drawing unwanted attention.',
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              🔒 Privacy & Safety Feature
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stealth Mode
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Protect yourself with discretion. DESIST&apos;s Stealth Mode lets you access support 
              and document incidents without anyone knowing you&apos;re using a safety app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support/emergency">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  🚨 Emergency Resources
                </Button>
              </Link>
              <AppDownloadCTA />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Stealth Mode Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              How Stealth Mode Protects You
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Your safety is our priority. Stealth Mode ensures you can access help and document incidents 
              without putting yourself at additional risk.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Use Stealth Mode */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              When to Use Stealth Mode
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Stealth Mode is designed for situations where using an obvious safety app could put you at risk.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{scenario.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                          {scenario.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {scenario.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Instructions */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Setting Up Stealth Mode
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Follow these simple steps to enable and configure Stealth Mode on your device.
            </p>
          </motion.div>

          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Download the DESIST App',
                    description: 'Install the DESIST app on your smartphone from the App Store or Google Play.'
                  },
                  {
                    step: 2,
                    title: 'Complete Initial Setup',
                    description: 'Create your account and complete the safety assessment to personalize your experience.'
                  },
                  {
                    step: 3,
                    title: 'Enable Stealth Mode',
                    description: 'Go to Settings > Privacy & Safety > Stealth Mode and toggle it on.'
                  },
                  {
                    step: 4,
                    title: 'Choose Your Disguise',
                    description: 'Select what type of app you want DESIST to appear as (calculator, weather, etc.).'
                  },
                  {
                    step: 5,
                    title: 'Set Your PIN',
                    description: 'Create a secure PIN that will be used to access DESIST features in stealth mode.'
                  },
                  {
                    step: 6,
                    title: 'Test the Feature',
                    description: 'Practice switching in and out of stealth mode to ensure you\'re comfortable with the process.'
                  }
                ].map((instruction, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      {instruction.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {instruction.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {instruction.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Safety Notice */}
      <section className="py-16 px-4 bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-800">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader className="bg-amber-100 dark:bg-amber-900/30">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
                    Important Safety Considerations
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Trust Your Instincts:</strong> If you feel unsafe using any technology, prioritize your immediate safety over documentation.
                  </p>
                  <p>
                    <strong>Practice First:</strong> Familiarize yourself with stealth mode features before you need them in a real situation.
                  </p>
                  <p>
                    <strong>Have Backup Plans:</strong> Stealth mode is one tool among many. Always have multiple safety strategies.
                  </p>
                  <p>
                    <strong>Stay Updated:</strong> Keep the app updated to ensure you have the latest security and privacy features.
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-amber-200 dark:border-amber-700">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    If you are in immediate danger, call 911 or your local emergency services. 
                    Technology tools should supplement, not replace, traditional safety measures.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Protected?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Download the DESIST app today and take control of your safety with discretion and confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppDownloadCTA />
              <Link href="/support/emergency">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  🆘 Emergency Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
