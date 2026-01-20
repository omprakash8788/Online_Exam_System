/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { User, Mail, Shield, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export const ProfilePage: React.FC = () => {
  const { user, testResults } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please login to view profile</p>
      </div>
    );
  }

  // const handleSave = () => {
  //   // In a real app, this would update the user data
  //   toast.success('Profile updated successfully!');
  //   setIsEditing(false);
  // };

  const handleSave = async () => {
    try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/users/${user?.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
        }),
      }
    );
    
   console.log(response, "line number 50")
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    toast.success('Profile updated successfully!');
    setIsEditing(false);

  } catch (error) {
    toast.error('Error updating profile');
  }
};



  const totalAttempted = testResults.length;
  const averageScore = testResults.length > 0
    ? Math.round(testResults.reduce((acc, r) => acc + r.percentage, 0) / testResults.length)
    : 0;
  const bestScore = testResults.length > 0 ? Math.max(...testResults.map((r) => r.percentage)) : 0;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl mb-8">Profile</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
                <Badge variant="secondary" className="mb-4">
                  <Shield className="mr-1 h-3 w-3" />
                  {user.role === 'admin' ? 'Admin' : 'Student'}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined November 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Tests Completed</span>
                </div>
                <span>{totalAttempted}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Average Score</span>
                </div>
                <span>{averageScore}%</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Best Score</span>
                </div>
                <span>{bestScore}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-md border p-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{user.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-md border p-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{user.role}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Test History</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults.length > 0 ? (
                <div className="space-y-3">
                  {testResults.slice(0, 5).map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <p>{result.testTitle}</p>
                        <p className="text-sm text-muted-foreground">{result.date}</p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg ${
                            result.percentage >= 60 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {result.percentage}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {result.correct}/{result.totalQuestions}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No tests attempted yet</p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => {
                      // Navigate to tests page
                    }}
                  >
                    Start your first test
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
