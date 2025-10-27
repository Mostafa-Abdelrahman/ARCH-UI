import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useContent } from '../contexts/ContentContext';



export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { heroContent } = useContent();


  const heroData = heroContent ;

  const heroImages = heroData?.images.map((url, index) => {
    return {
      url,
      alt: `صورة ${index + 1}`
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages?.length || 3 - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {heroImages?.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>
      


      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-contrast mb-6 md:mb-8 leading-tight tracking-tight">
          <span className="gold-text-gradient block mb-2">{heroData?.title}</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
          {heroData?.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
          <a 
            href={heroData?.buttonLink} 
            className="w-full sm:w-auto inline-flex items-center justify-center gold-button px-6 md:px-8 py-3 md:py-4 rounded-lg group font-medium text-sm md:text-base transition-all duration-300"
          >
            {heroData?.buttonText}
            <ArrowLeft className="mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
          </a>
          <a 
            href={heroData?.secondaryButtonLink} 
            className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-primary/50 text-primary px-6 md:px-8 py-3 md:py-4 hover:bg-primary/10 hover:border-primary transition-all duration-300 rounded-lg font-medium dark-glass-card backdrop-blur-sm text-sm md:text-base"
          >
            {heroData?.secondaryButtonText}
          </a>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-16 md:bottom-20 right-4 md:right-8 z-20 hidden md:block">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-12 md:h-16 bg-primary/60"></div>
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 rtl:space-x-reverse z-20">
        {heroImages?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-primary scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Mobile optimized floating elements */}
      <div className="absolute top-20 right-4 z-20 block md:hidden">
        <div className="w-8 h-8 border border-primary/30 rounded-full flex items-center justify-center dark-glass-card">
          <div className="w-4 h-4 gold-gradient rounded-full"></div>
        </div>
      </div>

      <div className="absolute bottom-32 left-4 z-20 block md:hidden">
        <div className="w-6 h-6 border border-primary/20 rounded dark-glass-card rotate-45">
          <div className="w-full h-full light-gold-gradient opacity-30 rounded"></div>
        </div>
      </div>
    </section>
  );
}