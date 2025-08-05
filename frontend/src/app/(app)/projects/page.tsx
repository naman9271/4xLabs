'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  MoreVertical,
} from 'lucide-react';
import { PROJECT_STATUSES, PROJECT_CATEGORIES } from '@/config';

// Mock data - replace with real API calls
const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    description: 'Complete overhaul of existing e-commerce platform with modern tech stack',
    status: 'in_progress',
    category: 'web_development',
    priority: 'high',
    budget: 15000,
    progress: 65,
    client: { name: 'TechCorp Inc.', avatar: null },
    freelancer: { name: 'John Doe', avatar: null },
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-15'),
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Complete redesign of mobile app interface with focus on user experience',
    status: 'review',
    category: 'ui_ux_design',
    priority: 'medium',
    budget: 8500,
    progress: 90,
    client: { name: 'StartupXYZ', avatar: null },
    freelancer: { name: 'Sarah Wilson', avatar: null },
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-28'),
    tags: ['Figma', 'Mobile', 'UX'],
  },
  {
    id: '3',
    title: 'Brand Identity Package',
    description: 'Complete brand identity including logo, colors, and style guide',
    status: 'open',
    category: 'graphic_design',
    priority: 'low',
    budget: 5000,
    progress: 0,
    client: { name: 'LocalBiz', avatar: null },
    freelancer: null,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-30'),
    tags: ['Branding', 'Logo', 'Design'],
  },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getStatusInfo = (status: string) => {
    const statusInfo = PROJECT_STATUSES.find(s => s.value === status);
    return statusInfo || { label: status, color: '#6B7280', bgColor: '#374151' };
  };

  const getCategoryInfo = (category: string) => {
    const categoryInfo = PROJECT_CATEGORIES.find(c => c.value === category);
    return categoryInfo || { label: category, icon: '⚡' };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Projects</h1>
          <p className="text-muted">
            Manage your active and completed projects
          </p>
        </div>
        <Button asChild className="bg-neon-cyan hover:bg-neon-cyan/90 text-cod-gray">
          <Link href="/projects/create">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-mine-shaft border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-cod-gray border-border"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-cod-gray border-border">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-mine-shaft border-border">
                <SelectItem value="all">All Statuses</SelectItem>
                {PROJECT_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-cod-gray border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-mine-shaft border-border">
                <SelectItem value="all">All Categories</SelectItem>
                {PROJECT_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const statusInfo = getStatusInfo(project.status);
          const categoryInfo = getCategoryInfo(project.category);
          
          return (
            <Card key={project.id} className="bg-mine-shaft border-border hover:border-neon-cyan/20 transition-all duration-200 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{categoryInfo.icon}</span>
                    <Badge 
                      variant="outline" 
                      style={{ 
                        backgroundColor: statusInfo.bgColor + '20',
                        color: statusInfo.color,
                        borderColor: statusInfo.color + '40'
                      }}
                    >
                      {statusInfo.label}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardTitle className="text-lg leading-tight">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="hover:text-neon-cyan transition-colors"
                  >
                    {project.title}
                  </Link>
                </CardTitle>
                
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                {project.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">Progress</span>
                      <span className="text-sm text-secondary">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                )}

                {/* Budget */}
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted" />
                  <span className="font-medium text-primary">
                    {formatCurrency(project.budget)}
                  </span>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted" />
                  <span className="text-sm text-secondary">
                    {project.startDate.toLocaleDateString()} - {project.endDate.toLocaleDateString()}
                  </span>
                </div>

                {/* Team */}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted" />
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-secondary">Client:</span>
                    <span className="text-primary">{project.client.name}</span>
                  </div>
                </div>

                {project.freelancer && (
                  <div className="flex items-center gap-2 ml-6">
                    <span className="text-secondary text-sm">Freelancer:</span>
                    <span className="text-primary text-sm">{project.freelancer.name}</span>
                  </div>
                )}

                {/* Tags */}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="bg-mine-shaft border-border">
          <CardContent className="py-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-neon-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-neon-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all' 
                  ? 'No projects found' 
                  : 'No projects yet'
                }
              </h3>
              <p className="text-muted mb-4">
                {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'Try adjusting your search criteria'
                  : 'Create your first project to get started'
                }
              </p>
              {!(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
                <Button asChild className="bg-neon-cyan hover:bg-neon-cyan/90 text-cod-gray">
                  <Link href="/projects/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
