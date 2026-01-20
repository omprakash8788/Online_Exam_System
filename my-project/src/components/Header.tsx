import React from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Menu, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useApp } from '../contexts/AppContext';

export const Header: React.FC = () => {
  const { user, logout, theme, currentPage, setCurrentPage } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center bg-black text-white justify-center rounded-lg bg-primary">
              <span className="text-primary-foreground">M</span>
            </div>
            <span className="text-lg">MockTest</span>
          </button>

          {!user && (
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm transition-colors hover:text-primary ${
                  currentPage === 'home' ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('all-tests')}
                className={`text-sm transition-colors hover:text-primary ${
                  currentPage === 'all-tests' ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
              >
                Tests
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`text-sm transition-colors hover:text-primary ${
                  currentPage === 'about' ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`text-sm transition-colors hover:text-primary ${
                  currentPage === 'contact' ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
              >
                Contact
              </button>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar>
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuItem onClick={() => setCurrentPage('profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage('dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem onClick={() => setCurrentPage('admin')}>
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" onClick={() => setCurrentPage('login')}>
                Login
              </Button>
              <Button onClick={() => setCurrentPage('signup')}>Sign Up</Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
