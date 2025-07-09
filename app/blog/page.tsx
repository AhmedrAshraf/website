"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HeroSection } from "../components/HeroSection";
import { getNews } from "../services/newsService";
import supabase from "../../utils/supabase";
import Head from 'next/head';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  date: string;
}

export default function BlogPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const [totalPages, setTotalPages] = useState(1);

  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const NewsSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <span>•</span>
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="mt-4 h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  );

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        console.log('Fetching news data...');
        const response = await getNews(1);
        console.log('News data fetched successfully:', {
          totalItems: response.articles.length,
          hasMore: response.hasMore,
          totalPages: response.totalPages,
          items: response.articles.map(item => ({
            title: item.title,
            source: item.source
          }))
        });
        if (response.articles && response.articles.length > 0) {
          setNews(response.articles);
          setHasMore(response.hasMore);
          // setTotalPages(response.totalPages);
        } else {
          setError("No news articles available at the moment.");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      console.log(`Loading more news, page ${nextPage}...`);
      const response = await getNews(nextPage);
      console.log('Additional news loaded:', {
        page: nextPage,
        itemsCount: response.articles.length,
        hasMore: response.hasMore,
        totalPages: response.totalPages,
        items: response.articles.map(item => ({
          title: item.title,
          source: item.source
        }))
      });
      
      if (response.articles && response.articles.length > 0) {
        setNews(prev => [...prev, ...response.articles]);
        setCurrentPage(nextPage);
        setHasMore(response.hasMore);
        // setTotalPages(response.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading more news:", err);
      setError("Failed to load more news. Please try again later.");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubscriptionStatus({
        type: 'error',
        message: 'Please enter your email address'
      });
      return;
    }

    try {
      setIsSubscribing(true);
      setSubscriptionStatus({ type: null, message: '' });

      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          { 
            email,
            subscribed_at: new Date().toISOString(),
            status: 'active'
          }
        ]);

      if (error) throw error;

      setSubscriptionStatus({
        type: 'success',
        message: 'Thank you for subscribing to our newsletter!'
      });
      setEmail('');
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setSubscriptionStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again later.'
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Generate structured data for SEO
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Community News & Updates",
      "description": "Stay informed about important developments affecting our community, from policy changes to local initiatives.",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "publisher": {
        "@type": "Organization",
        "name": "Community Protection",
        "url": typeof window !== 'undefined' ? window.location.origin : ''
      },
      "blogPost": news.map(item => ({
        "@type": "BlogPosting",
        "headline": item.title,
        "description": item.description,
        "datePublished": item.date,
        "author": {
          "@type": "Organization",
          "name": item.source
        },
        "url": item.url
      }))
    };
    return JSON.stringify(structuredData);
  };

  return (
    <>
      <Head>
        <title>Community News & Updates | Community Protection</title>
        <meta name="description" content="Stay informed about important developments affecting our community, from policy changes to local initiatives." />
        <meta name="keywords" content="community news, community protection, harassment, incidents, safety, local news" />
        <meta property="og:title" content="Community News & Updates" />
        <meta property="og:description" content="Stay informed about important developments affecting our community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Community News & Updates" />
        <meta name="twitter:description" content="Stay informed about important developments affecting our community." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <HeroSection
          title="Community News & Updates"
          description="Stay informed about important developments affecting our community, from policy changes to local initiatives."
          imageSrc="/images/blog/hero-news.jpg"
          imageAlt="Community members reading news"
        />

        <main className="container mx-auto px-4 py-8">
          {/* Error Message */}
          {error && (
            <div className="text-center py-8" role="alert">
              <p className="text-red-500 dark:text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* News Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(8)].map((_, index) => (
                <NewsSkeleton key={index} />
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No news articles found.</p>
            </div>
          ) : (
            <>
              <section aria-label="News articles" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item, index) => (
                  <motion.article
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-6"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    <meta itemProp="datePublished" content={item.date} />
                    <meta itemProp="author" content={item.source} />
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                        <span itemProp="name">{item.source}</span>
                      </span>
                      <span>•</span>
                      <time dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        itemProp="headline"
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {item.title}
                      </a>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4" itemProp="description">
                      {item.description}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      itemProp="url"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </motion.article>
                ))}
                {loadingMore && [...Array(10)].map((_, index) => (
                  <NewsSkeleton key={`skeleton-${index}`} />
                ))}
              </section>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                      loadingMore ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label={loadingMore ? "Loading more articles" : "Load more articles"}
                  >
                    {loadingMore ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Loading...
                      </div>
                    ) : (
                      'Load More'
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Newsletter Signup */}
          <section aria-label="Newsletter subscription" className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Subscribe to our newsletter for the latest news and updates affecting our community.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubscribing}
                  aria-label="Email address"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                    isSubscribing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label={isSubscribing ? "Subscribing to newsletter" : "Subscribe to newsletter"}
                >
                  {isSubscribing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
              {subscriptionStatus.type && (
                <div 
                  className={`mt-4 text-sm ${
                    subscriptionStatus.type === 'success' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}
                  role="alert"
                >
                  {subscriptionStatus.message}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
} 