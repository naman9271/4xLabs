'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Code2, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  ArrowUp 
} from 'lucide-react';
import { useCalBooking } from '@/hooks/useCalBooking';
import SchedulingModal from '@/components/SchedulingModal';
import CalBooker from '@/components/CalBooker';

const Footer = () => {
  const { isBookingOpen, selectedAccount, openBooking, closeBooking } = useCalBooking();
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                4xLabs
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Elite tech innovation labs crafting exceptional digital experiences 
              for forward-thinking businesses worldwide.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Mail, href: 'mailto:hello@4xLabs.com' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-card hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              {[
                'Web Development',
                'UI/UX Design',
                'Mobile Apps',
                'E-commerce',
                'Web Hosting',
                'Optimization'
              ].map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              {[
                'About Us',
                'Our Process',
                'Portfolio',
                'Case Studies',
                'Blog',
                'Careers'
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Get Started</h3>
            <p className="text-muted-foreground">
              Ready to transform your digital presence? Let&apos;s discuss your project today.
            </p>
            <div className="space-y-3">
              <Link href="/coming-soon">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  Start Your Project
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSchedulingModalOpen(true)}
                className="w-full px-6 py-3 border border-border hover:border-primary/50 text-foreground rounded-lg font-medium hover:bg-primary/5 transition-all duration-300"
              >
                Book Consultation
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-muted-foreground text-sm">
                © 2025 4xLabs. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gradient-to-br from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Scheduling Modal */}
      <SchedulingModal
        isOpen={isSchedulingModalOpen}
        onClose={() => setIsSchedulingModalOpen(false)}
        onSelectAccount={openBooking}
      />

      {/* Cal.com Booking Modal */}
      {selectedAccount && (
        <CalBooker
          username={selectedAccount.username}
          isOpen={isBookingOpen}
          onClose={closeBooking}
        />
      )}
    </footer>
  );
};

export default Footer;
