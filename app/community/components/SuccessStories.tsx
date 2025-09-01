import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, Badge } from '../../components/ui';
import { cn } from '../../../utils/cn';

export interface SuccessStory {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    location?: string;
    isAnonymous: boolean;
  };
  category: string;
  impact: {
    type: 'incident_resolved' | 'support_provided' | 'policy_change' | 'awareness_raised';
    description: string;
  };
  timestamp: string;
  featured: boolean;
  likes: number;
  tags: string[];
}

export interface SuccessStoriesProps {
  stories: SuccessStory[];
  title?: string;
  maxDisplay?: number;
  showFeaturedOnly?: boolean;
  className?: string;
}

const impactIcons = {
  incident_resolved: '🛡️',
  support_provided: '🤝',
  policy_change: '📋',
  awareness_raised: '📢',
};

const impactColors = {
  incident_resolved: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  support_provided: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  policy_change: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  awareness_raised: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
};

export const SuccessStories: React.FC<SuccessStoriesProps> = ({
  stories,
  title = 'Success Stories',
  maxDisplay = 6,
  showFeaturedOnly = false,
  className,
}) => {
  const filteredStories = showFeaturedOnly 
    ? stories.filter(story => story.featured)
    : stories;
  
  const displayStories = maxDisplay 
    ? filteredStories.slice(0, maxDisplay)
    : filteredStories;

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          {filteredStories.length} stories
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={cn(
              'h-full transition-all duration-200 hover:shadow-lg cursor-pointer group',
              story.featured && 'ring-2 ring-yellow-200 dark:ring-yellow-800 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950/20 dark:to-gray-950'
            )}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant="secondary" 
                      className={cn(impactColors[story.impact.type])}
                    >
                      <span className="mr-1">{impactIcons[story.impact.type]}</span>
                      {story.impact.type.replace('_', ' ')}
                    </Badge>
                    {story.featured && (
                      <Badge variant="default" className="bg-yellow-500 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {story.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">
                    {story.author.isAnonymous ? 'Anonymous' : story.author.name}
                  </span>
                  {story.author.location && !story.author.isAnonymous && (
                    <>
                      <span>•</span>
                      <span>{story.author.location}</span>
                    </>
                  )}
                  <span>•</span>
                  <time dateTime={story.timestamp}>
                    {new Date(story.timestamp).toLocaleDateString()}
                  </time>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 mb-3">
                    <div className="text-sm font-medium text-primary-800 dark:text-primary-300 mb-1">
                      Impact
                    </div>
                    <div className="text-sm text-primary-700 dark:text-primary-400">
                      {story.impact.description}
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {truncateText(story.excerpt)}
                  </p>
                </div>

                {story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {story.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" size="sm" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {story.tags.length > 3 && (
                      <Badge variant="outline" size="sm" className="text-xs">
                        +{story.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {story.likes}
                  </button>

                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors">
                    Read full story →
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredStories.length > maxDisplay && (
        <div className="mt-8 text-center">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            View All Success Stories ({filteredStories.length})
          </button>
        </div>
      )}

      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No stories yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Be the first to share your success story with the community.
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Share Your Story
          </button>
        </div>
      )}
    </div>
  );
};
