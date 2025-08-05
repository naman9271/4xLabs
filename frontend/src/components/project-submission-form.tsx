"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  Bug, 
  Palette, 
  Zap, 
  Upload, 
  X,
  Calendar,
  DollarSign,
  User,
  Mail,
  FileText,
  Clock
} from "lucide-react";

const serviceTypes = [
  { id: "bug-fixing", label: "Bug Fixing", icon: Bug, color: "dev-error", description: "Fix issues in existing code" },
  { id: "development", label: "Development", icon: Code2, color: "dev-accent", description: "Build new features or applications" },
  { id: "design", label: "Design", icon: Palette, color: "dev-warning", description: "UI/UX design and branding" },
  { id: "optimization", label: "Optimization", icon: Zap, color: "dev-success", description: "Performance improvements" }
];

const urgencyLevels = [
  { value: "low", label: "Low Priority", color: "dev-text-secondary", description: "2-4 weeks" },
  { value: "medium", label: "Medium Priority", color: "dev-warning", description: "1-2 weeks" },
  { value: "high", label: "High Priority", color: "dev-error", description: "3-7 days" },
  { value: "urgent", label: "Urgent", color: "dev-error", description: "24-72 hours" }
];

export function ProjectSubmissionForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectTitle: "",
    description: "",
    urgency: "",
    budget: "",
    deadline: ""
  });

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { formData, selectedServices, attachments });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold dev-text-primary mb-4">
          Submit Your Project
        </h1>
        <p className="text-xl dev-text-secondary max-w-2xl mx-auto">
          Tell us about your project and get a custom quote from our expert developers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <Card className="dev-elevated dev-border border">
          <CardHeader>
            <CardTitle className="dev-text-primary flex items-center gap-2">
              <User className="h-5 w-5 dev-accent" />
              Contact Information
            </CardTitle>
            <CardDescription className="dev-text-secondary">
              Let us know how to reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium dev-text-primary">
                  Full Name *
                </label>
                <Input
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="dev-elevated dev-border dev-text-primary dev-focus"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium dev-text-primary">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="dev-elevated dev-border dev-text-primary dev-focus"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium dev-text-primary">
                Company/Organization
              </label>
              <Input
                placeholder="Acme Inc."
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="dev-elevated dev-border dev-text-primary dev-focus"
              />
            </div>
          </CardContent>
        </Card>

        {/* Service Selection */}
        <Card className="dev-elevated dev-border border">
          <CardHeader>
            <CardTitle className="dev-text-primary flex items-center gap-2">
              <Code2 className="h-5 w-5 dev-accent" />
              Service Selection
            </CardTitle>
            <CardDescription className="dev-text-secondary">
              Choose the services you need (select multiple)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {serviceTypes.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedServices.includes(service.id);
                
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all dev-interactive ${
                      isSelected 
                        ? 'dev-border ring-2 ring-cyan-500/50 dev-elevated' 
                        : 'dev-border hover:dev-elevated'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-6 w-6 ${service.color} mt-0.5`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold dev-text-primary">{service.label}</h3>
                          {isSelected && <Badge className="dev-bg-accent text-black">Selected</Badge>}
                        </div>
                        <p className="text-sm dev-text-secondary mt-1">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <Card className="dev-elevated dev-border border">
          <CardHeader>
            <CardTitle className="dev-text-primary flex items-center gap-2">
              <FileText className="h-5 w-5 dev-accent" />
              Project Details
            </CardTitle>
            <CardDescription className="dev-text-secondary">
              Describe your project requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium dev-text-primary">
                Project Title *
              </label>
              <Input
                placeholder="E-commerce Website Redesign"
                value={formData.projectTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                className="dev-elevated dev-border dev-text-primary dev-focus"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium dev-text-primary">
                Project Description *
              </label>
              <Textarea
                placeholder="Describe your project requirements, goals, and any specific features you need..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="dev-elevated dev-border dev-text-primary dev-focus min-h-[120px]"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium dev-text-primary">
                  Priority Level *
                </label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger className="dev-elevated dev-border dev-text-primary">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="dev-elevated dev-border">
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value} className="dev-text-primary">
                        <div className="flex items-center justify-between w-full">
                          <span>{level.label}</span>
                          <span className="text-sm dev-text-secondary ml-2">({level.description})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dev-text-primary">
                  Budget Range
                </label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                >
                  <SelectTrigger className="dev-elevated dev-border dev-text-primary">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="dev-elevated dev-border">
                    <SelectItem value="under-1k" className="dev-text-primary">Under $1,000</SelectItem>
                    <SelectItem value="1k-5k" className="dev-text-primary">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5k-10k" className="dev-text-primary">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10k-25k" className="dev-text-primary">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-plus" className="dev-text-primary">$25,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium dev-text-primary">
                Preferred Deadline
              </label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="dev-elevated dev-border dev-text-primary dev-focus"
              />
            </div>
          </CardContent>
        </Card>

        {/* File Attachments */}
        <Card className="dev-elevated dev-border border">
          <CardHeader>
            <CardTitle className="dev-text-primary flex items-center gap-2">
              <Upload className="h-5 w-5 dev-accent" />
              Attachments
            </CardTitle>
            <CardDescription className="dev-text-secondary">
              Upload any relevant files, mockups, or documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed dev-border rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 dev-text-secondary mx-auto mb-4" />
              <div className="space-y-2">
                <p className="dev-text-primary font-medium">Drop files here or click to browse</p>
                <p className="text-sm dev-text-secondary">
                  Supported formats: PDF, DOC, JPG, PNG, ZIP (max 10MB each)
                </p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
              />
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium dev-text-primary">Uploaded Files:</p>
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 dev-elevated rounded-lg dev-border border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 dev-text-secondary" />
                      <span className="text-sm dev-text-primary">{file.name}</span>
                      <span className="text-xs dev-text-secondary">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="h-8 w-8 p-0 dev-text-secondary hover:dev-error"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            className="dev-bg-accent text-black font-semibold px-12 py-6 text-lg dev-interactive"
            disabled={!formData.name || !formData.email || !formData.projectTitle || !formData.description || selectedServices.length === 0}
          >
            Submit Project Request
          </Button>
        </div>
      </form>
    </div>
  );
}
