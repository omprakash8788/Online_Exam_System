import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { AllTestsPage } from './pages/AllTestspage';
import { TestInstructionsPage } from './pages/TestInstructionsPage';
import { TestInterfacePage } from './pages/TestInterfacePage';
import { TestResultPage } from './pages/TestResultPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPanel } from './pages/AdminPanel';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'all-tests':
        return <AllTestsPage />;
      case 'test-instructions':
        return <TestInstructionsPage />;
      case 'test-interface':
        return <TestInterfacePage />;
      case 'test-result':
        return <TestResultPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPanel />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'results':
        return <DashboardPage />;
      default:
        return <NotFoundPage />;
    }
  };
  const hideHeaderFooter = currentPage === 'test-interface';
  return (
    <div className="flex min-h-screen flex-col px-8">
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!hideHeaderFooter && <Footer />}
      <Toaster />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
