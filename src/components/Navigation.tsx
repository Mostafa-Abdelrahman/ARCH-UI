import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const {  navLogo } = useContent();
  
    const navLogoIcon = Array.isArray(navLogo) ? navLogo.find(logo => logo.type === 'ICON') : (navLogo?.type === 'LOGO' ? navLogo : null);



  const fallbackNavItems = [
    { id: '1', label: 'الرئيسية', href: 'https://www.khaterarchitect.com/#home', order: 1, isActive: true },
    { id: '2', label: 'الخدمات', href: 'https://www.khaterarchitect.com/#services', order: 2, isActive: true },
    { id: '3', label: 'أعمالنا', href: 'https://www.khaterarchitect.com/#portfolio', order: 3, isActive: true },
    { id: '4', label: 'تواصل معنا', href: 'https://www.khaterarchitect.com/#contact', order: 4, isActive: true },
  ];

  const navItems = fallbackNavItems;

  return (
    <nav className="fixed top-0 w-full z-50 dark-nav transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
            <div className="flex items-center">
            <div className="text-right rtl:text-left">
              <img 
              src={navLogoIcon?.logoUrl} 
              alt={navLogoIcon?.altText}
              className="h-12 w-auto object-contain"
              />
            </div>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item, index) => (
              <a
                key={item.href || index}
                href={item.href}
                className="text-foreground hover:text-primary transition-all duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="#contact"
              className="gold-button px-6 m-5 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              ابدأ مشروعك
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-300 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-80 py-4' : 'max-h-0'
          }`}
        >
          <div className="space-y-3 border-t border-primary/20 pt-4">
            {navItems.map((item, index) => (
              <a
                key={item.href || index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 px-2 rounded-lg hover:bg-muted/30"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block gold-button px-4 py-3 rounded-lg font-medium text-center mt-4 w-full"
            >
              ابدأ مشروعك
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}