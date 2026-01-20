import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  Circle,
  Trophy,
  TrendingUp,
  RotateCcw,
  Home,
} from 'lucide-react';

export const TestResultPage: React.FC = () => {
  const { testResults, selectedTest, currentTestQuestions, setCurrentPage, setSelectedTest } = useApp();

  if (testResults.length === 0 || !selectedTest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No results available</p>
      </div>
    );
  }

  const latestResult = testResults[0];

  const handleRetake = () => {
    setCurrentPage('test-instructions');
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { label: 'Excellent', color: 'text-green-500' };
    if (percentage >= 60) return { label: 'Good', color: 'text-blue-500' };
    if (percentage >= 40) return { label: 'Average', color: 'text-yellow-500' };
    return { label: 'Needs Improvement', color: 'text-red-500' };
  };

  const performance = getPerformanceLevel(latestResult.percentage);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Success Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Trophy className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl mb-2">Test Completed!</h1>
        <p className="text-muted-foreground">Here's how you performed</p>
      </div>

      {/* Score Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="mb-6 text-center">
            <div className={`text-6xl mb-2 ${performance.color}`}>
              {latestResult.percentage}%
            </div>
            <div className="text-lg text-muted-foreground mb-4">{performance.label}</div>
            <Progress value={latestResult.percentage} className="h-3" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <Circle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-2xl mb-1">{latestResult.totalQuestions}</div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </div>

            <div className="rounded-lg border p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl mb-1">{latestResult.attempted}</div>
              <p className="text-sm text-muted-foreground">Attempted</p>
            </div>

            <div className="rounded-lg border p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl mb-1">{latestResult.correct}</div>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>

            <div className="rounded-lg border p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="text-2xl mb-1">{latestResult.wrong}</div>
              <p className="text-sm text-muted-foreground">Wrong</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Breakdown */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Correct Answers</span>
                <span className="text-green-500">
                  +{latestResult.correct * (selectedTest.markingScheme?.correct || 4)}
                </span>
              </div>
              <Progress
                value={(latestResult.correct / latestResult.totalQuestions) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Wrong Answers</span>
                <span className="text-red-500">
                  {latestResult.wrong * (selectedTest.markingScheme?.wrong || -1)}
                </span>
              </div>
              <Progress
                value={(latestResult.wrong / latestResult.totalQuestions) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Unattempted</span>
                <span className="text-muted-foreground">
                  {latestResult.totalQuestions - latestResult.attempted}
                </span>
              </div>
              <Progress
                value={
                  ((latestResult.totalQuestions - latestResult.attempted) /
                    latestResult.totalQuestions) *
                  100
                }
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">Accuracy Rate</span>
              <span>
                {latestResult.attempted > 0
                  ? Math.round((latestResult.correct / latestResult.attempted) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">Attempt Rate</span>
              <span>
                {Math.round((latestResult.attempted / latestResult.totalQuestions) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">Final Score</span>
              <Badge variant="secondary" className="text-base">
                {latestResult.score} / {latestResult.totalQuestions * (selectedTest.markingScheme?.correct || 4)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question-wise Analysis */}
      {currentTestQuestions.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Question-wise Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentTestQuestions.map((question, index) => {
                const isCorrect = question.selectedAnswer === question.correctAnswer;
                const isAttempted = question.selectedAnswer !== undefined;

                return (
                  <div
                    key={question.id}
                    className="flex items-start gap-3 rounded-lg border p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm">{question.question}</p>
                      <div className="flex flex-wrap gap-2">
                        {isAttempted ? (
                          <>
                            <Badge
                              variant="outline"
                              className={
                                isCorrect
                                  ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                  : 'bg-red-500/10 text-red-500 border-red-500/20'
                              }
                            >
                              {isCorrect ? 'Correct' : 'Wrong'}
                            </Badge>
                            {!isCorrect && (
                              <>
                                <Badge variant="outline">
                                  Your Answer: {question.options[question.selectedAnswer]}
                                </Badge>
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                  Correct: {question.options[question.correctAnswer]}
                                </Badge>
                              </>
                            )}
                          </>
                        ) : (
                          <Badge variant="outline" className="bg-muted">
                            Not Attempted
                          </Badge>
                        )}
                      </div>
                    </div>
                    {isAttempted && (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button className='bg-black text-white' size="lg" onClick={handleRetake}>
          <RotateCcw className="mr-2 h-5 w-5" />
          Retake Test
        </Button>
        <Button size="lg" variant="outline" onClick={() => setCurrentPage('dashboard')}>
          <Home className="mr-2 h-5 w-5" />
          Go to Dashboard
        </Button>
        <Button size="lg" variant="outline" onClick={() => setCurrentPage('all-tests')}>
          Browse More Tests
        </Button>
      </div>
    </div>
  );
};
