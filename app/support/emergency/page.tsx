'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AppDownloadCTA } from '../../components/AppDownloadCTA';

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  type: 'hotline' | 'text' | 'chat' | 'local';
  available: string;
  languages?: string[];
  specialties?: string[];
}

export default function EmergencyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'National Domestic Violence Hotline',
      number: '1-800-799-7233',
      description: '24/7 confidential support for domestic violence survivors and their loved ones.',
      type: 'hotline',
      available: '24/7',
      languages: ['English', 'Spanish', '200+ languages via interpretation'],
      specialties: ['Domestic Violence', 'Safety Planning', 'Local Resources']
    },
    {
      id: '2',
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text message.',
      type: 'text',
      available: '24/7',
      languages: ['English', 'Spanish'],
      specialties: ['Crisis Support', 'Emotional Support', 'Mental Health']
    },
    {
      id: '3',
      name: 'RAINN National Sexual Assault Hotline',
      number: '1-800-656-4673',
      description: 'Confidential support for sexual assault survivors.',
      type: 'hotline',
      available: '24/7',
      languages: ['English', 'Spanish'],
      specialties: ['Sexual Assault', 'Counseling', 'Legal Information']
    },
    {
      id: '4',
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: 'Free and confidential emotional support for people in suicidal crisis.',
      type: 'hotline',
      available: '24/7',
      languages: ['English', 'Spanish'],
      specialties: ['Suicide Prevention', 'Mental Health Crisis', 'Emotional Support']
    },
    {
      id: '5',
      name: 'LGBT National Hotline',
      number: '1-888-843-4564',
      description: 'Confidential support for LGBTQ+ individuals facing harassment or discrimination.',
      type: 'hotline',
      available: 'Mon-Fri 4pm-12am, Sat 12pm-5pm EST',
      languages: ['English'],
      specialties: ['LGBTQ+ Issues', 'Harassment', 'Discrimination']
    },
    {
      id: '6',
      name: 'National Human Trafficking Hotline',
      number: '1-888-373-7888',
      description: 'Report suspected human trafficking and get help for victims.',
      type: 'hotline',
      available: '24/7',
      languages: ['English', 'Spanish', '200+ languages via interpretation'],
      specialties: ['Human Trafficking', 'Victim Services', 'Reporting']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: '📞' },
    { id: 'hotline', label: 'Phone Hotlines', icon: '☎️' },
    { id: 'text', label: 'Text Support', icon: '💬' },
    { id: 'chat', label: 'Online Chat', icon: '💻' },
    { id: 'local', label: 'Local Resources', icon: '📍' }
  ];

  const filteredContacts = selectedCategory === 'all' 
    ? emergencyContacts 
    : emergencyContacts.filter(contact => contact.type === selectedCategory);

  const safetyTips = [
    {
      icon: '🔒',
      title: 'Use a Safe Device',
      description: 'Use a device that your abuser doesn\'t have access to when seeking help.'
    },
    {
      icon: '🔄',
      title: 'Clear Your History',
      description: 'Clear your browser history and use incognito/private browsing mode.'
    },
    {
      icon: '📱',
      title: 'Have a Safety Plan',
      description: 'Develop a safety plan for leaving dangerous situations quickly.'
    },
    {
      icon: '👥',
      title: 'Tell Someone You Trust',
      description: 'Let a trusted friend or family member know about your situation.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="font-medium">
            🚨 If you are in immediate danger, call 911 or your local emergency services immediately
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Emergency Resources & Support
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Access immediate help and support. You&apos;re not alone, and help is available 24/7.
            </p>
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              🆘 Crisis Support Available
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Numbers */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="text-center border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">🚨</div>
                  <h3 className="font-bold text-red-600 dark:text-red-400">Emergency</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">911</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">☎️</div>
                  <h3 className="font-bold text-blue-600 dark:text-blue-400">Domestic Violence</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">1-800-799-7233</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="text-center border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">💬</div>
                  <h3 className="font-bold text-green-600 dark:text-green-400">Crisis Text</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">HOME to 741741</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Emergency Contacts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {contact.name}
                      </h3>
                      <Badge variant={contact.type === 'hotline' ? 'default' : 'secondary'}>
                        {contact.type === 'hotline' ? '☎️' : contact.type === 'text' ? '💬' : '💻'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {contact.number}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Available: {contact.available}
                      </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300">
                      {contact.description}
                    </p>

                    {contact.specialties && (
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {contact.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {contact.languages && (
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Languages:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {contact.languages.join(', ')}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 space-y-2">
                      <Button className="w-full" onClick={() => window.open(`tel:${contact.number}`)}>
                        Call Now
                      </Button>
                      {contact.type === 'text' && (
                        <Button variant="outline" className="w-full" onClick={() => window.open(`sms:${contact.number.split(' ').pop()}`)}>
                          Send Text
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Digital Safety Tips
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Protect yourself while seeking help online or through digital resources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-4">{tip.icon}</div>
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Take Safety With You Everywhere
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Download the DESIST app for discreet access to emergency resources, 
              documentation tools, and safety features wherever you go.
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-yellow-50 dark:bg-yellow-900/20 border-y border-yellow-200 dark:border-yellow-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">
                Important: Your Safety Comes First
              </h3>
            </div>
            <p className="text-yellow-700 dark:text-yellow-400">
              If you are in immediate physical danger, call 911 immediately. If your internet activity is being monitored, 
              consider using a safer computer or device. Clear your browser history after visiting safety resources.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
