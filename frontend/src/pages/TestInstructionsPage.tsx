/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
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
// import { mockQuestions } from '../data/mockData';
import {
  Clock,
  FileQuestion,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { Badge } from '../components/ui/badge';

export const TestInstructionsPage: React.FC = () => {
  const { selectedTest, setCurrentPage, setCurrentTestQuestions, mockQuestions} = useApp();
  const [showDialog, setShowDialog] = useState(false);
  // const [mockQuestions, setMockQuestions]=useState([]);
 console.log(mockQuestions)
  // /api/questions


  if (!selectedTest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No test selected</p>
      </div>
    );
  }


  const handleStartTest = () => {
    // Load questions for the test
    const questions = mockQuestions
   setCurrentTestQuestions(questions.map((q: any) => ({ ...q })));
    setCurrentPage('test-interface');
  };

  const difficultyColors = {
    Easy: 'bg-green-500/10 text-green-500 border-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Hard: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Test Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl mb-2">{selectedTest.title}</h1>
            <p className="text-muted-foreground">{selectedTest.description}</p>
          </div>
          <Badge variant="outline" className={difficultyColors[selectedTest.difficulty]}>
            {selectedTest.difficulty}
          </Badge>
        </div>
      </div>

      {/* Test Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-300">
              <FileQuestion className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl">{selectedTest.totalQuestions}</div>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-300">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl">{selectedTest.duration}</div>
              <p className="text-xs text-muted-foreground">Minutes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl">+{selectedTest.markingScheme.correct}</div>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <div className="text-2xl">{selectedTest.markingScheme.wrong}</div>
              <p className="text-xs text-muted-foreground">Wrong</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">
                1
              </div>
              <p className="text-sm">
                This test contains <strong>{selectedTest.totalQuestions} questions</strong> and must be completed within{' '}
                <strong>{selectedTest.duration} minutes</strong>.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">
                2
              </div>
              <p className="text-sm">
                Each correct answer awards <strong>+{selectedTest.markingScheme.correct} marks</strong>, while each
                incorrect answer deducts <strong>{selectedTest.markingScheme.wrong} mark(s)</strong>.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">
                3
              </div>
              <p className="text-sm">
                You can navigate between questions using the <strong>Next</strong> and <strong>Previous</strong> buttons,
                or by clicking on question numbers.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">
                4
              </div>
              <p className="text-sm">
                Use the <strong>Mark for Review</strong> option to flag questions you want to revisit later.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">
                5
              </div>
              <p className="text-sm">
                Once you submit the test, you cannot make any changes. Make sure to review your answers before
                submitting.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
            <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-yellow-500 mb-1">Important Note:</p>
              <p className="text-muted-foreground">
                The timer will start as soon as you click "Start Test". Please ensure you have a stable internet
                connection and are ready to begin before starting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button size="lg" onClick={() => setShowDialog(true)} className="flex-1 bg-black text-white sm:flex-none">
          Start Test
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setCurrentPage('all-tests')}
          className="flex-1 sm:flex-none"
        >
          Go Back
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready to start?</AlertDialogTitle>
            <AlertDialogDescription>
              The timer will start immediately. Make sure you're ready before proceeding. You have{' '}
              {selectedTest.duration} minutes to complete {selectedTest.totalQuestions} questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-black text-white' onClick={handleStartTest}>Start Test</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
