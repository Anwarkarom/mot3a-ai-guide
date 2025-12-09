import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const { language } = useApp();
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress text */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-muted-foreground">
          {t('onboarding.progress', language, { current, total })}
        </span>
        <span className="text-sm font-bold text-primary">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-secondary/50 overflow-hidden shadow-neumorphic-inset">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index < current 
                ? 'bg-primary scale-100' 
                : index === current 
                  ? 'bg-primary/50 scale-125' 
                  : 'bg-border scale-100'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};
