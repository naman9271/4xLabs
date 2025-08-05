import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Bug, 
  Palette, 
  Zap, 
  Database,
  Smartphone,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Star
} from "lucide-react";

const services = [
  {
    id: "bug-fixing",
    icon: Bug,
    title: "Bug Fixing & Troubleshooting",
    description: "Fast resolution of software bugs and technical issues",
    color: "dev-error",
    price: "Starting at $50",
    turnaround: "24-72 hours",
    features: [
      "Critical bug fixes",
      "Performance issues",
      "Security vulnerabilities", 
      "Code debugging",
      "System diagnostics",
      "Error tracking"
    ],
    technologies: ["JavaScript", "Python", "PHP", "Java", "C#", "Ruby"],
    caseStudy: {
      title: "E-commerce Site Performance Fix",
      description: "Reduced page load time by 80% and fixed checkout process bugs",
      result: "Increased conversion rate by 35%"
    }
  },
  {
    id: "web-development", 
    icon: Globe,
    title: "Web Development",
    description: "Full-stack web applications and websites",
    color: "dev-accent",
    price: "Starting at $500",
    turnaround: "1-4 weeks",
    features: [
      "Custom web applications",
      "Responsive design",
      "API development",
      "Database design",
      "CMS integration",
      "E-commerce solutions"
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB"],
    caseStudy: {
      title: "SaaS Platform Development",
      description: "Built a complete customer management platform from scratch",
      result: "Launched successfully with 1000+ users in first month"
    }
  },
  {
    id: "mobile-development",
    icon: Smartphone, 
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
    color: "dev-success",
    price: "Starting at $1000",
    turnaround: "2-6 weeks",
    features: [
      "iOS & Android apps",
      "Cross-platform solutions",
      "App Store optimization",
      "Push notifications",
      "Offline functionality",
      "App maintenance"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS"],
    caseStudy: {
      title: "Fitness Tracking App",
      description: "Developed a comprehensive fitness app with social features",
      result: "50K+ downloads and 4.8-star rating"
    }
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design and brand identity",
    color: "dev-warning", 
    price: "Starting at $300",
    turnaround: "3-10 days",
    features: [
      "UI/UX design",
      "Wireframing & prototyping",
      "Brand identity",
      "Design systems",
      "User research",
      "Accessibility design"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Framer"],
    caseStudy: {
      title: "Healthcare App Redesign",
      description: "Redesigned user interface for better patient experience",
      result: "40% increase in user engagement"
    }
  },
  {
    id: "performance-optimization",
    icon: Zap,
    title: "Performance Optimization", 
    description: "Speed up your applications and websites",
    color: "dev-accent",
    price: "Starting at $200",
    turnaround: "3-7 days",
    features: [
      "Site speed optimization",
      "Database optimization",
      "Code refactoring", 
      "CDN setup",
      "Caching strategies",
      "Monitoring setup"
    ],
    technologies: ["Redis", "CloudFlare", "AWS", "Webpack", "Lighthouse", "New Relic"],
    caseStudy: {
      title: "Enterprise App Optimization",
      description: "Optimized legacy system for better performance",
      result: "75% faster load times and reduced server costs"
    }
  },
  {
    id: "database-solutions",
    icon: Database,
    title: "Database Solutions",
    description: "Database design, optimization and migration",
    color: "dev-success",
    price: "Starting at $400", 
    turnaround: "1-3 weeks",
    features: [
      "Database design",
      "Data migration",
      "Query optimization",
      "Backup solutions",
      "Security hardening",
      "Performance tuning"
    ],
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "AWS RDS"],
    caseStudy: {
      title: "Data Migration Project",
      description: "Migrated legacy database to modern cloud solution",
      result: "Zero downtime migration with 50% cost reduction"
    }
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen dev-surface">
      {/* Hero Section */}
      <section className="py-20 dev-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="dev-bg-accent/10 dev-accent border-0 mb-6">
              Professional Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold dev-text-primary mb-6">
              Our <span className="dev-accent">Services</span>
            </h1>
            <p className="text-xl dev-text-secondary max-w-3xl mx-auto">
              From quick fixes to complex solutions, we provide comprehensive tech services 
              to help your business grow and succeed in the digital world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold dev-text-primary mb-2">500+</div>
              <div className="dev-text-secondary">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold dev-text-primary mb-2">98%</div>
              <div className="dev-text-secondary">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold dev-text-primary mb-2">24/7</div>
              <div className="dev-text-secondary">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold dev-text-primary mb-2">48h</div>
              <div className="dev-text-secondary">Average Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isReverse = index % 2 === 1;
              
              return (
                <div key={service.id} className={`grid lg:grid-cols-2 gap-12 items-center ${isReverse ? 'lg:grid-cols-2' : ''}`}>
                  <div className={`space-y-6 ${isReverse ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 dev-elevated rounded-lg dev-border border">
                        <Icon className={`h-8 w-8 ${service.color}`} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold dev-text-primary">{service.title}</h2>
                        <p className="dev-text-secondary">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Badge variant="outline" className="dev-border dev-text-primary">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.turnaround}
                      </Badge>
                      <Badge variant="outline" className="dev-border dev-success">
                        {service.price}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold dev-text-primary">What's Included:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 dev-success flex-shrink-0" />
                            <span className="text-sm dev-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold dev-text-primary">Technologies:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="dev-elevated dev-text-secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="dev-bg-accent text-black font-semibold dev-interactive">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className={`${isReverse ? 'lg:order-1' : ''}`}>
                    <Card className="dev-elevated dev-border border">
                      <CardHeader>
                        <CardTitle className="dev-text-primary flex items-center gap-2">
                          <Star className="h-5 w-5 dev-warning" />
                          Case Study
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <h3 className="font-semibold dev-text-primary">{service.caseStudy.title}</h3>
                        <p className="dev-text-secondary">{service.caseStudy.description}</p>
                        <div className="p-4 dev-surface rounded-lg dev-border border">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-4 w-4 dev-success" />
                            <span className="text-sm font-medium dev-text-primary">Result</span>
                          </div>
                          <p className="text-sm dev-success">{service.caseStudy.result}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 dev-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dev-text-primary mb-4">
              Our Process
            </h2>
            <p className="text-xl dev-text-secondary max-w-2xl mx-auto">
              A streamlined approach to deliver exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We discuss your requirements and provide initial assessment"
              },
              {
                step: "02", 
                title: "Planning",
                description: "Detailed project planning with timeline and milestones"
              },
              {
                step: "03",
                title: "Development",
                description: "Implementation with regular updates and progress reports"
              },
              {
                step: "04",
                title: "Delivery",
                description: "Final testing, deployment, and ongoing support"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 dev-elevated rounded-full flex items-center justify-center dev-border border">
                  <span className="text-xl font-bold dev-accent">{process.step}</span>
                </div>
                <h3 className="text-lg font-semibold dev-text-primary mb-2">{process.title}</h3>
                <p className="dev-text-secondary text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold dev-text-primary mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl dev-text-secondary mb-8">
            Get a free consultation and custom quote for your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="dev-bg-accent text-black font-semibold px-8 py-6 text-lg dev-interactive">
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="dev-border dev-text-primary px-8 py-6 text-lg dev-interactive">
              Schedule Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
