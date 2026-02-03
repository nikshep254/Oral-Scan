import React from 'react';

interface OnboardingProps {
  onStart: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1d1d1f] overflow-y-auto pb-20 animate-[fadeIn_0.5s_ease-out]">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-20 pb-16 px-6 text-center">
        <div className="inline-block p-3 bg-white rounded-2xl shadow-sm mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Why choose OralScan AI?
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          The most advanced, private screening tool for early oral health detection.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        
        {/* Card 1: Privacy */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col items-start transition-transform hover:scale-[1.02] duration-300">
          <div className="bg-slate-100 p-4 rounded-2xl mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Total Privacy</h3>
          <p className="text-slate-500 text-lg leading-relaxed">
            We understand the stigma. Use OralScan AI completely anonymously. No account creation required, and your data stays in your browser session.
          </p>
        </div>

        {/* Card 2: Features */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col items-start transition-transform hover:scale-[1.02] duration-300">
          <div className="bg-slate-100 p-4 rounded-2xl mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ff2d55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Instant AI Analysis</h3>
          <p className="text-slate-500 text-lg leading-relaxed">
            Powered by Gemini 2.0 Flash technology. Detect signs of Leukoplakia, Caries, or Periodontitis in seconds just by uploading a photo.
          </p>
        </div>

        {/* Card 3: Best Way to Use */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col items-start transition-transform hover:scale-[1.02] duration-300">
          <div className="bg-slate-100 p-4 rounded-2xl mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">How to Use</h3>
          <p className="text-slate-500 text-lg leading-relaxed">
            1. Ensure good lighting.<br/>
            2. Snap a clear, close-up photo of the affected area.<br/>
            3. Upload to the chat and get immediate guidance.
          </p>
        </div>
      </div>

      {/* Builder / Mission Section */}
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-white rounded-[32px] p-10 md:p-14 shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-6">Built to Break the Stigma</h2>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            "I built this app for people who feel hesitation or shame in coming forward about their oral health. 
            Oral diseases are often silent but can be dangerous if ignored. 
            This tool is your private first step towards health—judgment-free, secure, and accessible."
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="font-semibold text-slate-900">The Creator</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">OralScan AI Initiative</span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7] to-transparent">
        <div className="max-w-md mx-auto">
          <button 
            onClick={onStart}
            className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg transform transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Start Private Screening
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};