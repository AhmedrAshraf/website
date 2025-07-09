"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import supabase from '../../../../utils/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { moderateContent } from '../../../../utils/contentModeration';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  user_id: string;
  created_at: string;
  moderation_status: 'pending' | 'approved' | 'rejected';
  moderation_reason?: string;
  like_count: number;
  users: {
    email: string;
    full_name: string | null;
    username: string | null;
  };
}

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  users: {
    email: string;
    full_name: string | null;
    username: string | null;
  } | null;
}

const CATEGORIES = [
  { id: 'support', name: 'Support Groups', color: 'blue', bgClass: 'bg-blue-100 dark:bg-blue-900/30', textClass: 'text-blue-800 dark:text-blue-300' },
  { id: 'resources', name: 'Resource Sharing', color: 'purple', bgClass: 'bg-purple-100 dark:bg-purple-900/30', textClass: 'text-purple-800 dark:text-purple-300' },
  { id: 'stories', name: 'Success Stories', color: 'pink', bgClass: 'bg-pink-100 dark:bg-pink-900/30', textClass: 'text-pink-800 dark:text-pink-300' },
  { id: 'updates', name: 'Community Updates', color: 'green', bgClass: 'bg-green-100 dark:bg-green-900/30', textClass: 'text-green-800 dark:text-green-300' }
];

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserLikes(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserLikes(session.user.id);
      } else {
        setLikedPosts(new Set());
      }
    });

    // Fetch post and comments
    if (params.id) {
      fetchPost(Number(params.id));
      fetchComments(Number(params.id));
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [params.id]);

  const fetchPost = async (postId: number) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users!inner (
            email,
            full_name,
            username
          ),
          post_likes (
            id
          )
        `)
        .eq('id', postId)
        .single();

      if (error) throw error;

      setPost({
        ...data,
        like_count: data.post_likes?.length || 0
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      // First fetch comments
      const { data: comments, error: commentsError } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Then fetch user data for each comment
      const commentsWithUsers: Comment[] = await Promise.all(
        (comments || []).map(async (comment) => {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('email, full_name, username')
            .eq('id', comment.user_id)
            .single();

          if (userError) {
            console.error('Error fetching user data:', userError);
            return {
              ...comment,
              users: null
            };
          }

          return {
            ...comment,
            users: userData
          };
        })
      );

      setComments(commentsWithUsers);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const fetchUserLikes = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('post_likes')
        .select('post_id')
        .eq('user_id', userId);

      if (error) throw error;
      setLikedPosts(new Set(data.map(like => like.post_id)));
    } catch (error) {
      console.error('Error fetching user likes:', error);
    }
  };

  const handleLike = async (postId: number) => {
    if (!user) {
      alert('Please sign in to like posts');
      return;
    }

    try {
      const isCurrentlyLiked = likedPosts.has(postId);

      // Optimistically update UI
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (isCurrentlyLiked) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });

      if (post) {
        setPost(prev => prev ? {
          ...prev,
          like_count: isCurrentlyLiked ? Math.max(0, prev.like_count - 1) : prev.like_count + 1
        } : null);
      }

      if (isCurrentlyLiked) {
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('post_likes')
          .insert([{ post_id: postId, user_id: user.id }]);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (likedPosts.has(postId)) {
          newSet.add(postId);
        } else {
          newSet.delete(postId);
        }
        return newSet;
      });
      if (post) {
        setPost(prev => prev ? {
          ...prev,
          like_count: likedPosts.has(postId) ? prev.like_count + 1 : Math.max(0, prev.like_count - 1)
        } : null);
      }
    }
  };

  const handleComment = async () => {
    if (!user) {
      alert('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      // Moderate the comment content first
      const moderationResult = await moderateContent(newComment.trim());
      
      if (!moderationResult.isAppropriate) {
        alert(`Your comment contains inappropriate content: ${moderationResult.reason}`);
        return;
      }

      // First insert the comment
      const { data: comment, error } = await supabase
        .from('post_comments')
        .insert([
          {
            post_id: Number(params.id),
            user_id: user.id,
            content: newComment.trim()
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Then fetch the user details separately
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email, full_name, username')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Error fetching user details:', userError);
      }

      // Combine the comment with user data
      const commentWithUser = {
        ...comment,
        users: userData || { email: user.email }
      };

      setComments(prev => [...prev, commentWithUser]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-b-4 border-gray-900 dark:border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
        <button
          onClick={() => router.push('/community')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Community
        </button>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === post.category);
  const displayName = post.users?.username || post.users?.full_name || post.users?.email;
  const isLiked = likedPosts.has(post.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
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
            {post.users?.username && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                @{post.users.username}
              </span>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>

        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-6">
          {post.content}
        </p>

        <div className="flex items-center gap-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={() => handleLike(post.id)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isLiked
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {post.like_count} {post.like_count === 1 ? 'Like' : 'Likes'}
          </button>
        </div>
      </motion.div>

      {/* Comments section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Comments
        </h2>

        {/* Comment input */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleComment();
              }
            }}
            placeholder="Write a comment..."
            className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleComment}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Comment
          </button>
        </div>

        {/* Comments list */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {comment.users?.username || comment.users?.full_name || comment.users?.email}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
} 