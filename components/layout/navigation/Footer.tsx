'use client';
import React from 'react';

export default function Footer() {
  return (
    <div className="space-y-4">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex justify-between items-center text-white/60 text-xs">
        <p className="font-light">Made with ♥ (def not AI)</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:scale-105 transition duration-500">
            Twitter
          </a>
          <a href="#" className="hover:scale-105 transition duration-500">
            LinkedIn
          </a>
          <a href="#" className="hover:scale-105 transition duration-500">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}