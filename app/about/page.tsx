"use client";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { HeroSection } from "../components/HeroSection";
import { CallToAction } from "../components/CallToAction";
import { useTranslation } from "../context/TranslationContext";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title={t('about.hero.title')}
        description={t('about.hero.description')}
        imageSrc="/images/community/unity/community-circle.jpg"
        imageAlt="Community members standing together in solidarity"
      >
        <div className="flex">
          <motion.a
            href="/request?type=volunteer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            {t('about.hero.joinButton')}
          </motion.a>
        </div>
      </HeroSection>

      {/* Rest of the about page content */}
      <div className="container mx-auto px-4 py-16">
        {/* <div className="max-w-3xl mx-auto"> */}
          <section id="learn-more" className="mb-16">
            <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-6">
              {t('about.story.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('about.story.paragraph1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {t('about.story.paragraph2')}
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-6">
              {t('about.values.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-900">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  {t('about.values.unity.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('about.values.unity.description')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-900">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  {t('about.values.education.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('about.values.education.description')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-900">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  {t('about.values.action.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('about.values.action.description')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-900">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  {t('about.values.community.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('about.values.community.description')}
                </p>
              </div>
            </div>
          </section>
        {/* </div> */}
      </div>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('about.mobile.title')}
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('about.mobile.description')}
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title={t('about.cta.title')}
        description={t('about.cta.description')}
        primaryAction={{
          label: t('about.cta.primaryAction'),
          href: "/join"
        }}
        secondaryAction={{
          label: t('about.cta.secondaryAction'),
          href: "/about"
        }}
        pageType="about"
      />
    </div>
  );
} 