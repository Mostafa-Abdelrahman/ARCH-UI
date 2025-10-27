import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';

interface SiteSettings {
  [key: string]: any;
}

interface Logo{
  id: string;
  type: string;
  logoUrl: string;
  altText: string;
  isActive: boolean;
}

interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText : string;
  secondaryButtonLink : string;
  images:string[];
  isActive: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  isActive: boolean;
  projects?: {
    id: string;
    title: string;
    coverImage: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  serviceid: string;
  description: string;
  fullDescription: string;
  location?: string;
  year?: string;
  area?: string;
  client?: string;
  status: string;
  coverImage: string;
  images: string[];
  tags?: string[];
  features: string[];
  order: number;
  isActive: boolean;
}

interface ContactInfo {
  id: string;
  type: string;
  label: string;
  value: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

interface socialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
}

interface FooterContent {
  id?: string;
  companyName?: string;
  description?: string;
  copyrightText?: string;
  isActive?: boolean;
}

interface ContentContextType {
  navLogo: Logo | null;
  siteSettings: SiteSettings;
  heroContent: HeroContent | null;
  services: Service[];
  projects: Project[];
  contactInfo: ContactInfo[];
  socialLinks: socialLink[];
  footerContent: FooterContent | null;
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({} as ContentContextType);

export const useContent = () => {
  const context = useContext(ContentContext);
  return context;
};


interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [logo, setLogo] = useState<Logo | null>(null);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [socialLinks, setSocialLinks] = useState<socialLink[]>([]);
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        logoRes,
        heroRes,
        servicesRes,
        projectsRes,
        contactRes,
        socialRes,
        footerRes
      ] = await Promise.all([
        api.get('/logo'),
        api.get('/content/hero'),
        api.get('/services'),
        api.get('/projects'),
        api.get('/content/contact-info'),
        api.get('/content/social-links'),
        api.get('/content/footer')
      ]);

      setLogo(logoRes.data.data);
      setHeroContent(heroRes.data.data);
      setServices(servicesRes.data.data);
      setProjects(projectsRes.data.data);
      setContactInfo(contactRes.data.data);
      setSocialLinks(socialRes.data.data);
      setFooterContent(footerRes.data.data);
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError('فشل في تحميل المحتوى');
    } finally {
      setLoading(false);
    }
  };

  const refreshContent = async () => {
    await fetchContent();
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const value = {
    siteSettings: {},
    navLogo: logo,
    heroContent: heroContent,
    services: services,
    projects: projects,
    contactInfo: contactInfo,
    socialLinks: socialLinks,
    footerContent: footerContent,
    loading,
    error,
    refreshContent
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
