'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap, 
  Shield, 
  Clock,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect authenticated users to dashboard
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-cyan"></div>
      </div>
    );
  }

  // Show landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-cod-gray via-mine-shaft to-cod-gray">
      {/* Hero Section */}
      <section className="relative px-6 py-24 mx-auto max-w-7xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            ✨ Professional Freelance Agency Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-cyan to-electric-blue bg-clip-text text-transparent">
            FreelanceHub
          </h1>
          
          <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto">
            Your premier destination for exceptional digital solutions. 
            Connect with expert freelancers and bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push('/register')}
              size="lg" 
              className="bg-neon-cyan hover:bg-neon-cyan/90 text-cod-gray font-semibold"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => router.push('/login')}
              variant="outline" 
              size="lg"
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-cod-gray"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <Card className="bg-mine-shaft border-border hover:border-neon-cyan/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-neon-cyan/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-neon-cyan" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Get your projects delivered with exceptional speed and quality
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-mine-shaft border-border hover:border-neon-cyan/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-electric-blue/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-electric-blue" />
              </div>
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Your projects and data are protected with enterprise-grade security
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-mine-shaft border-border hover:border-neon-cyan/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-neon-green/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-neon-green" />
              </div>
              <CardTitle>Expert Quality</CardTitle>
              <CardDescription>
                Work with top-tier professionals who deliver exceptional results
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-mine-shaft/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-neon-cyan mb-2">500+</div>
              <div className="text-muted">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-electric-blue mb-2">150+</div>
              <div className="text-muted">Expert Freelancers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">98%</div>
              <div className="text-muted">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-neon-pink mb-2">24/7</div>
              <div className="text-muted">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Web Development",
                description: "Modern, responsive websites and web applications",
                icon: "🌐",
                features: ["React/Next.js", "Full-stack development", "E-commerce", "API integration"]
              },
              {
                title: "Mobile Apps",
                description: "Native and cross-platform mobile applications",
                icon: "📱",
                features: ["iOS & Android", "React Native", "Flutter", "App Store deployment"]
              },
              {
                title: "UI/UX Design",
                description: "Beautiful, intuitive user experiences",
                icon: "🎨",
                features: ["User research", "Wireframing", "Prototyping", "Design systems"]
              },
              {
                title: "Digital Marketing",
                description: "Grow your online presence and reach",
                icon: "📈",
                features: ["SEO optimization", "Social media", "Content strategy", "Analytics"]
              },
              {
                title: "DevOps & Cloud",
                description: "Scalable infrastructure and deployment",
                icon: "☁️",
                features: ["AWS/Azure/GCP", "CI/CD pipelines", "Docker", "Monitoring"]
              },
              {
                title: "Consulting",
                description: "Strategic guidance for your tech initiatives",
                icon: "💡",
                features: ["Architecture review", "Tech strategy", "Code audits", "Team mentoring"]
              }
            ].map((service, index) => (
              <Card key={index} className="bg-mine-shaft border-border hover:border-neon-cyan/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted">
                        <CheckCircle className="h-4 w-4 text-neon-green mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-neon-cyan/10 to-electric-blue/10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-muted mb-8">
            Join thousands of satisfied clients who trust FreelanceHub for their digital needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push('/register')}
              size="lg" 
              className="bg-neon-cyan hover:bg-neon-cyan/90 text-cod-gray font-semibold"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => router.push('/projects')}
              variant="outline" 
              size="lg"
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-cod-gray"
            >
              Browse Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
