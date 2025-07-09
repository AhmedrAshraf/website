"use client";
import { motion } from "framer-motion";
import { HeroSection } from "./components/HeroSection";
import { StatsDisplay } from "./components/StatsDisplay";
import { FeatureGrid } from "./components/FeatureGrid";
import { CallToAction } from "./components/CallToAction";
import FeaturedNews from './components/FeaturedNews';
import { useTranslation } from "./context/TranslationContext";

export default function JoinPage() {
  const { t } = useTranslation();

  const impactStats = [
    {
      value: t('home.impact.stats.members.value'),
      label: t('home.impact.stats.members.label'),
      icon: "👥",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      value: t('home.impact.stats.partners.value'),
      label: t('home.impact.stats.partners.label'),
      icon: "🤝",
      color: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      value: t('home.impact.stats.supported.value'),
      label: t('home.impact.stats.supported.label'),
      icon: "❤️",
      color: "bg-red-100 dark:bg-red-900/30"
    },
    {
      value: t('home.impact.stats.support.value'),
      label: t('home.impact.stats.support.label'),
      icon: "🌟",
      color: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  const volunteerFeatures = [
    {
      icon: "✋",
      title: t('home.volunteer.features.outreach.title'),
      description: t('home.volunteer.features.outreach.description'),
      link: {
        label: t('home.volunteer.features.outreach.link'),
        href: "#outreach"
      }
    },
    {
      icon: "📅",
      title: t('home.volunteer.features.events.title'),
      description: t('home.volunteer.features.events.description'),
      link: {
        label: t('home.volunteer.features.events.link'),
        href: "#events"
      }
    },
    {
      icon: "📦",
      title: t('home.volunteer.features.resources.title'),
      description: t('home.volunteer.features.resources.description'),
      link: {
        label: t('home.volunteer.features.resources.link'),
        href: "#resources"
      }
    }
  ];

  const partnerFeatures = [
    {
      icon: "🤝",
      title: t('home.partner.features.organizations.title'),
      description: t('home.partner.features.organizations.description'),
      link: {
        label: t('home.partner.features.organizations.link'),
        href: "#partner"
      }
    },
    {
      icon: "🔄",
      title: t('home.partner.features.sharing.title'),
      description: t('home.partner.features.sharing.description'),
      link: {
        label: t('home.partner.features.sharing.link'),
        href: "#share"
      }
    },
    {
      icon: "🎯",
      title: t('home.partner.features.initiatives.title'),
      description: t('home.partner.features.initiatives.description'),
      link: {
        label: t('home.partner.features.initiatives.link'),
        href: "#initiatives"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title={t('home.hero.title')}
        description={t('home.hero.description')}
        imageSrc="/images/community/community-hero.jpg"
        imageAlt="Community members working together in solidarity"
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <motion.a
              href="/request?type=volunteer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              {t('home.hero.volunteer')}
            </motion.a>
            <motion.a
              onClick={() => {
                window.location.href = "/contact";
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              {t('home.hero.supportUs')}
            </motion.a>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">{t('home.hero.joinMovement')}</h2>
            <div className="grid md:grid-cols-3 gap-4 text-white">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold">{t('home.hero.stats.volunteers')}</div>
                <div className="text-xl">1,000+</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold">{t('home.hero.stats.communities')}</div>
                <div className="text-xl">50+</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold">{t('home.hero.stats.impact')}</div>
                <div className="text-xl">100K+</div>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Impact Stats */}
      <StatsDisplay
        title={t('home.impact.title')}
        description={t('home.impact.description')}
        stats={impactStats}
      />

      {/* Volunteer Opportunities */}
      <FeatureGrid
        title={t('home.volunteer.title')}
        description={t('home.volunteer.description')}
        features={volunteerFeatures}
        columns={3}
        variant="bordered"
      />

      {/* Partnership Opportunities */}
      <FeatureGrid
        title={t('home.partner.title')}
        description={t('home.partner.description')}
        features={partnerFeatures}
        columns={3}
        variant="minimal"
      />

      {/* Add FeaturedNews after the hero section */}
      <div className="container mx-auto px-4 py-12">
        <FeaturedNews />
      </div>

      {/* Mobile App Section */}
      <CallToAction
        title={t('home.mobile.title')}
        description={t('home.mobile.description')}
        primaryAction={{
          label: t('home.mobile.download'),
          href: "#download"
        }}
        secondaryAction={{
          label: t('home.mobile.learnMore'),
          href: "/about"
        }}
        pageType="default"
      />
    </div>
  );
} 
