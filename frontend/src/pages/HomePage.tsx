import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { TestCard } from '../components/TestCard';
import { mockTests, mockTestimonials } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Star, BookOpen, Users, Trophy, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedTest, user } = useApp();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStartTest = (test: any) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    setSelectedTest(test);
    setCurrentPage('test-instructions');
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              Practice. Improve. Succeed.
            </h1>
            <p className="text-lg text-muted-foreground">
              Master your skills with our comprehensive mock test platform. Track your progress,
              identify weak areas, and excel in your exams.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button  className="bg-black text-white" size="lg" onClick={() => setCurrentPage('all-tests')}>
                Start Practice Test
              </Button>
              <Button size="lg" variant="outline" onClick={() => setCurrentPage('all-tests')}>
                View All Tests
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl">10K+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl">50+</div>
                  <div className="text-sm text-muted-foreground">Mock Tests</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1661877854265-48a976379af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYxOTA5OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student studying"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tests Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl">Popular Mock Tests</h2>
              <p className="text-muted-foreground mt-2">
                Start practicing with our most popular tests
              </p>
            </div>
            <Button className='bg-white' variant="outline" onClick={() => setCurrentPage('all-tests')}>
              View All
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTests.slice(0, 3).map((test) => (
              <TestCard
                key={test.id}
                {...test}
                onStart={() => handleStartTest(test)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl">Why Choose MockTest?</h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to prepare for your exams
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2">Comprehensive Tests</h3>
              <p className="text-sm text-muted-foreground">
                Wide range of subjects and difficulty levels to match your needs
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your improvement with detailed analytics and insights
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                Get immediate feedback with detailed explanations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2">Quality Content</h3>
              <p className="text-sm text-muted-foreground">
                Expert-curated questions that mirror real exam patterns
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl">What Our Students Say</h2>
            <p className="text-muted-foreground mt-2">
              Join thousands of successful students
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-black" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm">{testimonial.content}</p>
                  <div>
                    <div>{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12 space-y-4">
              <h2 className="text-3xl">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground">
                Join MockTest today and take the first step towards acing your exams. Sign up now
                and get access to all our free tests!
              </p>
              <Button className='bg-black text-white cursor-pointer' size="lg" onClick={() => setCurrentPage('signup')}>
                Sign Up for Free
              </Button>
            </div>
            <div className="h-full min-h-[300px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691737138-7b9b1884b1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBzdWNjZXNzJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYxOTcyNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Success celebration"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
