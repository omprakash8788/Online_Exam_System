import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Chrome } from 'lucide-react';
import { toast } from 'sonner';


export const SignUpPage: React.FC = () => {
  const { signup, setCurrentPage } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  console.log(role)

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!name || !email || !password || !confirmPassword) {
  //     toast.error('Please fill in all fields');
  //     return;
  //   }
    
  //   if (password !== confirmPassword) {
  //     toast.error('Passwords do not match');
  //     return;
  //   }
    
  //   if (password.length < 6) {
  //     toast.error('Password must be at least 6 characters');
  //     return;
  //   }
    
  //   signup(name, email, password, role);
  //   toast.success('Account created successfully!');
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    toast.error('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return;
  }

  const result = await signup(name, email, password, role);
  console.log("line 62", result)

  if (!result.success) {
    toast.error(result.message);     // ✅ shows backend error
    return;
  }

  toast.success('Account created successfully!');
  setCurrentPage('login');           // optional redirect
};


  const handleGoogleSignup = () => {
    signup('Google User', 'user@gmail.com', 'password', 'student');
    toast.success('Signed up with Google!');
  };  
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Select Role</Label>
              <RadioGroup value={role} onValueChange={(v) => setRole(v as 'student' | 'admin')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button type="submit" className="w-full bg-black text-white">
              Sign Up
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignup}>
            <Chrome className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              className="text-primary hover:underline"
              onClick={() => setCurrentPage('login')}
            >
              Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
