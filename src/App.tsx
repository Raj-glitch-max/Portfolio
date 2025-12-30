import { AppProvider, useApp } from './context/AppContext';
import AnimatedBackground from './components/background/AnimatedBackground';
import Homepage from './components/Homepage';
import LoadingModal from './components/LoadingModal';
import ProfileSidebar from './components/ProfileSidebar';
import ScriptSidebar from './components/ScriptSidebar';
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

  // Check if we're on the welcome page (no section selected or 'home')
  const isWelcomePage = !currentSection || currentSection === 'home';

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
        // Portfolio Layout (after initialization)
        <>
          {/* Left Sidebar - Scripts */}
          <ScriptSidebar />

          {/* Right Sidebar - Profile (hidden on welcome page) */}
          {!isWelcomePage && <ProfileSidebar />}

          {/* Main Content Area - Center (full width on welcome page) */}
          <main className={`
            ml-0 md:ml-[200px]
            ${isWelcomePage ? 'mr-0' : 'mr-0 md:mr-[280px]'}
            min-h-screen
            p-4 md:p-8
          `}>
            <div className={isWelcomePage ? '' : 'max-w-5xl mx-auto'}>
              {renderContent()}
            </div>
          </main>
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
