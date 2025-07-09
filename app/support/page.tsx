"use client";
import { CallToAction } from "../components/CallToAction";
import { FeatureGrid } from "../components/FeatureGrid";
import { HeroSection } from "../components/HeroSection";
import { useTranslation } from "../context/TranslationContext";

export default function SupportPage() {
  const { t } = useTranslation();

  // const supportStats = [
  //   {
  //     value: "24/7",
  //     label: "Support Available",
  //     icon: "🕒",
  //     color: "bg-blue-100 dark:bg-blue-900/30"
  //   },
  //   {
  //     value: "15min",
  //     label: "Avg. Response Time",
  //     icon: "⚡",
  //     color: "bg-yellow-100 dark:bg-yellow-900/30"
  //   },
  //   {
  //     value: "50+",
  //     label: "Support Agents",
  //     icon: "👥",
  //     color: "bg-green-100 dark:bg-green-900/30"
  //   },
  //   {
  //     value: "100%",
  //     label: "Confidential",
  //     icon: "🔒",
  //     color: "bg-purple-100 dark:bg-purple-900/30"
  //   }
  // ];

  // const supportFeatures = [
  //   {
  //     icon: "💬",
  //     title: "Chat Support",
  //     description: "Connect with a trained support specialist instantly through our secure chat.",
  //     link: {
  //       label: "Start Chat",
  //       href: "#chat"
  //     }
  //   },
  //   {
  //     icon: "📞",
  //     title: "Phone Support",
  //     description: "Speak directly with our support team for immediate assistance.",
  //     link: {
  //       label: "Call Now",
  //       href: "tel:1-800-555-0000"
  //     }
  //   },
  //   {
  //     icon: "👩‍⚖️",
  //     title: "Legal Support",
  //     description: "Get legal advice and representation from our trusted partners.",
  //     link: {
  //       label: "See Lawyers List",
  //       href: "/legal-help"
  //     }
  //   },
  //   {
  //     icon: "🏥",
  //     title: "Crisis Support",
  //     description: "Immediate assistance for crisis situations and emergencies.",
  //     link: {
  //       label: "Get Help",
  //       href: "#crisis"
  //     }
  //   },
  //   {
  //     icon: "📚",
  //     title: "Resources",
  //     description: "Access our library of resources and educational materials.",
  //     link: {
  //       label: "Browse Resources",
  //       href: "/resources"
  //     }
  //   },
  //   {
  //     icon: "👥",
  //     title: "Community Support",
  //     description: "Connect with others and share experiences in a safe space.",
  //     link: {
  //       label: "Join Community",
  //       href: "/community"
  //     }
  //   }
  // ];

  const immediateServices = [
    {
      icon: "🚨",
      title: t('support.immediate.crisis.title'),
      description: t('support.immediate.crisis.description')
    },
    {
      icon: "🤝",
      title: t('support.immediate.advocacy.title'),
      description: t('support.immediate.advocacy.description')
    },
    {
      icon: "🏠",
      title: t('support.immediate.housing.title'),
      description: t('support.immediate.housing.description')
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSection
        title={t('support.hero.title')}
        description={t('support.hero.description')}
        imageSrc="/images/support/support-center.jpg"
        imageAlt="Support team ready to help"
      >
        <div className="flex flex-col gap-6">
          {/* <div className="flex gap-4">
            <motion.a
              href="#chat"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              {t('support.hero.chatButton')}
            </motion.a>
            <motion.a
              href="#call"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              {t('support.hero.callButton')}
            </motion.a>
          </div> */}

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{t('support.emergency.title')}</h2>
            <div className="grid md:grid-cols-2 gap-4 text-white">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold">{t('support.emergency.services.title')}</div>
                <div className="text-xl">{t('support.emergency.services.number')}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold">{t('support.emergency.crisis.title')}</div>
                <div className="text-xl">{t('support.emergency.crisis.number')}</div>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Stats Section */}
      {/* <StatsDisplay stats={supportStats} /> */}

      {/* Support Services */}
      {/* <FeatureGrid
        title="Support Services"
        description="Comprehensive support options tailored to your needs"
        features={supportFeatures}
        columns={3}
        variant="bordered"
      /> */}

      {/* Immediate Services */}
      <FeatureGrid
        title={t('support.immediate.title')}
        description={t('support.immediate.description')}
        features={immediateServices}
        columns={3}
        variant="minimal"
      />

      {/* Mobile Support */}
      <CallToAction
        title={t('support.mobile.title')}
        description={t('support.mobile.description')}
        primaryAction={{
          label: t('support.mobile.download'),
          href: "#download"
        }}
        secondaryAction={{
          label: t('support.mobile.learnMore'),
          href: "/about"
        }}
        pageType="default"
      />
    </main>
  );
} 