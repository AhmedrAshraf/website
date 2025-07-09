import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { moderateContent } from '@/utils/contentModeration';

// Initialize Supabase client
const supabase = createClient(
  'https://tscvzrxnxadnvgnsdrqx.supabase.co'!,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3Z6cnhueGFkbnZnbnNkcnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDcxMjgsImV4cCI6MjA2MDMyMzEyOH0.cvE6KoZXbSnigKUpbFzFwLtN-O6H4SxIyu5bn9rU1lY'!
);

export async function POST(request: Request) {
  try {
    const { postId } = await request.json();

    // Get the post content
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('content')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    // Moderate the content
    const moderationResult = await moderateContent(post.content);

    // Update the post status
    const { error: updateError } = await supabase
      .from('posts')
      .update({
        moderation_status: moderationResult.isAppropriate ? 'approved' : 'rejected',
        moderation_reason: moderationResult.reason
      })
      .eq('id', postId);

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      status: moderationResult.isAppropriate ? 'approved' : 'rejected',
      reason: moderationResult.reason
    });
  } catch (error) {
    console.error('Error moderating post:', error);
    return NextResponse.json(
      { error: 'Failed to moderate post' },
      { status: 500 }
    );
  }
} 