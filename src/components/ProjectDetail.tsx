import { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Project } from '../contexts/ContentContext';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}


export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="w-full h-full flex flex-col lg:flex-row bg-background project-detail-layout">
        {/* Header - Mobile only */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-muted"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Layout - Single Scrollable Container */}
        <div className="lg:hidden flex-1 overflow-y-auto">
          {/* Image Gallery for Mobile */}
          <div className="relative bg-muted">
            <div className="h-[50vh] relative">
              <ImageWithFallback
                src={project.images[currentImageIndex]}
                alt={`${project.title} - صورة ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image navigation */}
              {project.images.length > 1 && (
                <>
                  <Button
                    onClick={prevImage}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border-white/30 hover:border-white/60 text-white backdrop-blur-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={nextImage}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border-white/30 hover:border-white/60 text-white backdrop-blur-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                </>
              )}

              {/* Thumbnail navigation */}
              {project.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-16">
                  <div className="flex gap-2 justify-start overflow-x-auto scrollbar-hide">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-12 h-9 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'border-primary scale-110' 
                            : 'border-white/40 hover:border-white/70'
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`صورة مصغرة ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Details for Mobile */}
          <div className="p-4 space-y-6">
            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary mobile-center-desktop-right">
                {project.title}
              </h1>
              <div 
                className="text-muted-foreground leading-relaxed text-base md:text-lg mobile-center-desktop-right prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.fullDescription }}
              />
            </div>

            {/* Contact CTA */}
            <div className="text-center pt-6">
              <Button 
              className="gold-button gap-2 w-full sm:w-auto"
              onClick={() => {
                onClose();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              >
              <span>تواصل معنا</span>
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </div>

            {/* Extra spacing at bottom for smooth scrolling */}
            <div className="h-8"></div>
          </div>
        </div>

        {/* Desktop Layout - Split View */}
        <div className="hidden lg:flex w-full h-full">
          {/* Image Gallery - Fixed on Desktop Left Side */}
          <div className="w-1/2 h-full relative bg-muted project-image-left">
            <div className="h-full relative">
              <ImageWithFallback
                src={project.images[currentImageIndex]}
                alt={`${project.title} - صورة ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Close button - Desktop only */}
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full bg-black/60 hover:bg-black/80 text-white border-white/20"
              >
                <X className="w-6 h-6" />
              </Button>

          
              
              {/* Image navigation */}
              {project.images.length > 1 && (
                <>
                  <Button
                    onClick={prevImage}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border-white/30 hover:border-white/60 text-white backdrop-blur-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={nextImage}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border-white/30 hover:border-white/60 text-white backdrop-blur-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                </>
              )}

              {/* Thumbnail navigation */}
              {project.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-16">
                  <div className="flex gap-2 justify-start overflow-x-auto scrollbar-hide">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'border-primary scale-110' 
                            : 'border-white/40 hover:border-white/70'
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`صورة مصغرة ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Details - Scrollable Content on Desktop */}
          <div className="w-1/2 overflow-y-auto project-content-right">
            <div className="p-6 lg:p-8 space-y-6 min-h-full">
              {/* Title and Description */}
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary mobile-center-desktop-right">
                  {project.title}
                </h1>
                <div 
                  className="text-muted-foreground leading-relaxed text-base md:text-lg mobile-center-desktop-right prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                />
              </div>
                {/* Contact CTA */}
                <div className="text-center pt-6">
                <Button 
                  className="gold-button gap-2 w-full sm:w-auto"
                  onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>تواصل معنا</span>
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                </Button>
                </div>

              {/* Extra spacing at bottom for smooth scrolling */}
              <div className="h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}