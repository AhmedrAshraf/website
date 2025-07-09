"use client";
import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
  icon: string;
  color: string;
}

interface StatsDisplayProps {
  title?: string;
  description?: string;
  stats: Stat[];
}

export const StatsDisplay = ({ title, description, stats }: StatsDisplayProps) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-400"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mb-4`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 