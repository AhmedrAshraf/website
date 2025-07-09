"use client";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { HeroSection } from "../components/HeroSection";
import { useTranslation } from "../context/TranslationContext";

export default function ResourcesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title={t('resources.hero.title')}
        description={t('resources.hero.description')}
        imageSrc="/images/community/events/workshop.jpg"
        imageAlt="Community education and resource sharing workshop"
      >
        {/* <div className="flex gap-4">
          <motion.a
            href="#guides"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            {t('resources.hero.viewGuides')}
          </motion.a>
          <motion.a
            href="#help"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            {t('resources.hero.getHelp')}
          </motion.a>
        </div> */}
      </HeroSection>

      {/* Resource Categories */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Educational Resources */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border-t-4 border-blue-900">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                  {t('resources.categories.educational.title')}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.educational.items.harassment')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.educational.items.warning')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.educational.items.prevention')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors">
                  {t('resources.categories.educational.button')}
                </button>
              </div>

              {/* Legal Resources */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border-t-4 border-blue-900">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                  {t('resources.categories.legal.title')}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.legal.items.rights')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.legal.items.assistance')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.legal.items.documentation')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors">
                  {t('resources.categories.legal.button')}
                </button>
              </div>

              {/* Support Network */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border-t-4 border-blue-900">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                  {t('resources.categories.support.title')}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.support.items.groups')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.support.items.counseling')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.support.items.events')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors">
                  {t('resources.categories.support.button')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools & Downloads */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              {t('resources.tools.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('resources.tools.safety.title')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.safety.items.checklist')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.safety.items.contacts')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.safety.items.builder')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                  {t('resources.tools.safety.button')}
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('resources.tools.documentation.title')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.documentation.items.templates')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.documentation.items.evidence')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.documentation.items.samples')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                  {t('resources.tools.documentation.button')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('resources.mobile.title')}
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('resources.mobile.description')}
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>
    </div>
  );
} 