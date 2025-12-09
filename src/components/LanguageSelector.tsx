import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Language } from '@/types';
import { getLanguageName } from '@/lib/i18n';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'default' | 'minimal' | 'cards';
  showLabel?: boolean;
}

const languages: Language[] = ['ar', 'fr', 'en'];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'default',
  showLabel = true 
}) => {
  const { language, setLanguage } = useApp();

  if (variant === 'cards') {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`
              neumorphic-button px-8 py-4 rounded-2xl transition-all duration-300
              flex flex-col items-center gap-2 min-w-[120px]
              ${language === lang 
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background text-primary' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <span className="text-2xl">
              {lang === 'ar' ? '🇸🇦' : lang === 'fr' ? '🇫🇷' : '🇬🇧'}
            </span>
            <span className="font-medium">{getLanguageName(lang)}</span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-1 neumorphic-button px-2 py-1 rounded-lg">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`
              px-2 py-1 rounded-md text-sm font-medium transition-all duration-200
              ${language === lang 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }
            `}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe className="w-4 h-4" />
        </div>
      )}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-secondary/50">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
              ${language === lang 
                ? 'bg-primary text-primary-foreground shadow-soft' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }
            `}
          >
            {getLanguageName(lang)}
          </button>
        ))}
      </div>
    </div>
  );
};
