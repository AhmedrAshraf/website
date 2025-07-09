"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";

const stats = [
  {
    key: "users",
    icon: "👥",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    key: "incidents",
    icon: "🛡️",
    color: "from-green-500/20 to-teal-500/20"
  },
  {
    key: "communities",
    icon: "🏘️",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    key: "satisfaction",
    icon: "⭐",
    color: "from-yellow-500/20 to-amber-500/20"
  }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function AppStats() {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('stats.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('stats.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
              <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  <AnimatedCounter 
                    value={parseInt(t(`stats.metrics.${stat.key}.value`))} 
                    suffix={t(`stats.metrics.${stat.key}.suffix`)} 
                  />
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {t(`stats.metrics.${stat.key}.label`)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 