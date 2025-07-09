"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "../context/TranslationContext";

export function AppDownloadCTA() {
  const [hoveredStore, setHoveredStore] = useState<"apple" | "google" | null>(null);
  const { t } = useTranslation();

  const storeButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const phoneVariants = {
    initial: { opacity: 0, y: 20, rotate: -5 },
    animate: { opacity: 1, y: 0, rotate: 0 }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-5" />
      
      {/* Content Container */}
      <div className="relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-left">
          {/* Left Content */}
          <div>
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUpVariants}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t('community.appDownload.title')}
              </h3>
              <p className="text-gray-300 text-lg">
                {t('community.appDownload.description')}
              </p>
            </motion.div>

            {/* App Features */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUpVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 mb-8"
            >
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-4">
                <span className="text-3xl">🛡️</span>
                <div>
                  <h4 className="text-white font-semibold">
                    {t('community.appDownload.features.support.title')}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {t('community.appDownload.features.support.description')}
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="text-white font-semibold">
                    {t('community.appDownload.features.reporting.title')}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {t('community.appDownload.features.reporting.description')}
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-4">
                <span className="text-3xl">🤝</span>
                <div>
                  <h4 className="text-white font-semibold">
                    {t('community.appDownload.features.network.title')}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {t('community.appDownload.features.network.description')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Download Buttons */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUpVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <motion.a
                href="#"
                variants={storeButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredStore("apple")}
                onHoverEnd={() => setHoveredStore(null)}
                className="relative group w-full sm:w-auto"
              >
                <div className="bg-white rounded-xl px-6 py-3 flex items-center justify-center gap-3 transition-transform">
                  <Image
                    src="/app-store-logo.png"
                    alt="App Store"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="text-left">
                    <div className="text-xs text-gray-600">
                      {t('community.appDownload.stores.apple.download')}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {t('community.appDownload.stores.apple.name')}
                    </div>
                  </div>
                </div>
                {hoveredStore === "apple" && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-blue-500/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>

              <motion.a
                href="#"
                variants={storeButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredStore("google")}
                onHoverEnd={() => setHoveredStore(null)}
                className="relative group w-full sm:w-auto"
              >
                <div className="bg-white rounded-xl px-6 py-3 flex items-center justify-center gap-3 transition-transform">
                  <Image
                    src="/play-store-logo.png"
                    alt="Play Store"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="text-left">
                    <div className="text-xs text-gray-600">
                      {t('community.appDownload.stores.google.download')}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {t('community.appDownload.stores.google.name')}
                    </div>
                  </div>
                </div>
                {hoveredStore === "google" && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-green-500/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            </motion.div>

            {/* App Stats */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUpVariants}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex justify-start gap-8 text-center text-gray-400 text-sm"
            >
              <div>
                <div className="font-semibold text-white">
                  {t('community.appDownload.stats.downloads.value')}
                </div>
                <div>{t('community.appDownload.stats.downloads.label')}</div>
              </div>
              <div>
                <div className="font-semibold text-white">
                  {t('community.appDownload.stats.rating.value')}
                </div>
                <div>{t('community.appDownload.stats.rating.label')}</div>
              </div>
              <div>
                <div className="font-semibold text-white">
                  {t('community.appDownload.stats.cities.value')}
                </div>
                <div>{t('community.appDownload.stats.cities.label')}</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={phoneVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative w-[280px] h-[580px] mx-auto">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-2xl border-8 border-gray-800 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-full" />

                {/* Screen Content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/mobile-app-preview.png"
                    alt="App Preview"
                    fill
                    className="object-cover"
                  />
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
