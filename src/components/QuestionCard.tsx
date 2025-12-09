import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Question } from '@/types';
import { Check } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  animationDelay?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  animationDelay = 0,
}) => {
  const { language } = useApp();

  const isSelected = (optionValue: string) => {
    if (question.multiSelect) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleSelect = (optionValue: string) => {
    if (question.multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter(v => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
    }
  };

  return (
    <div 
      className="animate-slide-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
        {t(question.titleKey, language)}
      </h2>
      
      {question.descriptionKey && (
        <p className="text-muted-foreground text-center mb-6">
          {t(question.descriptionKey, language)}
        </p>
      )}

      <div className={`grid gap-4 ${
        question.options.length > 4 
          ? 'grid-cols-2 md:grid-cols-3' 
          : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {question.options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`
              neumorphic-button p-5 rounded-2xl text-left
              transition-all duration-300 group relative overflow-hidden
              ${isSelected(option.value) 
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                : ''
              }
            `}
            style={{ animationDelay: `${animationDelay + (index * 50)}ms` }}
          >
            {/* Selection indicator */}
            <div className={`
              absolute top-3 right-3 w-6 h-6 rounded-full border-2 
              flex items-center justify-center transition-all duration-200
              ${isSelected(option.value)
                ? 'bg-primary border-primary'
                : 'border-border group-hover:border-primary/50'
              }
            `}>
              {isSelected(option.value) && (
                <Check className="w-4 h-4 text-primary-foreground animate-scale-in" />
              )}
            </div>

            {/* Icon if provided */}
            {option.icon && (
              <span className="text-3xl mb-3 block">{option.icon}</span>
            )}

            <span className={`
              font-medium text-lg block pr-8
              ${isSelected(option.value) ? 'text-primary' : 'text-foreground'}
              transition-colors duration-200
            `}>
              {t(option.labelKey, language)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
