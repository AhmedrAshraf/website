import { Metadata } from 'next';
import { LaunchCountdown } from '../components/LaunchCountdown';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const metadata: Metadata = {
  title: 'Press Kit - DESIST',
  description: 'Media resources, company information, and press materials for DESIST - the anti-harassment platform.',
  openGraph: {
    title: 'DESIST Press Kit',
    description: 'Media resources and press materials for DESIST - building safer digital communities.',
    images: ['/press/desist-logo-social.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DESIST Press Kit',
    description: 'Media resources and press materials for DESIST.',
    images: ['/press/desist-logo-social.jpg'],
  },
};

export default function PressPage() {
  const pressAssets = {
    logos: [
      {
        name: 'Primary Logo (PNG)',
        description: 'High-resolution logo with transparent background',
        size: '2048x512px',
        downloadUrl: '/press/logo-primary.png',
      },
      {
        name: 'Logo Mark (SVG)',
        description: 'Scalable vector logo mark',
        size: 'Vector',
        downloadUrl: '/press/logo-mark.svg',
      },
      {
        name: 'Logo White (PNG)',
        description: 'Logo optimized for dark backgrounds',
        size: '2048x512px',
        downloadUrl: '/press/logo-white.png',
      },
      {
        name: 'Favicon Package',
        description: 'Complete favicon set for web use',
        size: 'Multiple sizes',
        downloadUrl: '/press/favicon-package.zip',
      },
    ],
    screenshots: [
      {
        name: 'Dashboard Overview',
        description: 'Main user dashboard interface',
        downloadUrl: '/press/screenshot-dashboard.jpg',
      },
      {
        name: 'Community Features',
        description: 'Community forum and interaction tools',
        downloadUrl: '/press/screenshot-community.jpg',
      },
      {
        name: 'Emergency Resources',
        description: 'Crisis support and safety features',
        downloadUrl: '/press/screenshot-emergency.jpg',
      },
      {
        name: 'Mobile App Interface',
        description: 'iOS and Android app screenshots',
        downloadUrl: '/press/screenshot-mobile.jpg',
      },
    ],
    brandColors: [
      { name: 'Primary Blue', hex: '#3B82F6', rgb: 'rgb(59, 130, 246)' },
      { name: 'Secondary Purple', hex: '#8B5CF6', rgb: 'rgb(139, 92, 246)' },
      { name: 'Success Green', hex: '#10B981', rgb: 'rgb(16, 185, 129)' },
      { name: 'Warning Orange', hex: '#F59E0B', rgb: 'rgb(245, 158, 11)' },
      { name: 'Error Red', hex: '#EF4444', rgb: 'rgb(239, 68, 68)' },
      { name: 'Neutral Gray', hex: '#6B7280', rgb: 'rgb(107, 114, 128)' },
    ],
  };

  const companyFacts = {
    founded: '2025',
    mission: 'To eliminate digital harassment and build safer online communities through technology, education, and community support.',
    userBase: '50,000+ beta users',
    platforms: ['Web App', 'iOS', 'Android', 'Browser Extension'],
    languages: '12 languages supported',
    headquarters: 'United States',
    funding: 'Privately funded',
  };

  const keyFeatures = [
    {
      title: '🛡️ Real-time Protection',
      description: 'AI-powered detection and blocking of harassment across platforms',
    },
    {
      title: '🤝 Community Support',
      description: 'Peer-to-peer support networks and professional counseling resources',
    },
    {
      title: '📚 Educational Resources',
      description: 'Comprehensive guides on digital safety and harassment prevention',
    },
    {
      title: '🚨 Emergency Response',
      description: 'Immediate crisis support and connection to local resources',
    },
    {
      title: '🔒 Privacy First',
      description: 'End-to-end encryption and user-controlled data privacy',
    },
    {
      title: '📱 Cross-Platform',
      description: 'Seamless protection across web, mobile, and social platforms',
    },
  ];

  const mediaContact = {
    name: 'Sarah Johnson',
    title: 'Head of Communications',
    email: 'press@desist.org',
    phone: '+1 (555) 123-4567',
    timezone: 'EST (UTC-5)',
  };

  const pressReleases = [
    {
      date: 'September 1, 2025',
      title: 'DESIST Launches Public Beta with 50,000+ Users',
      summary: 'Anti-harassment platform opens to public after successful closed beta testing.',
      downloadUrl: '/press/release-beta-launch.pdf',
    },
    {
      date: 'August 15, 2025',
      title: 'DESIST Completes $5M Seed Round Led by Social Impact Ventures',
      summary: 'Funding will accelerate platform development and expand community support programs.',
      downloadUrl: '/press/release-funding.pdf',
    },
    {
      date: 'July 30, 2025',
      title: 'DESIST Partners with National Crisis Hotlines for Emergency Support',
      summary: 'Platform integrates direct access to professional crisis intervention services.',
      downloadUrl: '/press/release-crisis-partnership.pdf',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            📰 Press Kit
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            DESIST Press Kit
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Media resources, company information, and brand assets for journalists, 
            partners, and content creators covering DESIST.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            📥 Download Complete Press Kit (ZIP)
          </Button>
        </div>

        {/* Launch Countdown */}
        <div className="mb-16">
          <LaunchCountdown 
            launchDate="2025-09-15T09:00:00Z"
            title="DESIST Official Launch"
            description="The comprehensive anti-harassment platform goes live"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  DESIST is a comprehensive anti-harassment platform that combines cutting-edge 
                  AI technology with community-driven support to create safer digital spaces. 
                  Founded in 2025, we&apos;re on a mission to eliminate online harassment through 
                  real-time protection, educational resources, and crisis support.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(companyFacts).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features & Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {keyFeatures.map((feature, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Press Releases */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Press Releases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pressReleases.map((release, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {release.date}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Press Release
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {release.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {release.summary}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(release.downloadUrl, '_blank')}
                      >
                        📄 Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Brand Assets */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logos */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Logos</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {pressAssets.logos.map((logo, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {logo.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {logo.description}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {logo.size}
                            </span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(logo.downloadUrl, '_blank')}
                          >
                            ⬇️
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand Colors */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Brand Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {pressAssets.brandColors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-full h-16 rounded-lg mb-2 border border-gray-200 dark:border-gray-700"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {color.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {color.hex}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screenshots */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Screenshots</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {pressAssets.screenshots.map((screenshot, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {screenshot.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {screenshot.description}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(screenshot.downloadUrl, '_blank')}
                          >
                            🖼️ View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Media Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Media Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {mediaContact.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {mediaContact.title}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">📧</span>
                    <a 
                      href={`mailto:${mediaContact.email}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {mediaContact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">📞</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {mediaContact.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">🕐</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {mediaContact.timezone}
                    </span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                  📞 Schedule Interview
                </Button>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="font-semibold text-blue-900 dark:text-blue-300">
                      Launch Status
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-400">
                      Public Beta • Full Launch Sept 15
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-semibold text-green-900 dark:text-green-300">
                      User Safety
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-400">
                      99.2% harassment detection rate
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="font-semibold text-purple-900 dark:text-purple-300">
                      Community Impact
                    </div>
                    <div className="text-sm text-purple-700 dark:text-purple-400">
                      85% reduction in harassment reports
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow DESIST</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://twitter.com/desistorg', '_blank')}
                  >
                    🐦 @desistorg
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://linkedin.com/company/desist', '_blank')}
                  >
                    💼 DESIST Inc.
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://github.com/desistorg', '_blank')}
                  >
                    💻 github.com/desistorg
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
