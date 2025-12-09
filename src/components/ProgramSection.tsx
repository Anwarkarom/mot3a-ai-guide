import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  Utensils, 
  BookOpen, 
  Wallet, 
  Gamepad2, 
  Moon,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface ProgramSectionProps {
  title: string;
  icon: 'time' | 'nutrition' | 'learning' | 'finance' | 'entertainment' | 'spiritual';
  children: React.ReactNode;
  variant?: 'default' | 'gold';
}

const iconMap = {
  time: Clock,
  nutrition: Utensils,
  learning: BookOpen,
  finance: Wallet,
  entertainment: Gamepad2,
  spiritual: Moon,
};

export const ProgramSection: React.FC<ProgramSectionProps> = ({
  title,
  icon,
  children,
  variant = 'default',
}) => {
  const Icon = iconMap[icon];

  return (
    <Card variant={variant === 'gold' ? 'gold' : 'neumorphic'} className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${variant === 'gold' ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary'}
          `}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

// Time Block Component
interface TimeBlockProps {
  startTime: string;
  endTime: string;
  description: string;
  focusGoal: string;
  priority: 'high' | 'medium' | 'low';
}

export const TimeBlockItem: React.FC<TimeBlockProps> = ({
  startTime,
  endTime,
  description,
  focusGoal,
  priority,
}) => {
  const priorityColors = {
    high: 'border-l-primary bg-primary/5',
    medium: 'border-l-accent bg-accent/5',
    low: 'border-l-muted-foreground bg-muted/30',
  };

  return (
    <div className={`p-4 rounded-xl border-l-4 ${priorityColors[priority]} mb-3 last:mb-0`}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
        <Clock className="w-4 h-4" />
        <span>{startTime} - {endTime}</span>
      </div>
      <h4 className="font-medium text-foreground">{description}</h4>
      <p className="text-sm text-muted-foreground mt-1">{focusGoal}</p>
    </div>
  );
};

// Tip Card Component
interface TipCardProps {
  title: string;
  description: string;
}

export const TipCard: React.FC<TipCardProps> = ({ title, description }) => (
  <div className="p-4 rounded-xl bg-secondary/50 mb-3 last:mb-0">
    <h4 className="font-medium text-foreground mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

// Learning Task Component
interface LearningTaskProps {
  topic: string;
  difficulty: 'easy' | 'medium' | 'challenging';
  duration: string;
  resourceType: string;
  description: string;
}

export const LearningTaskItem: React.FC<LearningTaskProps> = ({
  topic,
  difficulty,
  duration,
  resourceType,
  description,
}) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    challenging: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 mb-3 last:mb-0">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-foreground">{topic}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {duration}
        </span>
        <span className="capitalize">{resourceType}</span>
      </div>
    </div>
  );
};

// Financial Step Component
interface FinancialStepProps {
  title: string;
  description: string;
  completed?: boolean;
  onToggle?: () => void;
}

export const FinancialStepItem: React.FC<FinancialStepProps> = ({
  title,
  description,
  completed = false,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className={`
      w-full text-left p-4 rounded-xl border transition-all duration-200
      ${completed 
        ? 'bg-primary/10 border-primary/30' 
        : 'bg-secondary/30 border-border/50 hover:border-primary/30'
      }
      mb-3 last:mb-0
    `}
  >
    <div className="flex items-start gap-3">
      <div className="mt-0.5">
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-primary" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <div>
        <h4 className={`font-medium ${completed ? 'text-primary line-through' : 'text-foreground'}`}>
          {title}
        </h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </button>
);

// Entertainment Activity Component
interface ActivityProps {
  title: string;
  description: string;
  type: 'solo' | 'social' | 'creative' | 'relaxation';
  duration: string;
}

export const ActivityItem: React.FC<ActivityProps> = ({
  title,
  description,
  type,
  duration,
}) => {
  const typeEmojis = {
    solo: '🧘',
    social: '👥',
    creative: '🎨',
    relaxation: '☕',
  };

  return (
    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 mb-3 last:mb-0">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{typeEmojis[type]}</span>
        <div>
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <span className="text-xs text-accent mt-2 inline-block">{duration}</span>
        </div>
      </div>
    </div>
  );
};

// Supplication Component
interface SupplicationProps {
  arabicText: string;
  transliteration?: string;
  meaning: string;
  context: string;
}

export const SupplicationItem: React.FC<SupplicationProps> = ({
  arabicText,
  transliteration,
  meaning,
  context,
}) => (
  <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 mb-4 last:mb-0">
    <div className="text-sm text-accent font-medium mb-3">{context}</div>
    <p className="text-xl font-arabic text-foreground mb-3 leading-relaxed text-right" dir="rtl">
      {arabicText}
    </p>
    {transliteration && (
      <p className="text-sm text-muted-foreground italic mb-2">{transliteration}</p>
    )}
    <p className="text-sm text-foreground">{meaning}</p>
  </div>
);
