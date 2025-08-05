"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Activity,
  TrendingUp
} from "lucide-react";

// Mock freelancer data
const freelancerData = {
  id: "DEV-001",
  name: "Alex Chen",
  title: "Senior Full Stack Developer",
  avatar: "AC",
  status: "available", // available, on-project, on-leave
  location: "San Francisco, CA",
  email: "alex.chen@buildup.dev",
  phone: "+1 (555) 123-4567",
  joinDate: "2023-01-15",
  rating: 4.9,
  completedProjects: 47,
  totalEarnings: 125000,
  skills: [
    { name: "React", level: 95, category: "frontend" },
    { name: "Node.js", level: 92, category: "backend" },
    { name: "TypeScript", level: 90, category: "language" },
    { name: "Python", level: 88, category: "language" },
    { name: "PostgreSQL", level: 85, category: "database" },
    { name: "AWS", level: 82, category: "cloud" },
    { name: "Docker", level: 80, category: "devops" },
    { name: "GraphQL", level: 78, category: "api" }
  ],
  links: {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    portfolio: "https://alexchen.dev"
  },
  currentProjects: [
    {
      id: "PRJ-2024-001",
      title: "E-commerce Platform Redesign",
      client: "TechCorp Inc.",
      role: "Lead Developer",
      progress: 65,
      dueDate: "2024-03-15",
      budget: 15000
    },
    {
      id: "PRJ-2024-003", 
      title: "Mobile App Development",
      client: "StartupXYZ",
      role: "Full Stack Developer",
      progress: 30,
      dueDate: "2024-04-20",
      budget: 25000
    }
  ],
  recentProjects: [
    {
      id: "PRJ-2023-045",
      title: "Banking Dashboard",
      client: "FinanceBank",
      role: "Frontend Developer",
      completedDate: "2024-01-20",
      rating: 5,
      earnings: 12000,
      duration: "6 weeks"
    },
    {
      id: "PRJ-2023-042",
      title: "SaaS Analytics Platform",
      client: "DataCorp",
      role: "Full Stack Developer", 
      completedDate: "2023-12-15",
      rating: 5,
      earnings: 18000,
      duration: "8 weeks"
    },
    {
      id: "PRJ-2023-038",
      title: "E-learning Platform",
      client: "EduTech Solutions",
      role: "Backend Developer",
      completedDate: "2023-11-10",
      rating: 4.8,
      earnings: 15000,
      duration: "10 weeks"
    }
  ],
  stats: {
    onTimeDelivery: 98,
    clientSatisfaction: 4.9,
    responseTime: "< 2 hours",
    availability: "40 hrs/week"
  }
};

export function FreelancerProfile() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "dev-success";
      case "on-project": return "dev-warning";
      case "on-leave": return "dev-error";
      default: return "dev-text-secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "Available";
      case "on-project": return "On Project";
      case "on-leave": return "On Leave";
      default: return "Unknown";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend": return "dev-accent";
      case "backend": return "dev-success";
      case "language": return "dev-warning";
      case "database": return "dev-error";
      case "cloud": return "text-purple-400";
      case "devops": return "text-orange-400";
      case "api": return "text-pink-400";
      default: return "dev-text-secondary";
    }
  };

  return (
    <div className="min-h-screen dev-surface py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dev-text-primary mb-2">Freelancer Profile</h1>
          <p className="dev-text-secondary">Internal admin view for team management</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="dev-elevated dev-border border">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full dev-elevated flex items-center justify-center dev-border border-2 mb-4">
                    <span className="text-2xl font-bold dev-accent">{freelancerData.avatar}</span>
                  </div>
                  <h2 className="text-xl font-bold dev-text-primary">{freelancerData.name}</h2>
                  <p className="dev-text-secondary mb-3">{freelancerData.title}</p>
                  <Badge className={`${getStatusColor(freelancerData.status)} border-0`}>
                    {getStatusText(freelancerData.status)}
                  </Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 dev-text-secondary">
                    <Mail className="h-4 w-4 dev-accent" />
                    <span>{freelancerData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 dev-text-secondary">
                    <Phone className="h-4 w-4 dev-accent" />
                    <span>{freelancerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 dev-text-secondary">
                    <MapPin className="h-4 w-4 dev-accent" />
                    <span>{freelancerData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 dev-text-secondary">
                    <Calendar className="h-4 w-4 dev-accent" />
                    <span>Joined {new Date(freelancerData.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <Separator className="my-6 dev-border" />

                <div className="space-y-3">
                  <h3 className="font-semibold dev-text-primary">Professional Links</h3>
                  <div className="space-y-2">
                    <a href={freelancerData.links.github} className="flex items-center gap-3 dev-text-secondary hover:dev-accent transition-colors">
                      <Github className="h-4 w-4" />
                      <span>GitHub Profile</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                    <a href={freelancerData.links.linkedin} className="flex items-center gap-3 dev-text-secondary hover:dev-accent transition-colors">
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                    <a href={freelancerData.links.portfolio} className="flex items-center gap-3 dev-text-secondary hover:dev-accent transition-colors">
                      <Code2 className="h-4 w-4" />
                      <span>Portfolio Website</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="dev-elevated dev-border border">
              <CardHeader>
                <CardTitle className="dev-text-primary flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 dev-accent" />
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold dev-accent">{freelancerData.rating}</div>
                    <div className="text-xs dev-text-secondary">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold dev-text-primary">{freelancerData.completedProjects}</div>
                    <div className="text-xs dev-text-secondary">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold dev-success">{freelancerData.stats.onTimeDelivery}%</div>
                    <div className="text-xs dev-text-secondary">On Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold dev-warning">${(freelancerData.totalEarnings / 1000)}K</div>
                    <div className="text-xs dev-text-secondary">Earned</div>
                  </div>
                </div>
                
                <Separator className="dev-border" />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="dev-text-secondary">Response Time</span>
                    <span className="dev-text-primary">{freelancerData.stats.responseTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="dev-text-secondary">Availability</span>
                    <span className="dev-text-primary">{freelancerData.stats.availability}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="dev-text-secondary">Client Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="dev-text-primary">{freelancerData.stats.clientSatisfaction}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skills & Projects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Section */}
            <Card className="dev-elevated dev-border border">
              <CardHeader>
                <CardTitle className="dev-text-primary flex items-center gap-2">
                  <Code2 className="h-5 w-5 dev-accent" />
                  Technical Skills
                </CardTitle>
                <CardDescription className="dev-text-secondary">
                  Proficiency levels and core competencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {freelancerData.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium dev-text-primary">{skill.name}</span>
                          <Badge variant="outline" className={`text-xs ${getCategoryColor(skill.category)}`}>
                            {skill.category}
                          </Badge>
                        </div>
                        <span className="text-sm dev-text-secondary">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Assignments */}
            <Card className="dev-elevated dev-border border">
              <CardHeader>
                <CardTitle className="dev-text-primary flex items-center gap-2">
                  <Activity className="h-5 w-5 dev-accent" />
                  Current Assignments
                </CardTitle>
                <CardDescription className="dev-text-secondary">
                  Active projects and workload
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {freelancerData.currentProjects.map((project) => (
                  <div key={project.id} className="p-4 dev-surface rounded-lg dev-border border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold dev-text-primary">{project.title}</h4>
                        <p className="text-sm dev-text-secondary">{project.client} • {project.role}</p>
                        <p className="text-xs dev-text-secondary dev-code">#{project.id}</p>
                      </div>
                      <Badge variant="outline" className="dev-border dev-text-primary">
                        ${project.budget.toLocaleString()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="dev-text-secondary">Progress</span>
                        <span className="dev-accent">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex justify-between text-xs dev-text-secondary">
                        <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2 dev-text-secondary hover:dev-accent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Project History */}
            <Card className="dev-elevated dev-border border">
              <CardHeader>
                <CardTitle className="dev-text-primary flex items-center gap-2">
                  <Briefcase className="h-5 w-5 dev-accent" />
                  Project History
                </CardTitle>
                <CardDescription className="dev-text-secondary">
                  Recently completed projects and client feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freelancerData.recentProjects.map((project) => (
                    <div key={project.id} className="p-4 dev-surface rounded-lg dev-border border">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold dev-text-primary">{project.title}</h4>
                          <p className="text-sm dev-text-secondary">{project.client} • {project.role}</p>
                          <p className="text-xs dev-text-secondary dev-code">#{project.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold dev-success">${project.earnings.toLocaleString()}</div>
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="dev-text-secondary">{project.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs dev-text-secondary">
                        <span>Completed: {new Date(project.completedDate).toLocaleDateString()}</span>
                        <span>Duration: {project.duration}</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2 dev-text-secondary hover:dev-accent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 dev-border dev-text-primary">
                  View All Projects
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
