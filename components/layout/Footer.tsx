"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import Magnetic from "../common/Magnetic";
import RoundedButton from "../ui/magic-button";

// TypeScript interfaces

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

// Main footer component
const PortfolioFooter: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const footerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Africa/Lagos",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize animations with CSS transitions
  useEffect(() => {
    // Simple fade-in animation for components
    if (ctaRef.current) {
      ctaRef.current.style.opacity = "0";
      ctaRef.current.style.transform = "translateY(60px)";
      setTimeout(() => {
        if (ctaRef.current) {
          ctaRef.current.style.transition = "all 1s ease-out";
          ctaRef.current.style.opacity = "1";
          ctaRef.current.style.transform = "translateY(0)";
        }
      }, 100);
    }

    if (bottomRef.current) {
      bottomRef.current.style.opacity = "0";
      bottomRef.current.style.transform = "translateY(20px)";
      setTimeout(() => {
        if (bottomRef.current) {
          bottomRef.current.style.transition = "all 0.6s ease-out";
          bottomRef.current.style.opacity = "1";
          bottomRef.current.style.transform = "translateY(0)";
        }
      }, 800);
    }
  }, []);

  const socialLinks: SocialLink[] = [
    { icon: <Github size={20} />, label: "GitHub", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:hello@example.com",
    },
  ];

  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      // Add your email handling logic here
      console.log("Email submitted:", email);
      setEmail("");
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative text-white overflow-hidden">
      \{/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Main CTA Section */}
        <div ref={ctaRef} className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-light mb-8 tracking-tight">
            Let&apos;s Create
            <br />
            <span className="text-white/60">Something Amazing</span>
          </h2>

          <p className="text-xl text-white/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let&apos;s discuss your next
            project and create something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Magnetic>
              <RoundedButton
                className="px-8 py-4 text-lg"
                icon={<ArrowUpRight size={20} />}
                onClick={() => window.open("mailto:hello@example.com")}
              >
                Start a Project
              </RoundedButton>
            </Magnetic>

            <Magnetic>
              <RoundedButton
                variant="secondary"
                className="px-8 py-4 text-lg"
                onClick={scrollToTop}
              >
                Back to Top
              </RoundedButton>
            </Magnetic>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-20">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-light mb-4">Stay Updated</h3>
            <p className="text-white/60 mb-6">
              Get notified about new projects and insights
            </p>

            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full
                  text-white placeholder-white/40 focus:outline-none focus:border-white/40
                  focus:bg-white/15 transition-all duration-300"
              />

              <RoundedButton
                onClick={handleEmailSubmit}
                className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90
                    transition-all duration-300 flex items-center gap-2"
              >
                <Send size={16} />
              </RoundedButton>
            </div>
          </div>
        </div>

        {/* Links and Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white/80">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/60">
                <Mail size={16} />
                <span>hello@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin size={16} />
                <span>Port Harcourt, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Clock size={16} />
                <span>{currentTime} WAT</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white/80">
              Quick Links
            </h4>
            <div className="space-y-3">
              {(["About", "Work", "Services", "Contact"] as const).map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-white/60 hover:text-white transition-all duration-300
                    hover:translate-x-2 transform"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white/80">Connect</h4>
            <div ref={linksRef} className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <div key={index}>
                  <RoundedButton
                    href={social.href}
                    className="flex items-center gap-2 px-4 py-2 border border-white/20 
                      rounded-full text-white/60 hover:text-white hover:border-white/40
                      transition-all duration-300 hover:bg-white/5 hover:scale-105"
                  >
                    <p>{social.icon}</p>

                    <span className="text-sm">{social.label}</span>
                  </RoundedButton>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row 
            items-center justify-between gap-4"
        >
          <div className="text-white/40 text-sm">
            © 2025 Your Name. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <a
              href="#privacy"
              className="hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white/60 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
