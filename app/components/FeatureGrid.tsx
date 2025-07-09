import { motion } from "framer-motion";

interface Feature {
  icon: string;
  title: string;
  description: string;
  link?: {
    label: string;
    href: string;
  };
}

interface FeatureGridProps {
  title?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'bordered' | 'minimal';
}

export const FeatureGrid = ({
  title,
  description,
  features,
  columns = 3,
  variant = 'default'
}: FeatureGridProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-t-4 border-blue-900 bg-gray-50 dark:bg-gray-800';
      case 'minimal':
        return 'bg-transparent';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  return (
    <section className="py-16 px-4">
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
                className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        <div className={`grid md:grid-cols-${columns} gap-8`}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-8 shadow-lg hover:shadow-xl transition-all ${getVariantStyles()}`}
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {feature.description}
              </p>
              {feature.link && (
                <a
                  href={feature.link.href}
                  className="inline-flex items-center text-blue-900 dark:text-blue-100 hover:underline"
                >
                  <span>{feature.link.label}</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 