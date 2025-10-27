import { useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';

export const useDynamicHead = () => {
  const { footerContent, navLogo, heroContent, loading } = useContent();
  // Check if the logo is of type ICON
  const navLogoIcon = Array.isArray(navLogo) ? navLogo.find(logo => logo.type === 'ICON') : (navLogo?.type === 'ICON' ? navLogo : null);
  useEffect(() => {
    if (loading) return;

    // Update document title
    if (footerContent?.companyName) {
      document.title = footerContent.companyName;
      
      // Update dynamic title element
      const titleElement = document.getElementById('dynamic-title');
      if (titleElement) {
        titleElement.textContent = footerContent.companyName;
      }
    }

    // Update favicon - navLogoIcon will now always be type "icon"
    if (navLogoIcon?.logoUrl) {
      const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;
      if (favicon) {
        favicon.href = navLogoIcon.logoUrl;
      }
    }

    // Update meta description
    if (footerContent?.description) {
      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = footerContent.description;
    }

    // Update Open Graph meta tags
    if (footerContent?.companyName) {
      let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = footerContent.companyName;
    }

    if (footerContent?.description) {
      let ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = footerContent.description;
    }

    if (navLogoIcon?.logoUrl && navLogoIcon?.type === 'ICON') {
      let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.content = navLogoIcon.logoUrl;
    }

  }, [footerContent, navLogoIcon, heroContent, loading]);
};