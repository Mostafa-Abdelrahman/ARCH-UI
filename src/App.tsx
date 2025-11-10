import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './contexts/ContentContext';
import { useDynamicHead } from './hooks/useDynamicHead';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { ProjectDetail } from './components/ProjectDetail';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import type { Project } from './contexts/ContentContext';

function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <main className="relative">
        <Hero />
        <Services onProjectClick={handleProjectClick} />
        <Portfolio onProjectClick={handleProjectClick} />
        <Contact />
      </main>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleCloseProjectDetail}
        />
      )}
    </>
  );
}

function AppContent() {
  // Use the dynamic head hook
  useDynamicHead();

  useEffect(() => {
    // Set document direction to RTL for Arabic
    document.documentElement.setAttribute('lang', 'ar');
    
    // Apply dark theme class to body and html
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('dark-theme');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}