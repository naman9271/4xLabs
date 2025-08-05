"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock,
  Code2,
  ArrowRight,
  Github,
  CheckCircle,
  Shield,
  Zap,
  Sparkles
} from "lucide-react";

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  // Matrix rain effect particles
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    // Create floating particles for background effect
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + 0.5) % 100,
        opacity: Math.random() * 0.3 + 0.1
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleViewToggle = () => {
    setAnimationClass("animate-pulse");
    setTimeout(() => {
      setIsLoginView(!isLoginView);
      setFormData({ fullName: "", email: "", password: "" });
      setAnimationClass("");
    }, 150);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form Data:", formData);
      console.log("View:", isLoginView ? "Login" : "Register");
      setIsLoading(false);
    }, 2000);
  };

  const features = [
    { icon: Shield, text: "Secure Authentication" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Code2, text: "Developer First" }
  ];

  return (
    <div className="min-h-screen dev-surface relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 dev-bg-accent rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              animation: `float 3s ease-in-out infinite ${particle.id * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/5 via-transparent to-[#01C16A]/5" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22D3EE]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#01C16A]/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative w-full max-w-md mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 dev-elevated rounded-2xl dev-border border-2 border-cyan-500/20 mb-4 group hover:scale-110 transition-transform">
            <Code2 className="h-8 w-8 dev-accent group-hover:animate-spin" />
          </div>
          <h1 className="text-3xl font-bold dev-text-primary mb-2 dev-code">
            BuildUp
          </h1>
          <p className="dev-text-secondary">Professional Developer Platform</p>
        </div>

        {/* Main Auth Card */}
        <Card className={`dev-elevated dev-border border dev-glass backdrop-blur-xl shadow-2xl ${animationClass}`}>
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="dev-bg-accent/10 dev-accent border-0">
                {isLoginView ? "Welcome Back" : "Join the Team"}
              </Badge>
            </div>
            
            <CardTitle className="text-2xl font-bold dev-text-primary">
              {isLoginView ? "Sign In" : "Create Account"}
            </CardTitle>
            
            <CardDescription className="dev-text-secondary">
              {isLoginView 
                ? "Access your developer dashboard" 
                : "Start building amazing projects"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field (Register Only) */}
              {!isLoginView && (
                <div className="space-y-2 animate-in slide-in-from-top duration-300">
                  <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                    <User className="h-4 w-4 dev-accent" />
                    Full Name
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="dev-elevated dev-border dev-text-primary dev-focus pl-10 h-12 transition-all hover:dev-elevated"
                      required={!isLoginView}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 dev-text-secondary" />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                  <Mail className="h-4 w-4 dev-accent" />
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="developer@buildup.dev"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="dev-elevated dev-border dev-text-primary dev-focus pl-10 h-12 transition-all hover:dev-elevated"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 dev-text-secondary" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium dev-text-primary flex items-center gap-2">
                  <Lock className="h-4 w-4 dev-accent" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="dev-elevated dev-border dev-text-primary dev-focus pl-10 pr-10 h-12 transition-all hover:dev-elevated"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 dev-text-secondary" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 dev-text-secondary hover:dev-accent transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Features Preview (Register Only) */}
              {!isLoginView && (
                <div className="animate-in slide-in-from-bottom duration-500">
                  <div className="grid grid-cols-1 gap-2 p-4 dev-surface rounded-lg dev-border border">
                    <div className="text-xs font-medium dev-text-primary mb-2 flex items-center gap-2">
                      <Sparkles className="h-3 w-3 dev-accent" />
                      What you'll get:
                    </div>
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs dev-text-secondary">
                        <CheckCircle className="h-3 w-3 dev-success" />
                        <feature.icon className="h-3 w-3 dev-accent" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Forgot Password (Login Only) */}
              {isLoginView && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm dev-accent hover:underline transition-all hover:brightness-110"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full dev-bg-accent text-black font-semibold h-12 text-base dev-interactive group relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isLoginView ? "Sign In" : "Create Account"}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
                
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </form>

            {/* OAuth Section */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t dev-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="dev-surface px-2 dev-text-secondary">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full dev-border dev-text-primary h-12 dev-interactive group"
              onClick={() => console.log("GitHub OAuth")}
            >
              <Github className="h-5 w-5 mr-2 group-hover:animate-spin" />
              GitHub
            </Button>

            {/* View Toggle */}
            <div className="text-center pt-4 border-t dev-border">
              <p className="text-sm dev-text-secondary">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={handleViewToggle}
                  className="ml-1 dev-accent hover:underline font-medium transition-all hover:brightness-110"
                >
                  {isLoginView ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs dev-text-disabled dev-code">
            // Protected by enterprise-grade security
          </p>
          <div className="flex justify-center items-center gap-4 text-xs dev-text-secondary">
            <a href="#" className="hover:dev-accent transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:dev-accent transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:dev-accent transition-colors">Support</a>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .animate-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .slide-in-from-top {
          transform: translateY(-10px);
          opacity: 0;
        }
        
        .slide-in-from-bottom {
          transform: translateY(10px);
          opacity: 0;
        }
        
        @keyframes slideIn {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        /* Glowing input focus effect */
        .dev-focus:focus {
          box-shadow: 0 0 0 2px hsl(186 100% 52% / 0.2), 0 0 20px hsl(186 100% 52% / 0.1);
        }
        
        /* Custom scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: hsl(186 100% 52% / 0.3) transparent;
        }
        
        *::-webkit-scrollbar {
          width: 6px;
        }
        
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        
        *::-webkit-scrollbar-thumb {
          background-color: hsl(186 100% 52% / 0.3);
          border-radius: 3px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background-color: hsl(186 100% 52% / 0.5);
        }
      `}</style>
    </div>
  );
}
