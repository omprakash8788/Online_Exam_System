import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Clock, Flag, CheckCircle2 } from 'lucide-react';

export const TestInterfacePage: React.FC = () => {
  const { selectedTest, currentTestQuestions, setCurrentTestQuestions, setCurrentPage, addTestResult } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(selectedTest ? selectedTest.duration * 60 : 0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!selectedTest || currentTestQuestions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No test loaded</p>
      </div>
    );
  }

  const currentQuestion = currentTestQuestions[currentQuestionIndex];
  const totalQuestions = currentTestQuestions.length;
  const answeredCount = currentTestQuestions.filter((q) => q.selectedAnswer !== undefined).length;
  const markedCount = currentTestQuestions.filter((q) => q.markedForReview).length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const updatedQuestions = [...currentTestQuestions];
    updatedQuestions[currentQuestionIndex].selectedAnswer = optionIndex;
    setCurrentTestQuestions(updatedQuestions);
  };

  const handleMarkForReview = () => {
    const updatedQuestions = [...currentTestQuestions];
    updatedQuestions[currentQuestionIndex].markedForReview = !updatedQuestions[currentQuestionIndex].markedForReview;
    setCurrentTestQuestions(updatedQuestions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitTest = () => {
    const correctAnswers = currentTestQuestions.filter(
      (q) => q.selectedAnswer === q.correctAnswer
    ).length;
    const wrongAnswers = currentTestQuestions.filter(
      (q) => q.selectedAnswer !== undefined && q.selectedAnswer !== q.correctAnswer
    ).length;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unattempted = totalQuestions - answeredCount;

    const score =
      correctAnswers * selectedTest.markingScheme.correct +
      wrongAnswers * selectedTest.markingScheme.wrong;
    const maxScore = totalQuestions * selectedTest.markingScheme.correct;
    const percentage = Math.max(0, Math.round((score / maxScore) * 100));

    const result = {
      id: Date.now().toString(),
      testId: selectedTest.id,
      testTitle: selectedTest.title,
      totalQuestions,
      attempted: answeredCount,
      correct: correctAnswers,
      wrong: wrongAnswers,
      score,
      percentage,
      date: new Date().toLocaleDateString(),
    };

    addTestResult(result);
    setCurrentPage('test-result');
  };

  const getQuestionStatus = (index: number) => {
    const question = currentTestQuestions[index];
    if (question.markedForReview) return 'review';
    if (question.selectedAnswer !== undefined) return 'answered';
    return 'unanswered';
  };

  const statusColors = {
    answered: 'bg-green-500 hover:bg-green-600',
    review: 'bg-yellow-500 hover:bg-yellow-600',
    unanswered: 'bg-muted hover:bg-muted/80',
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h2 className="text-lg">{selectedTest.title}</h2>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className={`h-5 w-5 ${timeLeft < 60 ? 'text-red-500' : 'text-muted-foreground'}`} />
              <span className={`text-lg ${timeLeft < 60 ? 'text-red-500' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Button onClick={() => setShowSubmitDialog(true)} variant="default">
              Submit Test
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <Progress value={(answeredCount / totalQuestions) * 100} className="h-1" />
        </div>
      </div>

      <div className="container mx-auto grid gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]">
        {/* Question Panel */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg">
                    Q{currentQuestionIndex + 1}. {currentQuestion.question}
                  </h3>
                  {currentQuestion.markedForReview && (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                      <Flag className="mr-1 h-3 w-3" />
                      Marked
                    </Badge>
                  )}
                </div>

                <RadioGroup
                  value={currentQuestion.selectedAnswer?.toString()}
                  onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors ${
                          currentQuestion.selectedAnswer === index
                            ? 'border-primary bg-primary/5'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex flex-wrap gap-3 border-t pt-6">
                <Button
                  variant="outline"
                  onClick={handleMarkForReview}
                  className={currentQuestion.markedForReview ? 'border-yellow-500' : ''}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  {currentQuestion.markedForReview ? 'Unmark' : 'Mark for Review'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAnswerSelect(-1)}
                  disabled={currentQuestion.selectedAnswer === undefined}
                >
                  Clear Response
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 sm:flex-none"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="flex-1 sm:flex-none bg-black text-white"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4">Question Navigator</h3>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Answered</span>
                  <span>{answeredCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Marked</span>
                  <span>{markedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Not Answered</span>
                  <span>{totalQuestions - answeredCount}</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {currentTestQuestions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      className={`flex h-10 w-10 items-center justify-center rounded-md text-sm transition-colors ${
                        statusColors[status]
                      } ${
                        index === currentQuestionIndex
                          ? 'ring-2 ring-primary ring-offset-2'
                          : ''
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-green-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-yellow-500" />
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-gray-300" />
                  <span>Not Answered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Are you sure you want to submit this test? You cannot make changes after submission.</p>
              <div className="rounded-lg bg-gray-200 p-3 text-sm">
                <div className="flex justify-between">
                  <span>Total Questions:</span>
                  <span>{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <span>{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Not Answered:</span>
                  <span>{totalQuestions - answeredCount}</span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-black cursor-pointer text-white' onClick={handleSubmitTest}>Submit Test</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
