"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "../context/TranslationContext";

export function NewHero() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 -z-10" />
      
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('hero.title.main')}{" "}
              <span className="text-blue-600 dark:text-blue-400">{t('hero.title.highlight')}</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('hero.description')}
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="bg-black dark:bg-white rounded-xl px-6 py-3 flex items-center justify-center gap-3">
                  <Image
                    src="/app-store-logo.png"
                    alt="App Store"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="text-left">
                    <div className="text-xs text-white dark:text-gray-600">{t('hero.stores.apple.download')}</div>
                    <div className="text-sm font-semibold text-white dark:text-gray-900">{t('hero.stores.apple.name')}</div>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="bg-black dark:bg-white rounded-xl px-6 py-3 flex items-center justify-center gap-3">
                  <Image
                    src="/play-store-logo.png"
                    alt="Play Store"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="text-left">
                    <div className="text-xs text-white dark:text-gray-600">{t('hero.stores.google.download')}</div>
                    <div className="text-sm font-semibold text-white dark:text-gray-900">{t('hero.stores.google.name')}</div>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{t('hero.stats.users.value')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.users.label')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{t('hero.stats.rating.value')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.rating.label')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{t('hero.stats.cities.value')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.cities.label')}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full max-w-[400px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[60px] blur-3xl opacity-20 -z-10" />
              <Image
                src="/mobile-app-preview.png"
                alt="DESIST App Preview"
                width={400}
                height={800}
                className="w-full h-auto rounded-[40px] shadow-2xl"
                priority
              />
              
              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -right-12 top-12 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    🛡️
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">{t('hero.features.alerts.title')}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('hero.features.alerts.description')}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-12 bottom-32 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">{t('hero.features.response.title')}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('hero.features.response.description')}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 