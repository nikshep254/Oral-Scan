import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F5F7] text-slate-400 py-3 text-[10px] uppercase tracking-wider text-center border-t border-slate-200">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-2">
        <span>© {new Date().getFullYear()} OralScan AI. Private & Secure.</span>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-slate-600 transition-colors">Privacy Policy</span>
          <span className="cursor-pointer hover:text-slate-600 transition-colors">Terms of Use</span>
          <span className="cursor-pointer hover:text-slate-600 transition-colors">Emergency Info</span>
        </div>
      </div>
    </footer>
  );
};