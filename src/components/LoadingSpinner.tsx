import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  variant?: 'default' | 'overlay' | 'inline';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message,
  variant = 'default'
}) => {
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-primary" />
        {message && <span className="text-sm text-muted-foreground">{message}</span>}
      </div>
    );
  }

  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="neumorphic p-8 rounded-3xl flex flex-col items-center gap-4 max-w-sm mx-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-primary animate-float" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
          {message && (
            <p className="text-center text-foreground font-medium">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary animate-float" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
      {message && (
        <p className="text-center text-muted-foreground">{message}</p>
      )}
    </div>
  );
};
