"use client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useTranslation } from "../../context/TranslationContext";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  address: string;
  organizer: string;
}

interface LocalEventsProps {
  events: Event[];
  loading: boolean;
  formatDate: (dateString: string) => string;
}

export function LocalEvents({ }: LocalEventsProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleEventTypeClick = (type: string) => {
    router.push(`/request?type=event&category=${type}`);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            {t('community.events.title')}
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                {t('community.events.types.title')}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => handleEventTypeClick('support')}
                  className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                    {t('community.events.types.support.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('community.events.types.support.description')}
                  </p>
                </div>
                <div 
                  onClick={() => handleEventTypeClick('workshop')}
                  className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                    {t('community.events.types.workshop.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('community.events.types.workshop.description')}
                  </p>
                </div>
                <div 
                  onClick={() => handleEventTypeClick('community')}
                  className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                    {t('community.events.types.community.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('community.events.types.community.description')}
                  </p>
                </div>
                <div 
                  onClick={() => handleEventTypeClick('social')}
                  className="bg-pink-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold mb-2 text-pink-700 dark:text-pink-300">
                    {t('community.events.types.social.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('community.events.types.social.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t('community.events.app.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  {t('community.events.app.features.notifications')}
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  {t('community.events.app.features.rsvp')}
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  {t('community.events.app.features.connect')}
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  {t('community.events.app.features.discovery')}
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t('community.events.host.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('community.events.host.description')}
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• {t('community.events.host.benefits.create')}</li>
                <li>• {t('community.events.host.benefits.reach')}</li>
                <li>• {t('community.events.host.benefits.support')}</li>
                <li>• {t('community.events.host.benefits.resources')}</li>
              </ul>
              <motion.button
                onClick={() => router.push('/request?type=event')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors w-full"
              >
                {t('community.events.host.button')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 