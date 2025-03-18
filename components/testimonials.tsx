import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

// Add a props type for the component
type TestimonialsProps = {
  isFirstSection?: boolean;
};

const testimonials = [
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

export function Testimonials({ isFirstSection = false }: TestimonialsProps) {
  return (
    <div className="bg-primary-50 py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent-500/20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-500/20"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-primary-900 sm:text-4xl">
            Wat onze patiënten zeggen
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Lees de ervaringen van onze tevreden patiënten
          </p>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-accent-500 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Gemiddelde beoordeling: 4.9/5 op basis van 120+ reviews
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-8 relative overflow-hidden group"
            >
              <Quote className="absolute top-4 right-4 h-16 w-16 text-accent-500/10 group-hover:text-accent-500/20 transition-colors" />
              
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-accent-500 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="flex-grow mb-6 relative z-10">
                  <p className="text-gray-700 italic leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                </blockquote>
                
                <div className="flex items-center mt-auto">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-accent-500/10 overflow-hidden">
                      {testimonial.imgSrc ? (
                        <img
                          src={testimonial.imgSrc}
                          alt={testimonial.author}
                          className="h-full w-full object-cover"
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
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/search?q=tandartsenpraktijk+berben+bouman"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent-600 hover:text-accent-700 transition-colors font-medium group"
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