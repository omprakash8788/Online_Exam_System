import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { mockTests } from '../data/mockData';
import {
  Users,
  BookOpen,
  BarChart3,
  Plus,
  Pencil,
  Trash2,
  FileQuestion,
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminPanel: React.FC = () => {
  const { user } = useApp();
  console.log("i am from admin panel", user)
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAddTest, setShowAddTest] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex min-h-[400px] flex-col items-center justify-center">
            <h2 className="text-xl mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddTest = () => {
    toast.success('Test added successfully!');
    setShowAddTest(false);
  };

  const handleEditTest = (testId: string) => {
    toast.info('Edit test functionality coming soon!');
  };

  const handleDeleteTest = (testId: string) => {
    toast.success('Test deleted successfully!');
  };

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', tests: 5 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'student', tests: 8 },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'student', tests: 3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage tests, users, and view analytics</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-8"> 
          <TabsTrigger className={`${selectedTab === "overview" ? 'bg-black text-white' :''}`} value="overview">Overview</TabsTrigger>
          <TabsTrigger className={`${selectedTab === "tests" ? 'bg-black text-white' :''}`} value="tests">Manage Tests</TabsTrigger>
          <TabsTrigger className={`${selectedTab === "users" ? 'bg-black text-white' :''}`} value="users">Manage Users</TabsTrigger>
          <TabsTrigger className={`${selectedTab === "analytics" ? 'bg-black text-white' :''}`} value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">1,234</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Tests</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{mockTests.length}</div>
                <p className="text-xs text-muted-foreground">Active tests</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Test Attempts</CardTitle>
                <FileQuestion className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">5,432</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Avg. Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">72%</div>
                <p className="text-xs text-muted-foreground">Platform average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="text-sm">New user registration: John Doe</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="outline">User</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="text-sm">Test completed: React.js Fundamentals</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                  <Badge variant="outline">Test</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="text-sm">New test added: Python Advanced</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                  <Badge variant="outline">Test</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Tests Tab */}
        <TabsContent value="tests" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl">Manage Tests</h2>
              <p className="text-sm text-muted-foreground">Add, edit, or remove tests</p>
            </div>
            <Button onClick={() => setShowAddTest(!showAddTest)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Test
            </Button>
          </div>

          {showAddTest && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Test Title</Label>
                    <Input id="title" placeholder="e.g., React.js Advanced" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="e.g., React" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Test description..." />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input id="duration" type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questions">Total Questions</Label>
                    <Input id="questions" type="number" placeholder="20" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddTest}>Add Test</Button>
                  <Button variant="outline" onClick={() => setShowAddTest(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell>{test.title}</TableCell>
                      <TableCell>{test.subject}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            test.difficulty === 'Easy'
                              ? 'bg-green-500/10 text-green-500 border-green-500/20'
                              : test.difficulty === 'Medium'
                              ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                              : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }
                        >
                          {test.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{test.totalQuestions}</TableCell>
                      <TableCell>{test.duration} min</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTest(test.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTest(test.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div>
            <h2 className="text-2xl mb-2">Manage Users</h2>
            <p className="text-sm text-muted-foreground">View and manage user accounts</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Tests Attempted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.tests}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h2 className="text-2xl mb-2">Analytics</h2>
            <p className="text-sm text-muted-foreground">Platform performance metrics</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTests.slice(0, 5).map((test, index) => (
                    <div key={test.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {index + 1}
                        </div>
                        <span className="text-sm">{test.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 500)} attempts
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTests.slice(0, 5).map((test) => (
                    <div key={test.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="line-clamp-1">{test.title}</span>
                        <span>{Math.floor(Math.random() * 30 + 60)}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${Math.floor(Math.random() * 30 + 60)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
