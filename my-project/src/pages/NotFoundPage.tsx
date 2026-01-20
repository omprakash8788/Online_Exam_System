import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl mb-4">404</h1>
          <h2 className="text-3xl mb-4">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => setCurrentPage('home')}>
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
