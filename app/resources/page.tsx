"use client";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { HeroSection } from "../components/HeroSection";
import { ResourceCard } from "./components/ResourceCard";
import { ResourceFilters } from "./components/ResourceFilters";
import { useTranslation } from "../context/TranslationContext";
import { useState, useMemo } from "react";

export default function ResourcesPage() {
  const { t } = useTranslation();

  // Sample resource data - in a real app, this would come from an API
  const sampleResources = useMemo(() => [
    {
      id: '1',
      title: 'Workplace Harassment Prevention Guide',
      description: 'A comprehensive guide covering identification, prevention, and reporting of workplace harassment. Includes legal rights, documentation tips, and available resources.',
      type: 'guide' as const,
      category: 'workplace',
      tags: ['harassment', 'workplace', 'prevention', 'legal'],
      author: 'DESIST Legal Team',
      publishedAt: '2025-08-15',
      readTime: 15,
      thumbnail: '/images/resources/workplace-guide.jpg',
      featured: true,
      difficulty: 'beginner' as const,
      language: 'en',
      stats: {
        views: 1250,
        downloads: 340,
        ratings: 23,
        avgRating: 4.8,
      },
    },
    {
      id: '2',
      title: 'Digital Safety Toolkit',
      description: 'Essential tools and strategies for protecting yourself online. Covers privacy settings, secure communication, and digital evidence collection.',
      type: 'toolkit' as const,
      category: 'digital-safety',
      tags: ['digital', 'privacy', 'safety', 'online'],
      author: 'CyberSafe Collective',
      publishedAt: '2025-08-10',
      readTime: 25,
      downloadUrl: '/downloads/digital-safety-toolkit.pdf',
      thumbnail: '/images/resources/digital-safety.jpg',
      featured: true,
      difficulty: 'intermediate' as const,
      language: 'en',
      stats: {
        views: 890,
        downloads: 450,
        ratings: 18,
        avgRating: 4.6,
      },
    },
    {
      id: '3',
      title: 'Understanding Your Rights',
      description: 'Know your legal rights and protections against harassment. State-by-state breakdown of laws and procedures.',
      type: 'article' as const,
      category: 'legal',
      tags: ['rights', 'legal', 'laws', 'protection'],
      author: 'Legal Aid Society',
      publishedAt: '2025-08-05',
      readTime: 12,
      thumbnail: '/images/resources/legal-rights.jpg',
      featured: false,
      difficulty: 'beginner' as const,
      language: 'en',
      stats: {
        views: 2100,
        downloads: 0,
        ratings: 31,
        avgRating: 4.7,
      },
    },
    {
      id: '4',
      title: 'Cómo Denunciar el Acoso (Spanish)',
      description: 'Guía completa sobre cómo identificar y denunciar casos de acoso. Incluye recursos legales y de apoyo en español.',
      type: 'guide' as const,
      category: 'reporting',
      tags: ['spanish', 'denuncia', 'acoso', 'recursos'],
      author: 'Equipo DESIST',
      publishedAt: '2025-07-28',
      readTime: 18,
      thumbnail: '/images/resources/spanish-guide.jpg',
      featured: false,
      difficulty: 'beginner' as const,
      language: 'es',
      stats: {
        views: 650,
        downloads: 120,
        ratings: 15,
        avgRating: 4.9,
      },
    },
    {
      id: '5',
      title: 'Community Support Networks',
      description: 'How to build and leverage community support systems for harassment prevention and response.',
      type: 'video' as const,
      category: 'community',
      tags: ['community', 'support', 'networks', 'prevention'],
      author: 'Community Organizers Coalition',
      publishedAt: '2025-07-20',
      readTime: 30,
      thumbnail: '/images/resources/community-networks.jpg',
      featured: false,
      difficulty: 'advanced' as const,
      language: 'en',
      stats: {
        views: 1800,
        downloads: 0,
        ratings: 25,
        avgRating: 4.5,
      },
    },
    {
      id: '6',
      title: 'Emergency Response Checklist',
      description: 'Quick reference guide for immediate response to harassment incidents. Includes safety protocols and contact information.',
      type: 'document' as const,
      category: 'emergency',
      tags: ['emergency', 'checklist', 'response', 'safety'],
      author: 'Safety First Initiative',
      publishedAt: '2025-07-15',
      downloadUrl: '/downloads/emergency-checklist.pdf',
      thumbnail: '/images/resources/emergency-response.jpg',
      featured: true,
      difficulty: 'beginner' as const,
      language: 'en',
      stats: {
        views: 950,
        downloads: 780,
        ratings: 42,
        avgRating: 4.9,
      },
    },
  ], []);

  // Filter state
  const [activeFilters, setActiveFilters] = useState<{
    type?: string;
    category?: string;
    difficulty?: string;
    language?: string;
    searchQuery?: string;
  }>({});

  // Filter options
  const filterOptions = {
    types: ['article', 'guide', 'video', 'document', 'toolkit'],
    categories: ['workplace', 'digital-safety', 'legal', 'reporting', 'community', 'emergency'],
    difficulties: ['beginner', 'intermediate', 'advanced'],
    languages: ['en', 'es'],
  };

  // Filter resources based on active filters
  const filteredResources = useMemo(() => {
    return sampleResources.filter(resource => {
      if (activeFilters.type && resource.type !== activeFilters.type) return false;
      if (activeFilters.category && resource.category !== activeFilters.category) return false;
      if (activeFilters.difficulty && resource.difficulty !== activeFilters.difficulty) return false;
      if (activeFilters.language && resource.language !== activeFilters.language) return false;
      if (activeFilters.searchQuery) {
        const query = activeFilters.searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.tags.some(tag => tag.toLowerCase().includes(query)) ||
          (resource.author && resource.author.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [activeFilters, sampleResources]);

  const handleFilterChange = (filterType: string, value: string | null) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSearchChange = (query: string) => {
    setActiveFilters(prev => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const featuredResources = sampleResources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title={t('resources.hero.title')}
        description={t('resources.hero.description')}
        imageSrc="/images/community/events/workshop.jpg"
        imageAlt="Community education and resource sharing workshop"
      >
        {/* <div className="flex gap-4">
          <motion.a
            href="#guides"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            {t('resources.hero.viewGuides')}
          </motion.a>
          <motion.a
            href="#help"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            {t('resources.hero.getHelp')}
          </motion.a>
        </div> */}
      </HeroSection>

      {/* Resource Categories */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Educational Resources */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border-t-4 border-blue-900">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                  {t('resources.categories.educational.title')}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.educational.items.harassment')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.educational.items.warning')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.educational.items.prevention')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors">
                  {t('resources.categories.educational.button')}
                </button>
              </div>

              {/* Legal Resources */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border-t-4 border-blue-900">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                  {t('resources.categories.legal.title')}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.legal.items.rights')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.legal.items.assistance')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.legal.items.documentation')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors">
                  {t('resources.categories.legal.button')}
                </button>
              </div>

              {/* Support Network */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border-t-4 border-blue-900">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                  {t('resources.categories.support.title')}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.support.items.groups')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.support.items.counseling')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-yellow-700">✓</span>
                    {t('resources.categories.support.items.events')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors">
                  {t('resources.categories.support.button')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools & Downloads */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              {t('resources.tools.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('resources.tools.safety.title')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.safety.items.checklist')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.safety.items.contacts')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.safety.items.builder')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                  {t('resources.tools.safety.button')}
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('resources.tools.documentation.title')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.documentation.items.templates')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.documentation.items.evidence')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    {t('resources.tools.documentation.items.samples')}
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                  {t('resources.tools.documentation.button')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resource Library */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('resources.library.title') || 'Resource Library'}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                {t('resources.library.description') || 'Comprehensive collection of guides, tools, and educational materials to help you understand your rights and take action against harassment.'}
              </p>
            </div>

            {/* Featured Resources */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Featured Resources
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                  />
                ))}
              </div>
            </div>

            {/* Filters */}
            <ResourceFilters
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />

            {/* All Resources */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  All Resources ({filteredResources.length})
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredResources.length} of {sampleResources.length} resources
                </div>
              </div>

              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                    No resources found matching your criteria
                  </div>
                  <button
                    onClick={() => setActiveFilters({})}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Load More Button */}
            {filteredResources.length > 0 && filteredResources.length >= 6 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Load More Resources
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('resources.mobile.title')}
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('resources.mobile.description')}
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>
    </div>
  );
} 