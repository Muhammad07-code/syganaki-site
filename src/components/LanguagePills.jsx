import React from 'react';

const LanguagePills = ({ languages, currentLanguage, onChange }) => {
  return (
    <div className="flex gap-2 justify-center mb-4">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => onChange(language.code)}
          className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
            currentLanguage.code === language.code
              ? 'bg-primary-dark text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-accent-gold hover:text-accent-gold'
          }`}
        >
          {language.short}
        </button>
      ))}
    </div>
  );
};

export default LanguagePills;
