import React from 'react';
// import { useApp } from '../contexts/AppContext';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();


  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center bg-black text-white justify-center rounded-lg bg-primary">
                <span className="text-primary">M</span>
              </div>
              <span className="text-lg">MockTest</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Practice. Improve. Succeed. Your journey to mastery starts here.
            </p>
          </div>

          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button className="hover:text-primary transition-colors" onClick={() => setCurrentPage('home')}>Home</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors" onClick={() => setCurrentPage('all-tests')}>All Tests</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors" onClick={() => setCurrentPage('about')}>About Us</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors" onClick={() => setCurrentPage('contact')}>Contact</button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button className="hover:text-primary transition-colors">Help Center</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">Terms of Service</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">FAQ</button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Connect With Us</h3>
            <div className="flex gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors">
                <Github className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors">
                <Linkedin className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">support@mocktest.com</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 MockTest Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
