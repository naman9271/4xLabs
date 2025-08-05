import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Linkedin,
  Twitter
} from "lucide-react";

const footerSections = [
  {
    title: "Services",
    links: [
      { name: "Bug Fixing", href: "/services#bug-fixing" },
      { name: "Web Development", href: "/services#web-development" },
      { name: "Mobile Apps", href: "/services#mobile-development" },
      { name: "UI/UX Design", href: "/services#ui-ux-design" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Process", href: "/process" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Careers", href: "/careers" },
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api-docs" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
    ]
  }
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="dev-surface py-16 dev-border border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 dev-accent" />
              <span className="text-2xl font-bold dev-text-primary">BuildUp</span>
            </div>
            
            <p className="dev-text-secondary text-sm leading-relaxed max-w-md">
              Professional tech services platform connecting businesses with expert developers 
              for bug fixes, development, design, and comprehensive digital solutions.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm dev-text-secondary">
                <Mail className="h-4 w-4 dev-accent" />
                <span>contact@buildup.dev</span>
              </div>
              <div className="flex items-center gap-3 text-sm dev-text-secondary">
                <Phone className="h-4 w-4 dev-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm dev-text-secondary">
                <MapPin className="h-4 w-4 dev-accent" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="p-2 dev-elevated rounded-lg dev-border border hover:dev-accent transition-colors dev-interactive"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4 dev-text-secondary" />
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold dev-text-primary uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm dev-text-secondary hover:dev-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8 dev-border" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm dev-text-secondary">
            © 2025 BuildUp. All rights reserved. Built with precision and passion.
          </div>
          
          <div className="flex items-center space-x-6 text-sm dev-text-secondary">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              All systems operational
            </span>
            <span>Version 2.1.0</span>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="mt-8 pt-8 border-t dev-border text-center">
          <p className="text-xs dev-text-disabled dev-code">
            {'// Crafted with <Code /> and ☕ by the BuildUp team'}
          </p>
        </div>
      </div>
    </footer>
  );
}
