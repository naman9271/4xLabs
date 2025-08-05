"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code2, 
  Bug, 
  Palette, 
  Zap, 
  Upload, 
  X,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  Mail,
  Building
} from "lucide-react";

const steps = [
  { id: 1, title: "Project Basics", description: "Define your project type and requirements" },
  { id: 2, title: "Scope & Details", description: "Detailed specifications and timeline" },
  { id: 3, title: "Files & Review", description: "Upload files and review submission" }
];

const serviceTypes = [
  { id: "bug-fixing", label: "Bug Fixing", icon: Bug, color: "dev-error" },
  { id: "web-development", label: "Web Development", icon: Code2, color: "dev-accent" },
  { id: "mobile-development", label: "Mobile Development", icon: Code2, color: "dev-success" },
  { id: "ui-ux-design", label: "UI/UX Design", icon: Palette, color: "dev-warning" },
  { id: "performance-optimization", label: "Performance Optimization", icon: Zap, color: "dev-accent" },
  { id: "database-solutions", label: "Database Solutions", icon: Code2, color: "dev-success" }
];

export function MultiStepProjectForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Project Basics
    projectTitle: "",
    serviceType: "",
    priority: "",
    
    // Step 2: Scope & Details
    description: "",
    budget: "",
    timeline: "",
    deadline: "",
    requirements: "",
    
    // Contact Info
    name: "",
    email: "",
    company: "",
    
    // Step 3: Files
    attachments: [] as File[]
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    updateFormData("attachments", [...formData.attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    updateFormData("attachments", newAttachments);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen dev-surface py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold dev-text-primary mb-4">
            Submit Your Project
          </h1>
          <p className="text-xl dev-text-secondary max-w-2xl mx-auto">
            Let's build something amazing together. Tell us about your project in {steps.length} simple steps.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all dev-code ${
                  currentStep > step.id 
                    ? 'dev-bg-accent border-cyan-500 text-black' 
                    : currentStep === step.id
                    ? 'border-cyan-500 dev-accent bg-transparent'
                    : 'dev-border dev-text-secondary'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="font-bold">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all ${
                    currentStep > step.id ? 'bg-cyan-500' : 'dev-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="dev-text-secondary">Step {currentStep} of {steps.length}</span>
              <span className="dev-accent">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2 dev-elevated" />
          </div>
        </div>

        {/* Form Steps */}
        <Card className="dev-elevated dev-border border">
          <CardHeader>
            <CardTitle className="dev-text-primary flex items-center gap-3">
              <div className="w-8 h-8 rounded-full dev-bg-accent/20 flex items-center justify-center">
                <span className="text-sm font-bold dev-accent">{currentStep}</span>
              </div>
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="dev-text-secondary">
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Project Basics */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium dev-text-primary">
                    Project Title *
                  </label>
                  <Input
                    placeholder="E.g., E-commerce Website Redesign"
                    value={formData.projectTitle}
                    onChange={(e) => updateFormData("projectTitle", e.target.value)}
                    className="dev-elevated dev-border dev-text-primary dev-focus"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium dev-text-primary">
                    Service Type *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {serviceTypes.map((service) => {
                      const Icon = service.icon;
                      const isSelected = formData.serviceType === service.id;
                      
                      return (
                        <div
                          key={service.id}
                          onClick={() => updateFormData("serviceType", service.id)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all dev-interactive ${
                            isSelected 
                              ? 'dev-border ring-2 ring-cyan-500/50 dev-elevated' 
                              : 'dev-border hover:dev-elevated'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`h-6 w-6 ${service.color}`} />
                            <span className="font-medium dev-text-primary">{service.label}</span>
                            {isSelected && <CheckCircle className="h-5 w-5 dev-success ml-auto" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium dev-text-primary">
                    Priority Level *
                  </label>
                  <Select value={formData.priority} onValueChange={(value) => updateFormData("priority", value)}>
                    <SelectTrigger className="dev-elevated dev-border dev-text-primary">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent className="dev-elevated dev-border">
                      <SelectItem value="low" className="dev-text-primary">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Low Priority (2-4 weeks)
                        </div>
                      </SelectItem>
                      <SelectItem value="medium" className="dev-text-primary">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          Medium Priority (1-2 weeks)
                        </div>
                      </SelectItem>
                      <SelectItem value="high" className="dev-text-primary">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          High Priority (3-7 days)
                        </div>
                      </SelectItem>
                      <SelectItem value="urgent" className="dev-text-primary">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          Urgent (24-72 hours)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Scope & Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                      <User className="h-4 w-4 dev-accent" />
                      Full Name *
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      className="dev-elevated dev-border dev-text-primary dev-focus"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                      <Mail className="h-4 w-4 dev-accent" />
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="dev-elevated dev-border dev-text-primary dev-focus"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                      <Building className="h-4 w-4 dev-accent" />
                      Company
                    </label>
                    <Input
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) => updateFormData("company", e.target.value)}
                      className="dev-elevated dev-border dev-text-primary dev-focus"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium dev-text-primary">
                    Project Description *
                  </label>
                  <Textarea
                    placeholder="Describe your project requirements, goals, and any specific features you need. Be as detailed as possible to help us provide an accurate quote."
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className="dev-elevated dev-border dev-text-primary dev-focus min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium dev-text-primary">
                    Technical Requirements
                  </label>
                  <Textarea
                    placeholder="Any specific technologies, frameworks, or technical requirements..."
                    value={formData.requirements}
                    onChange={(e) => updateFormData("requirements", e.target.value)}
                    className="dev-elevated dev-border dev-text-primary dev-focus min-h-[80px]"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                      <DollarSign className="h-4 w-4 dev-accent" />
                      Budget Range
                    </label>
                    <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                      <SelectTrigger className="dev-elevated dev-border dev-text-primary">
                        <SelectValue placeholder="Select budget" />
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                      <Clock className="h-4 w-4 dev-accent" />
                      Timeline
                    </label>
                    <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                      <SelectTrigger className="dev-elevated dev-border dev-text-primary">
                        <SelectValue placeholder="Expected timeline" />
                      </SelectTrigger>
                      <SelectContent className="dev-elevated dev-border">
                        <SelectItem value="1-week" className="dev-text-primary">1 Week</SelectItem>
                        <SelectItem value="2-weeks" className="dev-text-primary">2 Weeks</SelectItem>
                        <SelectItem value="1-month" className="dev-text-primary">1 Month</SelectItem>
                        <SelectItem value="2-months" className="dev-text-primary">2 Months</SelectItem>
                        <SelectItem value="3-months" className="dev-text-primary">3+ Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                      <Calendar className="h-4 w-4 dev-accent" />
                      Deadline
                    </label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => updateFormData("deadline", e.target.value)}
                      className="dev-elevated dev-border dev-text-primary dev-focus"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Files & Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* File Upload */}
                <div className="space-y-4">
                  <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                    <Upload className="h-4 w-4 dev-accent" />
                    Project Files
                  </label>
                  
                  <div className="relative border-2 border-dashed dev-border rounded-lg p-8 text-center hover:dev-elevated transition-all">
                    <Upload className="h-12 w-12 dev-text-secondary mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="dev-text-primary font-medium">Drop files here or click to browse</p>
                      <p className="text-sm dev-text-secondary">
                        Upload mockups, requirements, or any relevant files (PDF, DOC, JPG, PNG, ZIP)
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.figma"
                    />
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium dev-text-primary">Uploaded Files:</p>
                      {formData.attachments.map((file, index) => (
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
                </div>

                {/* Review Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold dev-text-primary">Project Summary</h3>
                  
                  <div className="dev-surface rounded-lg p-6 dev-border border space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm dev-text-secondary">Project Title</span>
                        <p className="font-medium dev-text-primary">{formData.projectTitle || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-sm dev-text-secondary">Service Type</span>
                        <p className="font-medium dev-text-primary">
                          {serviceTypes.find(s => s.id === formData.serviceType)?.label || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm dev-text-secondary">Priority</span>
                        <p className="font-medium dev-text-primary">{formData.priority || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-sm dev-text-secondary">Budget</span>
                        <p className="font-medium dev-text-primary">{formData.budget || "Not specified"}</p>
                      </div>
                    </div>
                    
                    {formData.description && (
                      <div>
                        <span className="text-sm dev-text-secondary">Description</span>
                        <p className="text-sm dev-text-primary mt-1">{formData.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="dev-border dev-text-primary dev-interactive"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && (!formData.projectTitle || !formData.serviceType || !formData.priority)) ||
                (currentStep === 2 && (!formData.name || !formData.email || !formData.description))
              }
              className="dev-bg-accent text-black font-semibold dev-interactive"
            >
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="dev-bg-accent text-black font-semibold dev-interactive"
            >
              Submit Project
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
