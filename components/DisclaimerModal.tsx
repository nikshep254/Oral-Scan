import React from 'react';

interface DisclaimerModalProps {
  onAgree: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAgree }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        <div className="bg-amber-50 p-6 border-b border-amber-100">
          <div className="flex items-center gap-3 text-amber-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-bold">Important Disclaimer</h2>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-slate-600 mb-4 leading-relaxed">
            This application uses Artificial Intelligence to analyze images. 
            <strong className="text-slate-900 block mt-2">It is NOT a doctor and does NOT provide medical diagnoses.</strong>
          </p>
          
          <ul className="list-disc list-outside ml-5 text-slate-600 space-y-2 mb-6 text-sm">
            <li>The results provided are for informational purposes only.</li>
            <li>AI can make mistakes and may produce inaccurate results.</li>
            <li>Always consult a qualified healthcare professional (dentist or doctor) for any oral health concerns.</li>
            <li>In case of emergency, contact your local emergency services immediately.</li>
          </ul>

          <button
            onClick={onAgree}
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-md active:scale-[0.98]"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};