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
  Check,
  X,
} from "lucide-react";

// Mock Magnetic component
const Magnetic = ({ children }: { children: React.ReactNode }) => (
  <div className="hover:scale-105 transition-transform duration-300">
    {children}
  </div>
);

// Mock RoundedButton component
const RoundedButton = ({
  children,
  className = "",
  variant = "primary",
  icon,
  href,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) => {
  const baseClasses =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105";
  const variantClasses =
    variant === "primary"
      ? "bg-white text-black hover:bg-gray-100"
      : "bg-transparent border border-white/20 text-white hover:bg-white/10";

  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </Component>
  );
};

// TypeScript interfaces
interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface AlertState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

// Main footer component
const PortfolioFooter: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: "success",
    message: "",
  });
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

  // Auto-hide alert after 5 seconds
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const socialLinks: SocialLink[] = [
    { icon: <Github size={20} />, label: "GitHub", href: "github.com/Atomic-hacks" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/victor-ikechukwu-759a44346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:atomicisnoah.code@gmail..com",
    },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setAlert({
        show: true,
        type: "error",
        message: "Please enter your email address",
      });
      return;
    }

    if (!validateEmail(email)) {
      setAlert({
        show: true,
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xldlnpdg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subject: "New Newsletter Subscription",
          message: `New newsletter subscription from: ${email}`,
        }),
      });

      if (response.ok) {
        setAlert({
          show: true,
          type: "success",
          message: "Thank you! Your subscription was successful.",
        });
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dismissAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <footer ref={footerRef} className="relative text-white overflow-hidden">
      {/* Alert notification */}
      {alert.show && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div
            className={`p-4 rounded-lg shadow-lg flex items-center gap-3 ${
              alert.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {alert.type === "success" ? (
              <Check size={20} className="flex-shrink-0" />
            ) : (
              <X size={20} className="flex-shrink-0" />
            )}
            <span className="text-sm">{alert.message}</span>
            <button
              onClick={dismissAlert}
              className="ml-auto hover:bg-white/20 rounded p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Animated background elements */}
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
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full
                  text-white placeholder-white/40 focus:outline-none focus:border-white/40
                  focus:bg-white/15 transition-all duration-300 disabled:opacity-50"
              />

              <button
                onClick={handleEmailSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90
                    transition-all duration-300 flex items-center gap-2 disabled:opacity-50
                    disabled:cursor-not-allowed hover:scale-105"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
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
          © 2025 Atomic-codes. All rights reserved.
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
