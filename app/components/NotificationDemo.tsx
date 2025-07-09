"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "../context/TranslationContext";

const notificationTypes = [
  {
    type: "alert",
    icon: "🚨",
    color: "bg-red-500"
  },
  {
    type: "info",
    icon: "📢",
    color: "bg-blue-500"
  },
  {
    type: "success",
    icon: "✅",
    color: "bg-green-500"
  }
];

export function NotificationDemo() {
  const { t } = useTranslation();
  const [activeNotification, setActiveNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setActiveNotification((prev) => (prev + 1) % notificationTypes.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('notifications.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('notifications.description')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-2xl">
                  🚨
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('notifications.features.alerts.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('notifications.features.alerts.description')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('notifications.features.location.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('notifications.features.location.description')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">
                  🔔
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('notifications.features.customizable.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('notifications.features.customizable.description')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Notification Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative max-w-[300px] mx-auto">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[40px] transform -rotate-6 scale-105 opacity-10 blur-xl" />
              <div className="relative bg-gray-900 rounded-[40px] p-6 shadow-2xl">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />
                
                {/* Notification Area */}
                <div className="pt-8 pb-4">
                  <AnimatePresence mode="wait">
                    {isVisible && (
                      <motion.div
                        key={activeNotification}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${notificationTypes[activeNotification].color} rounded-full flex items-center justify-center text-white text-xl`}>
                            {notificationTypes[activeNotification].icon}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {t(`notifications.demo.${notificationTypes[activeNotification].type}.title`)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {t(`notifications.demo.${notificationTypes[activeNotification].type}.message`)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Additional UI Elements */}
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg h-12 animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 