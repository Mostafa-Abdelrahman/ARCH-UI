import { useState, useEffect } from 'react';
import { ContentProvider } from './contexts/ContentContext';
import { useDynamicHead } from './hooks/useDynamicHead';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { ProjectDetail } from './components/ProjectDetail';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import type { Project } from './contexts/ContentContext';

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Use the dynamic head hook
  useDynamicHead();

  useEffect(() => {
    // Set document direction to RTL for Arabic
    document.documentElement.setAttribute('lang', 'ar');
    
    // Apply dark theme class to body and html
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('dark-theme');
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300" >
      <Navigation />
      
      <main className="relative">
        <Hero />
        <Services onProjectClick={handleProjectClick} />
        <Portfolio onProjectClick={handleProjectClick} />
        <Contact />
      </main>

      <Footer />

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleCloseProjectDetail}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}