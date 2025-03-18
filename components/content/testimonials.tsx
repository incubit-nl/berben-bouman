import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';

// Add a props type for the component
type TestimonialsProps = {
  isFirstSection?: boolean;
};

// Define types for testimonial data
type Testimonial = {
  content: string;
  author: string;
  role: string;
  rating: number;
  imgSrc?: string;
};

type TestimonialsData = {
  title: string;
  subtitle: string;
  averageRating: number;
  totalReviews: number;
  testimonials: Testimonial[];
};

// Define CMS types
type CMSTestimonial = {
  content?: string;
  author?: string;
  occupation?: string;
  rating?: number;
  image?: {
    url?: string;
  };
};

async function getTestimonialsData(): Promise<TestimonialsData> {
  const payload = await getPayload({ config });
  
  // Get testimonials from CMS
  const testimonials = await payload.find({
    collection: 'testimonials',
    limit: 6
  }).then(res => res.docs as CMSTestimonial[]);
  
  // Calculate average rating
  const calculateAverageRating = () => {
    if (!testimonials?.length) return "4.9";
    
    const sum = testimonials.reduce((acc, testimonial) => acc + (testimonial.rating || 5), 0);
    return (sum / testimonials.length).toFixed(1);
  };
  
  // Transform CMS data to component data
  const mapTestimonials = (): Testimonial[] => {
    if (!testimonials?.length) {
      return [
        {
          content: "Zeer professionele praktijk met een vriendelijk team. De behandeling was pijnloos en ik voelde me erg op mijn gemak.",
          author: "Maria S.",
          role: "Patiënt",
          rating: 5,
          imgSrc: "/images/patient-avatar-1.jpg",
        },
        {
          content: "Uitstekende service en zeer kundig team. De moderne apparatuur en rustige omgeving maken het bezoek aangenaam.",
          author: "Jan de V.",
          role: "Patiënt",
          rating: 5,
          imgSrc: "/images/patient-avatar-2.jpg",
        },
        {
          content: "Ik ben zeer tevreden over de behandeling. Het team is zeer deskundig en neemt de tijd om alles goed uit te leggen.",
          author: "Sophie B.",
          role: "Patiënt",
          rating: 5,
          imgSrc: "/images/patient-avatar-3.jpg",
        },
      ];
    }
    
    return testimonials.map(testimonial => ({
      content: testimonial.content || "",
      author: testimonial.author || "Anoniem",
      role: testimonial.occupation || "Patiënt",
      rating: testimonial.rating || 5,
      imgSrc: testimonial.image?.url,
    })).slice(0, 3);
  };
  
  return {
    title: "Wat onze patiënten zeggen",
    subtitle: "Lees de ervaringen van onze tevreden patiënten",
    averageRating: parseFloat(calculateAverageRating()),
    totalReviews: testimonials?.length || 120,
    testimonials: mapTestimonials()
  };
}

export async function Testimonials({ isFirstSection = false }: TestimonialsProps) {
  const data = await getTestimonialsData();
  
  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100/60 py-24 relative overflow-hidden">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent-500/10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-500/10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-sm font-medium mb-4">
            Patiëntervaringen
          </span>
          <h2 className="text-3xl font-extrabold text-primary-900 sm:text-4xl text-center">
            {data.title}
          </h2>
          <div className="w-16 h-1 bg-accent-500 mx-auto my-6"></div>
          <p className="text-lg text-gray-600 mb-6">
            {data.subtitle}
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-md">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < Math.round(data.averageRating) ? 'text-accent-500 fill-current' : 'text-gray-300'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="ml-3 pl-3 border-l border-gray-200">
              <p className="text-lg font-bold text-primary-900">{data.averageRating}/5</p>
              <p className="text-xs text-gray-500">{data.totalReviews}+ reviews</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative overflow-hidden group transform hover:-translate-y-1 border border-neutral-100"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Quote className="absolute top-4 right-4 h-16 w-16 text-accent-500/10 group-hover:text-accent-500/20 transition-colors" />
              
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-accent-500 fill-current' : 'text-gray-300'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="flex-grow mb-6 relative z-10">
                  <p className="text-gray-700 italic leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                </blockquote>
                
                <div className="flex items-center mt-auto pt-4 border-t border-neutral-100">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-accent-500/10 overflow-hidden shadow-sm">
                      {testimonial.imgSrc ? (
                        <Image
                          src={testimonial.imgSrc}
                          alt={testimonial.author}
                          className="h-full w-full object-cover"
                          width={48}
                          height={48}
                        />
                      ) : (
                        <span className="flex items-center justify-center h-full w-full text-lg font-medium text-accent-500">
                          {testimonial.author.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-primary-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 opacity-80"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/search?q=tandartsenpraktijk+berben+bouman"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Bekijk alle reviews op Google
            <svg
              className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 