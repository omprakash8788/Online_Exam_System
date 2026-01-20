import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Target, Users, Award, Zap, Heart, Shield } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-4">About MockTest</h1>
            <p className="text-lg text-muted-foreground">
              Empowering students worldwide to achieve their academic goals through
              comprehensive practice tests and personalized learning experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At MockTest, we believe that practice makes perfect. Our mission is to provide
              students with a comprehensive platform to prepare for their exams through realistic
              mock tests that simulate actual exam conditions.
            </p>
            <p className="text-muted-foreground mb-4">
              We're committed to making quality education accessible to everyone, offering a wide
              range of subjects and difficulty levels to match every student's needs. Our platform
              helps you identify your strengths and weaknesses, track your progress, and improve
              your performance over time.
            </p>
            <p className="text-muted-foreground">
              With detailed analytics, instant feedback, and expert-curated content, we ensure that
              every student has the tools they need to succeed.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjE4ODY4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  We strive for excellence in everything we do, from content quality to user
                  experience, ensuring you get the best possible preparation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Quality education should be accessible to all. We offer free tests and affordable
                  premium content to reach students everywhere.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Expert-curated questions that mirror real exam patterns, ensuring you're always
                  practicing with relevant and high-quality content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously improving our platform with new features, advanced analytics, and
                  cutting-edge learning tools.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Student-Focused</h3>
                <p className="text-sm text-muted-foreground">
                  Every decision we make is centered around what's best for our students and their
                  learning journey.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Trust & Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Your data security and privacy are our top priorities. We maintain the highest
                  standards of data protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl mb-4">MockTest by the Numbers</h2>
          <p className="text-muted-foreground">
            Join thousands of successful students who trust us
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl mb-2 text-primary">10,000+</div>
            <p className="text-sm text-muted-foreground">Active Students</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 text-primary">50+</div>
            <p className="text-sm text-muted-foreground">Mock Tests</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 text-primary">100,000+</div>
            <p className="text-sm text-muted-foreground">Tests Taken</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 text-primary">95%</div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl mb-4">Our Story</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              MockTest was founded by a group of educators and technologists who saw the need for a
              better way to prepare for exams. We started with a simple idea: make high-quality test
              preparation accessible to everyone.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  What started as a small project has grown into a comprehensive platform serving
                  thousands of students worldwide. Our team of subject matter experts, software
                  developers, and educators work tirelessly to ensure that every test you take is
                  valuable, every question is relevant, and every feature helps you learn better.
                </p>
                <p className="text-muted-foreground">
                  We're more than just a testing platform—we're your partner in education, committed
                  to helping you achieve your goals and reach your full potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-8">
            Join MockTest today and take the first step towards acing your exams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('signup')}
              className="inline-flex items-center justify-center rounded-md bg-black text-white px-8 py-3 text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started for Free
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
