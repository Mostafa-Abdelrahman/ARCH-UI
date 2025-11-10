import React, {  useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Building, Home, Users, Wrench, ArrowLeft, X, Eye, ExternalLink } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useContent } from '../contexts/ContentContext';
import type { Project } from '../contexts/ContentContext';


// Icon mapping for services
const iconMap: { [key: string]: React.ReactNode } = {
  'Building': <Building className="w-6 h-6" />,
  'Home': <Home className="w-6 h-6" />,
  'Users': <Users className="w-6 h-6" />,
  'Wrench': <Wrench className="w-6 h-6" />,
};



// Service Examples Modal Component
interface ServiceExamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
  } | null;
  onProjectClick: (project: Project) => void;
}

function ServiceExamplesModal({ isOpen, onClose, service, onProjectClick }: ServiceExamplesModalProps) {
  if (!isOpen || !service) return null;

  const projectContent=useContent();
  const projects=projectContent.projects;


  const serviceProjects = projects.filter(project => project.serviceid.includes(service.id)
  );

  const handleViewMore = (project: Project) => {
    // Close the service examples modal first
    onClose();
    // Then open the project detail modal
    onProjectClick(project);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-2 sm:p-4 lg:p-6 py-4 sm:py-6 lg:py-8">
        <div className="bg-background/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl w-[90%] sm:w-[85%] lg:w-[80%] max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-border/50 flex flex-col">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 sm:p-6 lg:p-8 border-b border-border/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary shadow-lg">
                  {service.icon}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1 sm:mb-2">{service.title}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">أمثلة من أعمالنا المتميزة</p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/50 w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
            <p className="text-muted-foreground mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base lg:text-lg max-w-2xl">
              {service.description}
            </p>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0">
            {serviceProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {serviceProjects.map((project: Project) => (
                  <Card key={project.id} className="group hover:scale-[1.02] transition-all duration-500 overflow-hidden border-border/50 shadow-lg hover:shadow-2xl">
                    <div className="relative overflow-hidden">
                      <AspectRatio ratio={16 / 10}>
                        <ImageWithFallback
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </AspectRatio>
                    </div>
                    
                    <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {project.title}
                      </p>
                      
                      {/* View More Button */}
                      <Button 
                        onClick={() => handleViewMore(project)}
                        className="w-full gold-button gap-2 mt-3 sm:mt-4 group/btn"
                        size="sm"
                      >
                        <span className="text-sm sm:text-base">عرض التفاصيل</span>
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 lg:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Eye className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-2 sm:mb-3">لا توجد أمثلة متاحة</h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-md mx-auto px-4">
                  سيتم إضافة أمثلة لهذه الخدمة قريباً. تواصل معنا لمعرفة المزيد عن خدماتنا.
                </p>
                <Button 
                  className="gold-button gap-2 mt-4 sm:mt-6"
                  onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                  onClose();
                  }}
                >
                  <span className="text-sm sm:text-base">تواصل معنا</span>
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 rtl:rotate-180" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServicesProps {
  onProjectClick: (project: Project) => void;
}

export function Services({ onProjectClick }: ServicesProps) {
  const { services: apiServices } = useContent();
  const [selectedService, setSelectedService] = useState<{
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use API services or fallback
  const services = apiServices.length > 0 ? apiServices.map(service => ({
    ...service,
    icon: iconMap[service.icon] || <Building className="w-6 h-6" />
  })) : [];

  const handleShowExamples = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };


  return (
    <section id="services" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-gold-contrast">
            حلول معمارية شاملة
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة متكاملة من الخدمات المعمارية والتصميمية لتحويل رؤيتكم إلى واقع
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service) => (
            <Card key={service.id} className="professional-card group hover:scale-[1.02] transition-all duration-300 rtl-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/30 transition-colors">
                    {service.icon}
                  </div>
                  <div className="mobile-center-desktop-right">
                    <CardTitle className="text-xl text-primary mobile-center-desktop-right">{service.title}</CardTitle>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mobile-center-desktop-right">
                  {service.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3 text-primary mobile-center-desktop-right">المميزات:</h4>
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm mobile-center-desktop-right">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-end pt-4 border-t border-border">
                  <div className="w-full flex justify-center">
                    <Button 
                      size="sm" 
                      className="gold-button gap-2 rtl-button w-full max-w-xs"
                      onClick={() => handleShowExamples(service)}
                    >
                      <span> عرض أمثلة</span>
                    <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Service Examples Modal */}
      <ServiceExamplesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
        onProjectClick={onProjectClick}
      />
    </section>
  );
}