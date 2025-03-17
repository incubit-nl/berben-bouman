import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPayload } from 'payload';
import config from '@payload-config';
import { PageContainer } from '@/components/page-container';

async function getBlogPosts() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    depth: 2,
    populate: {
      'blog-posts': {
        author: true,
        featuredImage: true,
      },
    },
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

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

  // For debugging
  console.log('First post author:', posts[0]?.author);

  return (
    <PageContainer>
      <div className="container-custom py-16">
        <h1 className="text-4xl font-heading text-primary-600 font-bold mb-8">Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              href={`/blog/${post.id}`}
              key={post.id}
              className="block group transition-transform hover:scale-[1.02] duration-300 no-underline hover:no-underline"
            >
              <Card className="overflow-hidden h-full cursor-pointer hover:shadow-md transition-shadow border-0 bg-white/80 backdrop-blur-sm flex flex-col">
                <div className="relative h-52">
                  <Image
                    src={typeof post.featuredImage === 'object' && post.featuredImage.url ? post.featuredImage.url : '/default-image.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {post.publishedDate && (
                    <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm px-3 py-1 m-3 rounded-md text-xs font-medium text-brown">
                      {formatDate(post.publishedDate)}
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2 pt-5">
                  <div className="relative">
                    <CardTitle className="text-xl text-brown group-hover:text-coral transition-all font-heading no-underline">
                      {post.title}
                    </CardTitle>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coral group-hover:w-full transition-all duration-300"></span>
                  </div>
                  {post.author && typeof post.author === 'object' && 'name' in post.author && (
                    <div className="text-xs text-olive mt-1">
                      Door {post.author.name as string}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <p className="text-olive text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex justify-end">
                    <span className="text-coral group-hover:text-coral/80 flex items-center font-medium text-sm">
                      Lees meer 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-heading text-brown font-semibold mb-4">
            Blijf op de Hoogte
          </h2>
          <p className="mb-6 text-olive">
            Schrijf je in voor onze nieuwsbrief en ontvang de laatste blogs en tips direct in je inbox
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Je email adres"
              className="flex-1 px-4 py-2 rounded border"
            />
            <button
              type="submit"
              className="bg-coral text-white px-6 py-2 rounded hover:bg-coral/90 transition-colors"
            >
              Inschrijven
            </button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}