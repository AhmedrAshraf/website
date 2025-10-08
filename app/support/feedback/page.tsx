/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// Removed Card and Button imports - using direct styling instead

interface FeedbackForm {
  type: 'bug' | 'feedback' | 'feature-request' | 'safety-concern';
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  email: string;
  userAgent: string;
  url: string;
  attachments: File[];
}

export default function FeedbackPage() {
  const [form, setForm] = useState<FeedbackForm>({
    type: 'feedback',
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    email: '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    url: typeof window !== 'undefined' ? window.location.href : '',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    { id: 'feedback', label: 'General Feedback', icon: '💬', description: 'Share your thoughts about our website or services' },
    { id: 'bug', label: 'Bug Report', icon: '🐛', description: 'Report a technical issue or something that isn\'t working' },
    { id: 'feature-request', label: 'Feature Request', icon: '💡', description: 'Suggest a new feature or improvement' },
    { id: 'safety-concern', label: 'Safety Concern', icon: '🚨', description: 'Report a safety or security issue' }
  ];

  const categories = {
    feedback: ['Website Experience', 'Resource Quality', 'Community Features', 'Accessibility', 'Other'],
    bug: ['Website Functionality', 'Mobile Responsiveness', 'Account Issues', 'Search Problems', 'Other'],
    'feature-request': ['User Interface', 'New Resources', 'Community Tools', 'Mobile App', 'Other'],
    'safety-concern': ['Content Safety', 'Privacy Issue', 'Security Vulnerability', 'Harassment', 'Other']
  };

  const priorities = [
    { id: 'low', label: 'Low', description: 'Minor issue, no urgency' },
    { id: 'medium', label: 'Medium', description: 'Moderate impact, should be addressed' },
    { id: 'high', label: 'High', description: 'Significant issue affecting usability' },
    { id: 'critical', label: 'Critical', description: 'Urgent safety or security concern' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, this would submit to your API
    console.log('Feedback submitted:', form);
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm(prev => ({
        ...prev,
        attachments: Array.from(e.target.files || [])
      }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Thank You!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your {form.type === 'bug' ? 'bug report' : form.type === 'feature-request' ? 'feature request' : form.type} has been submitted successfully. 
              We appreciate your feedback and will review it carefully.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    type: 'feedback',
                    title: '',
                    description: '',
                    category: '',
                    priority: 'medium',
                    email: '',
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                    url: typeof window !== 'undefined' ? window.location.href : '',
                    attachments: []
                  });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Submit Another Report
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Return to Home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Feedback & Bug Reports
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Help us improve DESIST by sharing your feedback, reporting bugs, or suggesting new features. 
              Your input helps us build better safety tools for everyone.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Feedback Type Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What type of feedback are you sharing?
                </h2>
              </div>
              <div>
                <div className="grid md:grid-cols-2 gap-4">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, type: type.id as any, category: '' }))}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        form.type === type.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {type.label}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Priority Level (for bugs and safety concerns) */}
            {(form.type === 'bug' || form.type === 'safety-concern') && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Priority Level
                  </h2>
                </div>
                <div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {priorities.map((priority) => (
                      <button
                        key={priority.id}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, priority: priority.id as any }))}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          form.priority === priority.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className={`font-medium ${
                          priority.id === 'critical' ? 'text-red-600 dark:text-red-400' :
                          priority.id === 'high' ? 'text-orange-600 dark:text-orange-400' :
                          priority.id === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-green-600 dark:text-green-400'
                        }`}>
                          {priority.label}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {priority.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Details
                </h2>
              </div>
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {categories[form.type].map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    required
                    placeholder={`Brief description of your ${form.type === 'feature-request' ? 'feature request' : form.type}`}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={6}
                    placeholder={
                      form.type === 'bug' 
                        ? 'Please describe the bug, including steps to reproduce it, what you expected to happen, and what actually happened.'
                        : form.type === 'feature-request'
                        ? 'Describe the feature you\'d like to see and how it would help you or others.'
                        : form.type === 'safety-concern'
                        ? 'Please describe the safety concern in detail. Your report will be handled with priority and confidentiality.'
                        : 'Share your thoughts, suggestions, or general feedback about our website or services.'
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Provide your email if you&apos;d like us to follow up with you about this {form.type === 'feature-request' ? 'feature request' : form.type}.
                  </p>
                </div>

                {/* File Attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attachments (Optional)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Upload screenshots, documents, or other files that might help us understand your {form.type === 'feature-request' ? 'feature request' : form.type}.
                  </p>
                  {form.attachments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Files selected:</p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {form.attachments.map((file, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span>📎</span>
                            {file.name} ({Math.round(file.size / 1024)}KB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Technical Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Technical Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  This information helps us reproduce and fix technical issues.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Page URL
                  </label>
                  <input
                    type="url"
                    value={form.url}
                    onChange={(e) => setForm(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Browser Information
                  </label>
                  <textarea
                    value={form.userAgent}
                    onChange={(e) => setForm(prev => ({ ...prev, userAgent: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                      Privacy & Safety
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Your feedback is important to us. We handle all reports confidentially and in accordance with our privacy policy. 
                      For safety concerns, our team will review and respond with appropriate priority. 
                      If you are in immediate danger, please contact emergency services directly.
                    </p>
                  </div>
                </div>
              </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !form.title || !form.description || !form.category}
                className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Submitting...
                  </>
                ) : (
                  `Submit ${form.type === 'bug' ? 'Bug Report' : form.type === 'feature-request' ? 'Feature Request' : form.type === 'safety-concern' ? 'Safety Concern' : 'Feedback'}`
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
