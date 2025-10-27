import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AspectRatio } from './ui/aspect-ratio';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import type { Project } from '../contexts/ContentContext';


const projects: Project[] = [];
interface PortfolioProps {
  onProjectClick: (project: Project) => void;
}

export function Portfolio({ onProjectClick }: PortfolioProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { projects: apiProjects } = useContent();

  // Use API projects or fallback
  const projectsData = apiProjects.length > 0 ? apiProjects : projects;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-gold-contrast">
          معرض الأعمال
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            اكتشف مجموعة من أفضل أعمالنا في مجال العمارة والتصميم
          </p>
        </div>

        {/* Main Gallery Slider */}
        <div className="relative mb-12">
          <div className="overflow-hidden rounded-2xl gallery-container">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${currentSlide * 100}%)` }}
            >
              {projectsData.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="relative h-[60vh] md:h-[70vh] cursor-pointer" onClick={() => onProjectClick(project)}>
                    <AspectRatio ratio={16 / 9} className="h-full">
                      <ImageWithFallback
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover gallery-image"
                      />
                    </AspectRatio>
                    
                    {/* Project overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Project info */}
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white/80">
                          {project.year}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl md:text-4xl mb-4">{project.title}</h3>
                      <p className="text-white/90 mb-6 text-lg max-w-2xl leading-relaxed">
                        {project.description}
                      </p>
                      
                      <Button className="gold-button gap-2">
                        <Eye className="w-4 h-4" />
                        <span>عرض التفاصيل</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {projectsData.length > 1 && (
            <>
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full dark-glass-card border-primary/30 hover:border-primary/50 text-primary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full dark-glass-card border-primary/30 hover:border-primary/50 text-primary"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Slide indicators */}
          {projectsData.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2 rtl:space-x-reverse">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {projectsData.map((project, index) => (
            <div 
              key={project.id}
              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                index === currentSlide ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <AspectRatio ratio={4 / 3}>
                <ImageWithFallback
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-sm font-medium text-center px-2">
                  {project.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}