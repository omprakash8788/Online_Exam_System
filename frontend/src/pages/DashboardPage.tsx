import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { mockTests } from '../data/mockData';
import {
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  BarChart3,
  ChevronRight,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, testResults, setCurrentPage, setSelectedTest } = useApp();

  const totalAttempted = testResults.length;
  const averageScore = testResults.length > 0
    ? Math.round(testResults.reduce((acc, r) => acc + r.percentage, 0) / testResults.length)
    : 0;

  const recentTests = testResults.slice(0, 5);
  const recommendedTests = mockTests.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Track your progress and continue your learning journey</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Tests</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalAttempted}</div>
            <p className="text-xs text-muted-foreground">Tests attempted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalAttempted * 30}</div>
            <p className="text-xs text-muted-foreground">Minutes practicing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Best Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {testResults.length > 0 ? Math.max(...testResults.map((r) => r.percentage)) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Highest achievement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Test Results */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Test Results</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentPage('results')}>
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {recentTests.length > 0 ? (
                <div className="space-y-4">
                  {recentTests.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p>{result.testTitle}</p>
                        <p className="text-xs text-muted-foreground">{result.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg">{result.percentage}%</div>
                        <p className="text-xs text-muted-foreground">
                          {result.correct}/{result.totalQuestions}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No tests attempted yet</p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => setCurrentPage('all-tests')}
                  >
                    Start your first test
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommended Tests */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedTests.map((test) => (
                  <div key={test?._id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-2">
                      <p className="line-clamp-1">{test.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{test.duration} min</span>
                        <span>•</span>
                        <span>{test.totalQuestions} questions</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedTest(test);
                          setCurrentPage('test-instructions');
                        }}
                      >
                        Start Test
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Progress Section */}
      {totalAttempted > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Completion</span>
                  <span>{Math.min(Math.round((totalAttempted / mockTests.length) * 100), 100)}%</span>
                </div>
                <Progress value={Math.min((totalAttempted / mockTests.length) * 100, 100)} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Average Performance</span>
                  <span>{averageScore}%</span>
                </div>
                <Progress value={averageScore} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
