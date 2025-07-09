"use client";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../../components/AppDownloadCTA";

export const IncidentTracker = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Community Incident Tracking
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Why Report Incidents?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border border-blue-100 dark:border-gray-700 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Community Safety</h4>
                  <p className="text-gray-600 dark:text-gray-400">Help keep others informed and protected in your area</p>
                </div>
                <div className="p-4 border border-blue-100 dark:border-gray-700 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Pattern Recognition</h4>
                  <p className="text-gray-600 dark:text-gray-400">Identify recurring issues and high-risk areas</p>
                </div>
                <div className="p-4 border border-blue-100 dark:border-gray-700 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Resource Allocation</h4>
                  <p className="text-gray-600 dark:text-gray-400">Help direct support where it&apos;s needed most</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Features Available in Our App
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  Anonymous Reporting
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  Real-time Alerts
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  Location-based Tracking
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  Direct Connection to Support Services
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                🚨 Emergency Resources
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you&apos;re in immediate danger, always call emergency services first:
              </p>
              <div className="font-bold text-red-600 dark:text-red-400">
                Emergency: 911
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <AppDownloadCTA />
    </section>
  );
}; 