"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import supabase from "../../utils/supabase";

const DynamicMap = dynamic(() => import("../components/DynamicMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
});

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
  status: string;
}

// Helper function to transform Event to Location type
const transformEventToLocation = (event: Event) => ({
  id: event.id,
  title: event.title,
  description: event.description,
  latitude: event.latitude,
  longitude: event.longitude,
  type: event.type,
  date: event.date,
  address: event.address
});

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "community meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "workshop":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "protest":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "fundraiser":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredEvents = events.filter(
    event => filter === "all" || event.type.toLowerCase() === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-10" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Community Events
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join local events, connect with your community, and make a difference together.
            </p>

            <Link
              href="/events/create"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="mr-2">Suggest Event</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {events.length}
              </div>
              <div className="text-white/80">Total Events</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {events.filter(e => new Date(e.date) > new Date()).length}
              </div>
              <div className="text-white/80">Upcoming Events</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {new Set(events.map(e => e.organizer)).size}
              </div>
              <div className="text-white/80">Organizers</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Controls */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Upcoming Events
                </h2>
                <div className="flex items-center gap-4">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Events</option>
                    <option value="community meeting">Community Meetings</option>
                    <option value="workshop">Workshops</option>
                    <option value="protest">Protests</option>
                    <option value="fundraiser">Fundraisers</option>
                  </select>
                  <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 ${
                        viewMode === 'list'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      List
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`px-4 py-2 ${
                        viewMode === 'map'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Map
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">No events scheduled yet.</p>
                </div>
              ) : viewMode === 'list' ? (
                <div className="grid gap-6">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(event.date)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div>📍 {event.address}</div>
                        <div>👤 {event.organizer}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <DynamicMap
                  locations={filteredEvents.map(transformEventToLocation)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 