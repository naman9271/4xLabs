import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Bug, 
  Palette, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Users,
  Clock,
  Shield
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen dev-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/10 via-transparent to-[#01C16A]/10" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#22D3EE]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#01C16A]/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="dev-bg-accent/10 dev-accent border-0 mb-6">
              Professional Tech Solutions
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold dev-text-primary mb-6 leading-tight">
              Build Your
              <span className="block dev-accent">Digital Vision</span>
            </h1>
            
            <p className="text-xl md:text-2xl dev-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect with expert developers for bug fixes, software development, design work, 
              and comprehensive tech solutions. Get custom quotes and track your project progress.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="dev-bg-accent text-black font-semibold px-8 py-6 text-lg dev-interactive">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="dev-border dev-text-primary px-8 py-6 text-lg dev-interactive">
                View Portfolio
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 dev-text-secondary text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 dev-success" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 dev-success" />
                <span>Expert Developers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 dev-success" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 dev-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dev-text-primary mb-4">
              Our Services
            </h2>
            <p className="text-xl dev-text-secondary max-w-2xl mx-auto">
              From quick fixes to complex solutions, we've got your tech needs covered
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Bug,
                title: "Bug Fixing",
                description: "Quick resolution of software bugs and issues",
                color: "dev-error"
              },
              {
                icon: Code2,
                title: "Development",
                description: "Full-stack web and mobile application development",
                color: "dev-accent"
              },
              {
                icon: Palette,
                title: "Design",
                description: "UI/UX design and brand identity creation",
                color: "dev-warning"
              },
              {
                icon: Zap,
                title: "Optimization",
                description: "Performance tuning and system optimization",
                color: "dev-success"
              }
            ].map((service, index) => (
              <Card key={index} className="dev-elevated dev-border border dev-interactive group">
                <CardHeader>
                  <service.icon className={`h-12 w-12 ${service.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <CardTitle className="dev-text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="dev-text-secondary">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "500+", label: "Happy Clients" },
              { icon: CheckCircle, value: "1000+", label: "Projects Completed" },
              { icon: Clock, value: "24/7", label: "Support Available" },
              { icon: Star, value: "4.9/5", label: "Client Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 dev-accent mx-auto mb-4" />
                <div className="text-3xl font-bold dev-text-primary mb-2">{stat.value}</div>
                <div className="dev-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 dev-elevated">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold dev-text-primary mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl dev-text-secondary mb-8">
            Join hundreds of satisfied clients who trust us with their tech projects
          </p>
          <Button size="lg" className="dev-bg-accent text-black font-semibold px-12 py-6 text-lg dev-interactive">
            Get Your Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
