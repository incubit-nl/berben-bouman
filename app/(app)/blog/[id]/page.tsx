import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';
import { BlogContent } from '@/components/blog/blog-content';

async function getBlogPost(id: string) {
  const payload = await getPayload({ config });
  const post = await payload.findByID({
    collection: 'blog-posts',
    id,
    depth: 2,
    populate: {
      'blog-posts': {
        author: true,
        featuredImage: true,
      },
    },
  });
  return post;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.id);

  // Format date in a more elegant way
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('nl-NL', options);
  };

  // Get author name safely
  const getAuthorName = () => {
    if (!post.author) return '';
    if (typeof post.author === 'object' && post.author.name) {
      return post.author.name;
    }
    return '';
  };

  // For debugging
  console.log('Author data:', post.author);

  return (
    <div className="container-custom py-16">
      <article>
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] mb-8">
            <Image
              priority
              src={typeof post.featuredImage === 'object' && post.featuredImage.url ? post.featuredImage.url : '/default-image.jpg'}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-olive/80 mb-4">
            <time className="font-medium">{formatDate(post.publishedDate)}</time>
            {getAuthorName() && (
              <>
                <span>•</span>
                <span className="font-medium">{getAuthorName()}</span>
              </>
            )}
          </div>

          <h1 className="text-4xl font-heading text-brown font-bold mb-6">{post.title}</h1>

          <BlogContent content={post.content} />
        </div>
      </article>
    </div>
  );
}