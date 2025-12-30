import { AppProvider, useApp } from './context/AppContext';
import AnimatedBackground from './components/background/AnimatedBackground';
import Homepage from './components/Homepage';
import LoadingModal from './components/LoadingModal';
import ProfileSidebar from './components/ProfileSidebar';
import ScriptSidebar from './components/ScriptSidebar';
import MainContentArea from './components/MainContentArea';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';
import WelcomeSection from './components/sections/WelcomeSection';

function PortfolioContent() {
  const { isInitialized, currentSection } = useApp();

  // Render appropriate content section
  const renderContent = () => {
    switch (currentSection) {
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'blog':
        return <BlogSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <WelcomeSection />;
    }
  };

  return (
    <>
      {/* Background Effects - Always Visible */}
      <AnimatedBackground />

      {/* Loading Modal */}
      <LoadingModal />

      {/* Main Content */}
      {!isInitialized ? (
        // Homepage (before initialization)
        <Homepage />
      ) : (
        // Portfolio Layout (after initialization) - 3-COLUMN LAYOUT
        <>
          {/* Left Sidebar - Scripts */}
          <ScriptSidebar />

          {/* Right Sidebar - Profile */}
          <ProfileSidebar />

          {/* Main Content Area - Center */}
          <MainContentArea key={currentSection}>
            {renderContent()}
          </MainContentArea>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <PortfolioContent />
    </AppProvider>
  );
}

export default App;
