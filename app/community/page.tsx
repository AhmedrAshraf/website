"use client";
import { motion } from "framer-motion";
import { HeroSection } from "../components/HeroSection";
import { StatsDisplay } from "../components/StatsDisplay";
import { LocalEvents } from "./components/LocalEvents";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import Link from "next/link";
import FeaturedNews from '../components/FeaturedNews';
import { useTranslation } from "../context/TranslationContext";

interface Event {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  date: string;
  type: string;
  organizer: string;
}

interface Posts {
  id: number;
  title: string;
  content: string;
  created_at: string;
  username: string;
  full_name: string;
  email: string;
  category: string;
}

export default function CommunityPage() {
  const { t } = useTranslation();

  const CATEGORIES = [
    { id: 'support', name: t('community.forum.categories.support'), color: 'blue', bgClass: 'bg-blue-100 dark:bg-blue-900/30', textClass: 'text-blue-800 dark:text-blue-300' },
    { id: 'resources', name: t('community.forum.categories.resources'), color: 'purple', bgClass: 'bg-purple-100 dark:bg-purple-900/30', textClass: 'text-purple-800 dark:text-purple-300' },
    { id: 'stories', name: t('community.forum.categories.stories'), color: 'pink', bgClass: 'bg-pink-100 dark:bg-pink-900/30', textClass: 'text-pink-800 dark:text-pink-300' },
    { id: 'updates', name: t('community.forum.categories.updates'), color: 'green', bgClass: 'bg-green-100 dark:bg-green-900/30', textClass: 'text-green-800 dark:text-green-300' }
  ];

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<Posts[]>([]);

  useEffect(() => {
    fetchEvents();
    fetchRecentPosts();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(5);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users!inner (
            email,
            full_name,
            username
          )
        `)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRecentPosts(data || []);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const communityStats = [
    {
      value: "500+",
      label: t('community.stats.activeReports'),
      icon: "🚨",
      color: "bg-red-100 dark:bg-red-900/30"
    },
    {
      value: "1000+",
      label: t('community.stats.communityMembers'),
      icon: "👥",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      value: "50+",
      label: t('community.stats.localEvents'),
      icon: "📅",
      color: "bg-green-100 dark:bg-green-900/30"
    },
    {
      value: "24/7",
      label: t('community.stats.supportAvailable'),
      icon: "💪",
      color: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-0">
        <HeroSection
          title={t('community.hero.title')}
          description={t('community.hero.description')}
          imageSrc="/images/community/community-hero.jpg"
          imageAlt="Community members working together"
        >
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {window.location.href = "/request?type=volunteer"}}
                className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                {t('community.hero.joinButton')}
              </motion.button>
            </div>

            <div className="container bg-black/30 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">{t('community.hero.impactTitle')}</h2>
              <div className="grid md:grid-cols-3 gap-4 text-white">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">{t('community.hero.stats.reports')}</div>
                  <div className="text-xl">500+</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">{t('community.hero.stats.members')}</div>
                  <div className="text-xl">1,000+</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">{t('community.hero.stats.events')}</div>
                  <div className="text-xl">50+</div>
                </div>
              </div>
            </div>
          </div>
        </HeroSection>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {/* Community Stats */}
            <StatsDisplay
              title={t('community.stats.title')}
              description={t('community.stats.description')}
              stats={communityStats}
            />

            {/* Community Forum Preview */}
            <section className="container py-16">
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {t('community.forum.title')}
                    </h2>
                    <p className="text-blue-100">
                      {t('community.forum.description')}
                    </p>
                  </div>
                  <Link
                    href="/community/forum"
                    className="px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-sm bg-gray-800"
                  >
                    {t('community.forum.viewButton')}
                  </Link>
                </div>
              </div>

              {/* Posts Preview */}
              <div className="py-8">
                <div className="space-y-6">
                  {recentPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mb-4">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t('community.forum.noPosts')}
                      </p>
                    </div>
                  ) : (
                    recentPosts.map((post) => {
                      const category = CATEGORIES.find(c => c.id === post.category);
                      const displayName = post.username || post.full_name || post.email;
                      return (
                        <div
                          key={post.id}
                          className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${category?.bgClass} ${category?.textClass}`}>
                                {category?.name}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(post.created_at)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {displayName}
                              </span>
                              {post.username && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  @{post.username}
                                </span>
                              )}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>
            
            <FeaturedNews />
            {/* Local Events */}
            <LocalEvents events={events} loading={loading} formatDate={formatDate} />

            {/* App Download CTA */}
            <AppDownloadCTA />
          </div>
        </div>
      </div>
    </div>
  );
} 