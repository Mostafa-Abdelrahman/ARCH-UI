import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { Separator } from './ui/separator';

export function Footer() {
const content = useContent();

  // Icon mapping
  const socialIconMap: { [key: string]: React.ComponentType<any> } = {
    'Facebook': Facebook,
    'Twitter': Twitter,
    'Instagram': Instagram,
    'Linkedin': Linkedin,
    'Youtube': Youtube,
  };
      const {  navLogo } = content;
      const  Icon = Array.isArray(navLogo) ? navLogo.find(logo => logo.type === 'ICON') : (navLogo?.type === 'ICON' ? navLogo : null);
      const logo = Array.isArray(navLogo) ? navLogo.find(logo => logo.type === 'LOGO') : (navLogo?.type === 'LOGO' ? navLogo : null);


  const contactInfo = content.contactInfo ;
  // Use API data or fallback
  const services = content.services?.map(service => service.title) ;
  const quickLinks =  [
      { name: 'الرئيسية', href: '#home' },
      { name: 'من نحن', href: '#about' },
      { name: 'خدماتنا', href: '#services' },
      { name: 'أعمالنا', href: '#portfolio' },
      { name: 'تواصل معنا', href: '#contact' },
      { name: 'المدونة', href: '#blog' }
    ];

  const socialLinks = content.socialLinks.length > 0 ? content.socialLinks : [];

  // Use footer content from API or fallback
  const footerContent = content.footerContent;
  const companyName = footerContent?.companyName || 'AP Architecture';
  const companyDescription = footerContent?.description || 'نحن استوديو معماري رائد في مصر، نختص في تقديم حلول معمارية مبتكرة ومستدامة تجمع بين الأصالة والحداثة.';
  const copyrightText = footerContent?.copyrightText || '© 2024 AP Architecture. جميع الحقوق محفوظة.';

  return (
    <footer className="footer-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              {/* Logo */}
                    <div className="flex flex-col items-center mb-4">
                    <img
                    src={logo?.logoUrl}
                    alt={companyName}
                    style={{ width: '48px', height: '48px' }}
                    className="object-contain"
                    loading="lazy"
                    />
                    </div>
              
              <p className="footer-text leading-relaxed text-sm md:text-base">
                {companyDescription}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 footer-text">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">
                    {contactInfo.find(info => info.type === 'address')?.value}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="tel:+966114567890" className="footer-link text-sm hover:text-primary transition-colors">
                    {contactInfo.find(info => info.type === 'phone')?.value }
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:info@abdullah-studio.com" className="footer-link text-sm hover:text-primary transition-colors">
                    {contactInfo.find(info => info.type === 'email')?.value}
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-6">خدماتنا</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#services" className="footer-text hover:text-primary transition-colors text-sm block">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-6">روابط سريعة</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-text hover:text-primary transition-colors text-sm block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
                <div className="flex flex-col items-center mb-6">
                <img
                  src={Icon?.logoUrl }
                  style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '128px', height: '128px' }}
                  alt="استوديو عبدالله للعمارة والتصميم"
                  className="object-contain mb-2"
                  loading="lazy"
                />
                </div>

              {/* Social Links */}
              <div>
                <div className="flex gap-3 justify-center md:justify-center">
                  {socialLinks.map((social, index) => {
                    const IconComponent = socialIconMap[social.icon] || Facebook;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className="w-9 h-9 bg-muted hover:bg-primary/20 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Bottom Footer */}
        <div className="py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="footer-text text-sm text-center md:text-right rtl:md:text-left">
              {copyrightText}
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="footer-link hover:text-primary transition-colors">
                الخصوصية
              </a>
              <a href="#" className="footer-link hover:text-primary transition-colors">
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>        
      </div>
    </footer>
  );
}