/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BadgeShowcase } from '../community/components/BadgeShowcase';
import supabase from '../../utils/supabase';

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
  location: string | null;
  pronouns: string | null;
  isPrivate: boolean;
  showEmail: boolean;
  showLocation: boolean;
  allowMessages: boolean;
  createdAt: string;
}

interface UserStats {
  totalBadges: number;
  communityPosts: number;
  resourcesShared: number;
  helpfulVotes: number;
  incidentReports: number;
}

interface IncidentReport {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({
    totalBadges: 0,
    communityPosts: 0,
    resourcesShared: 0,
    helpfulVotes: 0,
    incidentReports: 0,
  });
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/auth/login');
          return;
        }

        setUser(user);

        // Simulate loading user data
        setTimeout(() => {
          setProfile({
            id: user.id,
            name: user.user_metadata?.full_name || user.email || null,
            email: user.email || '',
            bio: null,
            location: null,
            pronouns: null,
            isPrivate: false,
            showEmail: false,
            showLocation: false,
            allowMessages: true,
            createdAt: user.created_at || new Date().toISOString(),
          });

          setStats({
            totalBadges: 8,
            communityPosts: 12,
            resourcesShared: 5,
            helpfulVotes: 34,
            incidentReports: 3,
          });

          // Simulate incident reports data
          setIncidentReports([
            {
              id: '1',
              title: 'Workplace Harassment Report',
              description: 'Reported inappropriate behavior from supervisor',
              location: 'Downtown Office Building',
              severity: 'high',
              status: 'investigating',
              createdAt: '2024-01-15T10:30:00Z',
              updatedAt: '2024-01-16T14:20:00Z',
            },
            {
              id: '2',
              title: 'Discrimination Incident',
              description: 'Experienced discriminatory treatment during meeting',
              location: 'Conference Room A',
              severity: 'medium',
              status: 'resolved',
              createdAt: '2024-01-10T09:15:00Z',
              updatedAt: '2024-01-12T16:45:00Z',
            },
            {
              id: '3',
              title: 'Unsafe Working Conditions',
              description: 'Reported safety concerns in warehouse area',
              location: 'Warehouse Section B',
              severity: 'low',
              status: 'closed',
              createdAt: '2024-01-05T11:00:00Z',
              updatedAt: '2024-01-08T10:30:00Z',
            },
          ]);
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error getting user:', error);
        router.push('/auth/login');
      }
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your account...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'incidents', label: 'Incident Reports', icon: '🚨' },
    { id: 'badges', label: 'Badges & Achievements', icon: '🏆' },
    { id: 'profile', label: 'Profile Settings', icon: '👤' },
    { id: 'privacy', label: 'Privacy & Security', icon: '🔒' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {profile?.name || user?.user_metadata?.full_name || 'User'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Back to Site
              </button>
              <button 
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {(profile?.name || user?.user_metadata?.full_name || 'U')[0].toUpperCase()}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {profile?.name || user?.user_metadata?.full_name || 'Anonymous User'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Member since {new Date(profile?.createdAt || Date.now()).getFullYear()}
                  </p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.totalBadges}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Badges Earned
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {stats.communityPosts}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Community Posts
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.resourcesShared}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Resources Shared
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {stats.helpfulVotes}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Helpful Votes
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {stats.incidentReports}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Incident Reports
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Activity
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { action: 'Earned badge', item: 'Community Helper', time: '2 hours ago', type: 'badge' },
                        { action: 'Posted in', item: 'Workplace Support Forum', time: '1 day ago', type: 'post' },
                        { action: 'Downloaded', item: 'Digital Safety Toolkit', time: '3 days ago', type: 'download' },
                        { action: 'Earned badge', item: 'First Post', time: '1 week ago', type: 'badge' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 py-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                            activity.type === 'badge' ? 'bg-yellow-500' :
                            activity.type === 'post' ? 'bg-blue-500' : 'bg-green-500'
                          }`}>
                            {activity.type === 'badge' ? '🏆' : activity.type === 'post' ? '💬' : '📥'}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                              {activity.action} <span className="font-medium">{activity.item}</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'incidents' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Incident Reports Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Your Incident Reports
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Track and manage your workplace incident reports.
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {incidentReports.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="text-gray-400 text-6xl mb-4">🚨</div>
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No Incident Reports Yet
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            You haven't submitted any incident reports yet.
                          </p>
                          <button
                            onClick={() => router.push('/incidents/report')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Report an Incident
                          </button>
                        </div>
                      ) : (
                        incidentReports.map((report) => {
                          const severityColors = {
                            low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
                            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
                            high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          };
                          
                          const statusColors = {
                            pending: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
                            investigating: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
                            resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
                            closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                          };
                          
                          return (
                            <div key={report.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                  {report.title}
                                </h4>
                                <div className="flex gap-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[report.severity]}`}>
                                    {report.severity.toUpperCase()}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
                                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                {report.description}
                              </p>
                              
                              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>📍 {report.location}</span>
                                <span>📅 {new Date(report.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'badges' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Your Badges & Achievements
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Track your progress and showcase your achievements in the DESIST community.
                    </p>
                  </div>
                  <div className="p-6">
                    <BadgeShowcase badges={[]} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Profile Settings
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Manage your personal information and how others see you in the community.
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Display Name
                          </label>
                          <input
                            type="text"
                            defaultValue={profile?.name || ''}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Pronouns
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                            <option value="">Select pronouns</option>
                            <option value="they/them">they/them</option>
                            <option value="she/her">she/her</option>
                            <option value="he/him">he/him</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          rows={3}
                          defaultValue={profile?.bio || ''}
                          placeholder="Tell the community a bit about yourself..."
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          defaultValue={profile?.location || ''}
                          placeholder="City, State/Country"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Privacy & Security Settings
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Control your privacy and who can see your information.
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">Profile Visibility</h4>
                        
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              defaultChecked={!profile?.isPrivate}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              Make my profile visible to other community members
                            </span>
                          </label>
                          
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              defaultChecked={profile?.showEmail}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              Show my email address on my profile
                            </span>
                          </label>
                          
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              defaultChecked={profile?.showLocation}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              Show my location on my profile
                            </span>
                          </label>
                          
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              defaultChecked={profile?.allowMessages}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              Allow other members to send me messages
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Account Security</h4>
                        <div className="space-y-3">
                          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                            Change Password
                          </button>
                          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                            Enable Two-Factor Authentication
                          </button>
                          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20">
                            Delete Account
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          Save Privacy Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}