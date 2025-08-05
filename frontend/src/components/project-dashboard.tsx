"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code2, 
  Bug, 
  Calendar,
  Clock,
  DollarSign,
  Users,
  MessageSquare,
  FileText,
  Settings,
  MoreHorizontal,
  Filter,
  Search,
  Plus,
  ArrowRight,
  GitBranch,
  Activity,
  CheckCircle,
  AlertCircle,
  Circle,
  Play,
  Pause,
  Eye,
  Download,
  Upload,
  Send
} from "lucide-react";

// Mock data for demonstration
const projectData = {
  id: "PRJ-2024-001",
  title: "E-commerce Platform Redesign",
  status: "In Progress",
  priority: "High",
  completion: 65,
  budget: { allocated: 15000, spent: 9750 },
  timeline: {
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    daysRemaining: 28
  },
  team: [
    { id: 1, name: "Alex Chen", role: "Full Stack Developer", avatar: "AC", status: "online" },
    { id: 2, name: "Sarah Kim", role: "UI/UX Designer", avatar: "SK", status: "away" },
    { id: 3, name: "Mike Rodriguez", role: "Project Manager", avatar: "MR", status: "online" }
  ]
};

const tasks = [
  {
    id: "TASK-001",
    title: "User Authentication System",
    description: "Implement OAuth2 authentication with social login options",
    status: "done",
    priority: "high",
    assignee: "Alex Chen",
    dueDate: "2024-02-10",
    labels: ["backend", "security"],
    comments: 5,
    attachments: 3
  },
  {
    id: "TASK-002", 
    title: "Product Catalog UI",
    description: "Design and implement responsive product browsing interface",
    status: "in-progress",
    priority: "high",
    assignee: "Sarah Kim",
    dueDate: "2024-02-15",
    labels: ["frontend", "design"],
    comments: 8,
    attachments: 12
  },
  {
    id: "TASK-003",
    title: "Payment Gateway Integration",
    description: "Integrate Stripe and PayPal payment processing",
    status: "in-progress", 
    priority: "medium",
    assignee: "Alex Chen",
    dueDate: "2024-02-20",
    labels: ["backend", "payment"],
    comments: 3,
    attachments: 1
  },
  {
    id: "TASK-004",
    title: "Mobile Responsiveness",
    description: "Ensure all pages work perfectly on mobile devices",
    status: "todo",
    priority: "medium",
    assignee: "Sarah Kim",
    dueDate: "2024-02-25",
    labels: ["frontend", "mobile"],
    comments: 2,
    attachments: 0
  },
  {
    id: "TASK-005",
    title: "Performance Optimization",
    description: "Optimize page load times and implement caching",
    status: "todo",
    priority: "low",
    assignee: "Alex Chen",
    dueDate: "2024-03-05",
    labels: ["optimization", "backend"],
    comments: 1,
    attachments: 0
  },
  {
    id: "TASK-006",
    title: "User Testing & Feedback",
    description: "Conduct user testing and implement feedback",
    status: "review",
    priority: "high",
    assignee: "Mike Rodriguez",
    dueDate: "2024-02-28",
    labels: ["testing", "ux"],
    comments: 15,
    attachments: 5
  }
];

const messages = [
  { id: 1, sender: "Alex Chen", message: "Authentication system is now complete and ready for testing", time: "2 min ago", type: "update" },
  { id: 2, sender: "Sarah Kim", message: "New design mockups uploaded for review", time: "15 min ago", type: "file" },
  { id: 3, sender: "Mike Rodriguez", message: "Client feedback incorporated into the requirements", time: "1 hour ago", type: "message" },
  { id: 4, sender: "System", message: "Daily backup completed successfully", time: "2 hours ago", type: "system" }
];

const files = [
  { id: 1, name: "Design_Mockups_v3.figma", size: "12.4 MB", type: "design", uploadedBy: "Sarah Kim", date: "2024-02-08" },
  { id: 2, name: "API_Documentation.pdf", size: "2.1 MB", type: "documentation", uploadedBy: "Alex Chen", date: "2024-02-07" },
  { id: 3, name: "User_Testing_Results.xlsx", size: "856 KB", type: "data", uploadedBy: "Mike Rodriguez", date: "2024-02-06" },
  { id: 4, name: "Brand_Guidelines.pdf", size: "5.3 MB", type: "brand", uploadedBy: "Sarah Kim", date: "2024-02-05" }
];

export function ProjectDashboard() {
  const [view, setView] = useState<"kanban" | "timeline" | "list">("kanban");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo": return <Circle className="h-4 w-4 dev-text-secondary" />;
      case "in-progress": return <Play className="h-4 w-4 dev-warning" />;
      case "review": return <Eye className="h-4 w-4 dev-accent" />;
      case "done": return <CheckCircle className="h-4 w-4 dev-success" />;
      default: return <Circle className="h-4 w-4 dev-text-secondary" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "dev-error";
      case "medium": return "dev-warning";
      case "low": return "dev-success";
      default: return "dev-text-secondary";
    }
  };

  const kanbanColumns = [
    { id: "todo", title: "To Do", tasks: tasks.filter(t => t.status === "todo") },
    { id: "in-progress", title: "In Progress", tasks: tasks.filter(t => t.status === "in-progress") },
    { id: "review", title: "In Review", tasks: tasks.filter(t => t.status === "review") },
    { id: "done", title: "Done", tasks: tasks.filter(t => t.status === "done") }
  ];

  const TaskCard = ({ task }: { task: any }) => (
    <Card 
      className="dev-elevated dev-border border cursor-pointer dev-interactive mb-4"
      onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <span className="text-xs dev-text-secondary dev-code">{task.id}</span>
          </div>
          <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </Badge>
        </div>
        <CardTitle className="text-sm dev-text-primary">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs dev-text-secondary mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {task.labels.map((label: string) => (
            <Badge key={label} variant="secondary" className="text-xs dev-elevated">
              {label}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs dev-text-secondary">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {task.comments}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {task.attachments}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t dev-border flex items-center justify-between">
          <div className="w-6 h-6 rounded-full dev-bg-accent/20 flex items-center justify-center">
            <span className="text-xs font-bold dev-accent">
              {task.assignee.split(" ").map((n: string) => n[0]).join("")}
            </span>
          </div>
          <span className="text-xs dev-text-secondary">{task.assignee}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen dev-surface">
      {/* Project Header */}
      <div className="dev-elevated dev-border border-b sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Project Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 dev-elevated rounded-lg dev-border border">
                  <Code2 className="h-6 w-6 dev-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold dev-text-primary">{projectData.title}</h1>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm dev-text-secondary dev-code">#{projectData.id}</span>
                    <Badge variant="outline" className="dev-warning">
                      {projectData.status}
                    </Badge>
                    <Badge variant="outline" className="dev-error">
                      {projectData.priority} Priority
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Progress & Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="dev-surface rounded-lg p-4 dev-border border">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 dev-accent" />
                    <span className="text-sm font-medium dev-text-primary">Progress</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="dev-text-secondary">Completion</span>
                      <span className="dev-accent font-bold">{projectData.completion}%</span>
                    </div>
                    <Progress value={projectData.completion} className="h-2" />
                  </div>
                </div>
                
                <div className="dev-surface rounded-lg p-4 dev-border border">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 dev-success" />
                    <span className="text-sm font-medium dev-text-primary">Budget</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold dev-text-primary">
                      ${projectData.budget.spent.toLocaleString()}
                    </div>
                    <div className="text-xs dev-text-secondary">
                      of ${projectData.budget.allocated.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="dev-surface rounded-lg p-4 dev-border border">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 dev-warning" />
                    <span className="text-sm font-medium dev-text-primary">Timeline</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold dev-text-primary">
                      {projectData.timeline.daysRemaining} days
                    </div>
                    <div className="text-xs dev-text-secondary">remaining</div>
                  </div>
                </div>
                
                <div className="dev-surface rounded-lg p-4 dev-border border">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 dev-accent" />
                    <span className="text-sm font-medium dev-text-primary">Team</span>
                  </div>
                  <div className="flex -space-x-2">
                    {projectData.team.map((member) => (
                      <div 
                        key={member.id}
                        className="w-8 h-8 rounded-full dev-elevated flex items-center justify-center border-2 dev-border relative"
                      >
                        <span className="text-xs font-bold dev-text-primary">{member.avatar}</span>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 dev-border ${
                          member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* View Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold dev-text-primary">Project Tasks</h2>
                <div className="flex items-center gap-2 dev-elevated rounded-lg p-1 dev-border border">
                  <Button
                    variant={view === "kanban" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setView("kanban")}
                    className={view === "kanban" ? "dev-bg-accent text-black" : "dev-text-secondary"}
                  >
                    Kanban
                  </Button>
                  <Button
                    variant={view === "timeline" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setView("timeline")}
                    className={view === "timeline" ? "dev-bg-accent text-black" : "dev-text-secondary"}
                  >
                    Timeline
                  </Button>
                  <Button
                    variant={view === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setView("list")}
                    className={view === "list" ? "dev-bg-accent text-black" : "dev-text-secondary"}
                  >
                    List
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 dev-text-secondary" />
                  <Input 
                    placeholder="Search tasks..." 
                    className="pl-10 dev-elevated dev-border dev-text-primary"
                  />
                </div>
                <Button variant="outline" size="sm" className="dev-border dev-text-primary">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm" className="dev-bg-accent text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* Kanban View */}
            {view === "kanban" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kanbanColumns.map((column) => (
                  <div key={column.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold dev-text-primary">{column.title}</h3>
                      <Badge variant="secondary" className="dev-elevated">
                        {column.tasks.length}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {column.tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Timeline View */}
            {view === "timeline" && (
              <Card className="dev-elevated dev-border border">
                <CardHeader>
                  <CardTitle className="dev-text-primary flex items-center gap-2">
                    <GitBranch className="h-5 w-5 dev-accent" />
                    Project Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div key={task.id} className="flex items-center gap-4 p-4 dev-surface rounded-lg dev-border border">
                        <div className="flex items-center gap-3 flex-1">
                          {getStatusIcon(task.status)}
                          <div className="flex-1">
                            <h4 className="font-medium dev-text-primary">{task.title}</h4>
                            <p className="text-sm dev-text-secondary">{task.assignee}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="dev-text-secondary">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* List View */}
            {view === "list" && (
              <Card className="dev-elevated dev-border border">
                <CardHeader>
                  <CardTitle className="dev-text-primary">All Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-4 p-3 dev-surface rounded-lg dev-border border hover:dev-elevated transition-all cursor-pointer">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h4 className="font-medium dev-text-primary">{task.title}</h4>
                          <p className="text-sm dev-text-secondary">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm dev-text-secondary">
                          <span>{task.assignee}</span>
                          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Communication Feed */}
            <Card className="dev-elevated dev-border border">
              <CardHeader>
                <CardTitle className="dev-text-primary flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 dev-accent" />
                  Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-3 dev-surface rounded-lg dev-border border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full dev-bg-accent/20 flex items-center justify-center">
                          <span className="text-xs font-bold dev-accent">
                            {msg.sender.split(" ").map((n: string) => n[0]).join("")}
                          </span>
                        </div>
                        <span className="text-sm font-medium dev-text-primary">{msg.sender}</span>
                        <span className="text-xs dev-text-secondary ml-auto">{msg.time}</span>
                      </div>
                      <p className="text-sm dev-text-secondary">{msg.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="dev-elevated dev-border dev-text-primary"
                  />
                  <Button size="sm" className="dev-bg-accent text-black">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Files */}
            <Card className="dev-elevated dev-border border">
              <CardHeader>
                <CardTitle className="dev-text-primary flex items-center gap-2">
                  <FileText className="h-5 w-5 dev-accent" />
                  Project Files
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 dev-surface rounded-lg dev-border border">
                    <FileText className="h-4 w-4 dev-text-secondary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium dev-text-primary">{file.name}</p>
                      <p className="text-xs dev-text-secondary">{file.size} • {file.uploadedBy}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="dev-text-secondary">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full dev-border dev-text-primary">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
