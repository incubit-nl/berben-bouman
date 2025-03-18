"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/payload-types';

interface LatestBlogPostsProps {
  posts: BlogPost[];
}

export function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
  // Format date in a more stylish way
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div>
      <h2 className="text-4xl font-heading text-primary-600 mb-8 relative after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-accent-400 after:rounded-full pb-4">Onze Blog</h2>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link 
            href={`/blog/${post.id}`}
            key={post.id}
            className="block group hover:no-underline"
          >
            <article className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'rgba(227, 183, 165, 0.25)' }}>
              <div className="flex flex-col md:flex-row">
                {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url && (
                  <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                    <img 
                      src={post.featuredImage.url} 
                      alt={post.title || 'Blog post image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1 p-6 relative bg-white/70 backdrop-blur-sm">
                  {post.publishedDate && (
                    <span className="inline-block bg-primary-50 rounded-full px-3 py-1 text-xs text-primary-600 font-medium mb-3">
                      {formatDate(post.publishedDate)}
                    </span>
                  )}
                  <h3 className="text-2xl font-semibold text-primary-600 group-hover:text-accent-500 transition-colors mb-3 group-hover:underline decoration-accent-200 underline-offset-4">
                    {post.title}
                  </h3>
                  <div>
                    <p className="text-olive text-base leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-coral hover:text-coral/80 font-medium text-sm flex items-center">
                      Lees artikel
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button 
          variant="outline" 
          size="lg"
          className="border-coral text-coral hover:bg-coral/10 hover:border-coral px-8 py-6 text-base font-medium rounded-full transition-all duration-300 hover:shadow-md"
          asChild
        >
          <Link href="/blog">Alle blogs</Link>
        </Button>
      </div>
    </div>
  );
} 