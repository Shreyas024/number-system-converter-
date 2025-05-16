import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 py-6 mt-12 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} NumSys Converter. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <Github size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500 flex items-center justify-center">
          <span>Made with</span>
          <Heart size={14} className="mx-1 text-red-500 inline" />
          <span>for students and developers</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;