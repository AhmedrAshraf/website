"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "../context/TranslationContext";

export function Testimonials() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('testimonials.description')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl" />
            
            {/* Testimonial Cards */}
            <div className="relative">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : 20,
                    scale: activeIndex === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                      <Image
                        src="/images/avatar.jpg"
                        alt={t(`testimonials.quotes.${index}.author`)}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <blockquote className="text-xl md:text-2xl text-gray-900 dark:text-white mb-6">
                        &quot;{t(`testimonials.quotes.${index}.text`)}&quot;
                      </blockquote>
                      <div>
                        <cite className="not-italic font-semibold text-blue-600 dark:text-blue-400">
                          {t(`testimonials.quotes.${index}.author`)}
                        </cite>
                        <div className="text-gray-600 dark:text-gray-300 mt-1">
                          {t(`testimonials.quotes.${index}.role`)}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          {t(`testimonials.quotes.${index}.location`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeIndex === index
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                >
                  <span className="sr-only">View testimonial {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('testimonials.cta.description')}
          </p>
          <a
            href="#download"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
          >
            {t('testimonials.cta.button')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 