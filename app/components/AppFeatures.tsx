"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "../context/TranslationContext";

const features = [
  {
    key: "protection",
    icon: "🚨",
    color: "from-red-500/20 to-orange-500/20",
    image: "/feature-alerts.webp"
  },
  {
    key: "network",
    icon: "🤝",
    color: "from-blue-500/20 to-purple-500/20",
    image: "/feature-community.jpg"
  },
  {
    key: "response",
    icon: "🆘",
    color: "from-green-500/20 to-teal-500/20",
    image: "/feature-community.jpg"
  },
  {
    key: "resources",
    icon: "📚",
    color: "from-yellow-500/20 to-orange-500/20",
    image: "/feature-community.jpg"
  }
];

export function AppFeatures() {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {t('appFeatures.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            {t('appFeatures.description')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-100 dark:bg-gray-700 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t(`appFeatures.features.${feature.key}.title`)}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t(`appFeatures.features.${feature.key}.description`)}
                </p>

                <div className="relative h-48 rounded-xl overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={t(`appFeatures.features.${feature.key}.title`)}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="#download"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
          >
            {t('appFeatures.download')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 