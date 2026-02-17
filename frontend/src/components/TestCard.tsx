import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, FileQuestion, Award } from 'lucide-react';

interface TestCardProps {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  totalQuestions: number;
  isPaid: boolean;
  onStart: () => void;
}

export const TestCard: React.FC<TestCardProps> = ({
  title,
  description,
  difficulty,
  duration,
  totalQuestions,
  isPaid,
  onStart,
}) => {
  const difficultyColors = {
    Easy: 'bg-green-white text-green-500 border-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Hard: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <Card className="flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <Badge variant="outline" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <FileQuestion className="h-4 w-4" />
            <span>{totalQuestions} questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>+4/-1</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={onStart} className="flex-1 bg-black text-white">
          Start Test
        </Button>
        {isPaid && (
          <Badge variant="secondary" className="bg-gray-100 text-primary">
            Pro
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
