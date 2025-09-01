import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../../components/ui';
import { cn } from '../../../utils/cn';

export interface CommunityBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  earnedAt?: string;
  isEarned: boolean;
  requirements?: string;
  progress?: {
    current: number;
    total: number;
  };
}

export interface BadgeShowcaseProps {
  badges: CommunityBadge[];
  title?: string;
  showProgress?: boolean;
  maxDisplay?: number;
  className?: string;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  uncommon: 'from-green-400 to-green-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500',
};

const rarityBorders = {
  common: 'border-gray-300 dark:border-gray-600',
  uncommon: 'border-green-300 dark:border-green-600',
  rare: 'border-blue-300 dark:border-blue-600',
  epic: 'border-purple-300 dark:border-purple-600',
  legendary: 'border-yellow-300 dark:border-yellow-600',
};

export const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({
  badges,
  title = 'Community Badges',
  showProgress = true,
  maxDisplay,
  className,
}) => {
  const displayBadges = maxDisplay ? badges.slice(0, maxDisplay) : badges;
  const earnedBadges = badges.filter(badge => badge.isEarned);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge variant="secondary" className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            {earnedBadges.length} / {badges.length}
          </Badge>
        </div>
        {showProgress && (
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{Math.round((earnedBadges.length / badges.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                'relative group cursor-pointer',
                !badge.isEarned && 'opacity-50'
              )}
              title={badge.description}
            >
              <div className={cn(
                'aspect-square rounded-xl border-2 p-4 flex flex-col items-center justify-center text-center transition-all duration-200 hover:scale-105',
                badge.isEarned 
                  ? `${rarityBorders[badge.rarity]} bg-gradient-to-br ${rarityColors[badge.rarity]} shadow-lg hover:shadow-xl`
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
              )}>
                <div className={cn(
                  'text-2xl mb-2 transition-transform duration-200 group-hover:scale-110',
                  badge.isEarned ? 'drop-shadow-sm' : 'grayscale'
                )}>
                  {badge.icon}
                </div>
                
                <h4 className={cn(
                  'text-xs font-semibold text-center leading-tight',
                  badge.isEarned 
                    ? 'text-white drop-shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400'
                )}>
                  {badge.name}
                </h4>

                {badge.isEarned && badge.earnedAt && (
                  <div className="text-xs text-white/80 mt-1">
                    {new Date(badge.earnedAt).toLocaleDateString()}
                  </div>
                )}

                {!badge.isEarned && badge.progress && (
                  <div className="mt-2 w-full">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                      <div 
                        className="bg-primary-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {badge.progress.current}/{badge.progress.total}
                    </div>
                  </div>
                )}

                {/* Rarity indicator */}
                <div className={cn(
                  'absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900',
                  `bg-gradient-to-br ${rarityColors[badge.rarity]}`,
                  !badge.isEarned && 'opacity-50'
                )} />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg py-2 px-3 max-w-48 text-center shadow-lg">
                  <div className="font-semibold mb-1">{badge.name}</div>
                  <div className="text-gray-200 dark:text-gray-700">{badge.description}</div>
                  {!badge.isEarned && badge.requirements && (
                    <div className="mt-1 text-gray-300 dark:text-gray-600 text-xs">
                      <strong>Unlock:</strong> {badge.requirements}
                    </div>
                  )}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {maxDisplay && badges.length > maxDisplay && (
          <div className="mt-4 text-center">
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors">
              View all {badges.length} badges →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
