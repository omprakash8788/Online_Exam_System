import React, { useState } from 'react';
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
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate form submission
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-2">Our team is here to help</p>
              <a
                href="mailto:support@mocktest.com"
                className="text-sm text-primary hover:underline"
              >
                support@mocktest.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-2">Mon-Fri from 9am to 6pm</p>
              <a href="tel:+1234567890" className="text-sm text-primary hover:underline">
                +1 (234) 567-890
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2">Office</h3>
              <p className="text-sm text-muted-foreground">
                123 Education Street
                <br />
                San Francisco, CA 94102
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2">Business Hours</h3>
              <p className="text-sm text-muted-foreground">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM PST
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form & Image */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                          className='bg-gray-100'
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                          className='bg-gray-100'
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        className='bg-gray-100'
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleChange('category', value)}
                      >
                        <SelectTrigger className='bg-gray-100'>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className='bg-white border'>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="content">Content Issue</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      className='bg-gray-100'
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-black text-white">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1632854285191-8cea46c1eb7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwc3VwcG9ydCUyMGRlc2t8ZW58MXx8fHwxNzYxOTczMzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Contact support"
                className="h-full w-full object-cover"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2">How quickly will I receive a response?</h3>
                  <p className="text-sm text-muted-foreground">
                    We aim to respond to all inquiries within 24 hours during business days. For
                    urgent technical issues, please call our support line.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2">What information should I include?</h3>
                  <p className="text-sm text-muted-foreground">
                    Please provide as much detail as possible about your question or issue. Include
                    screenshots if relevant and specify the test or feature you're asking about.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2">Do you offer phone support?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Our phone support is available Monday through Friday, 9 AM to 6 PM PST.
                    Call us at +1 (234) 567-890.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Support Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-4">Need Immediate Help?</h2>
            <p className="text-muted-foreground mb-8">
              Check out our comprehensive help center for instant answers to common questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button  className="bg-white" variant="outline" size="lg">
                Visit Help Center
              </Button>
              <Button className="bg-white"  variant="outline" size="lg">
                View FAQs
              </Button>
              <Button className="bg-white"  variant="outline" size="lg">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
