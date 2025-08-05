"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Menu, 
  X,
  Home,
  Settings,
  User,
  FileText,
  Briefcase
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services", icon: Settings },
  { name: "Submit Project", href: "/submit-project", icon: FileText },
  { name: "Dashboard", href: "/dashboard", icon: Briefcase },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="dev-elevated dev-border border-b sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 dev-interactive">
            <Code2 className="h-8 w-8 dev-accent" />
            <span className="text-xl font-bold dev-text-primary">BuildUp</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors dev-interactive ${
                    isActive 
                      ? 'dev-accent font-medium' 
                      : 'dev-text-secondary hover:dev-accent'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="dev-border dev-text-primary dev-focus">
                Sign In
              </Button>
              <Button className="dev-bg-accent text-black font-medium dev-interactive">
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="dev-text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden dev-elevated dev-border border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'dev-accent dev-elevated'
                      : 'dev-text-secondary hover:dev-accent hover:dev-elevated'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
            
            <div className="pt-4 pb-3 border-t dev-border">
              <div className="flex flex-col space-y-3 px-3">
                <Button variant="outline" className="dev-border dev-text-primary justify-start">
                  Sign In
                </Button>
                <Button className="dev-bg-accent text-black font-medium justify-start">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
