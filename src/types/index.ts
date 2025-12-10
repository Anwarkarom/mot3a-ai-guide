// Language type for multi-language support
export type Language = 'ar' | 'fr' | 'en';

// User profile types
export interface ChildProfile {
  name?: string;
  age?: number;
  ageRange?: string;
  preferredThemes?: string[];
  sensitivities?: string[];
  favoriteCharacters?: string[];
}

export interface UserProfile {
  name?: string;
  ageGroup?: 'young-adult' | 'adult' | 'middle-aged' | 'senior';
  hasChildren?: boolean;
  language: Language;
  answers: QuestionnaireAnswers;
  childProfile?: ChildProfile;
}

// Questionnaire types
export interface QuestionnaireAnswers {
  mood: 'excellent' | 'good' | 'neutral' | 'stressed' | 'overwhelmed';
  resistanceToChange: 'very-open' | 'open' | 'cautious' | 'resistant';
  thinkingStyle: 'logical' | 'intuitive' | 'balanced';
  energyRecharge: 'alone' | 'social' | 'mixed';
  financialStress: 'none' | 'low' | 'moderate' | 'high';
  incomeLevel: 'low' | 'medium' | 'high';
  priorities: string[];
  sleepQuality: 'excellent' | 'good' | 'fair' | 'poor';
  exerciseFrequency: 'daily' | 'weekly' | 'occasional' | 'rarely';
  spiritualImportance: 'very-important' | 'important' | 'somewhat' | 'not-important';
}

// Daily Program types
export interface TimeBlock {
  startTime: string;
  endTime: string;
  description: string;
  focusGoal: string;
  priority: 'high' | 'medium' | 'low';
}

export interface NutritionTip {
  title: string;
  description: string;
  icon?: string;
}

export interface LearningTask {
  topic: string;
  difficulty: 'easy' | 'medium' | 'challenging';
  duration: string;
  resourceType: 'article' | 'book' | 'video' | 'podcast' | 'exercise';
  description: string;
}

export interface FinancialStep {
  title: string;
  description: string;
  completed?: boolean;
}

export interface EntertainmentActivity {
  title: string;
  description: string;
  type: 'solo' | 'social' | 'creative' | 'relaxation';
  duration: string;
}

export interface Supplication {
  arabicText: string;
  transliteration?: string;
  meaning: string;
  context: string;
}

export interface KidsActivity {
  title: string;
  description: string;
  ageRange: string;
  type: 'educational' | 'creative' | 'physical' | 'entertainment';
  duration: string;
}

export interface DailyProgram {
  date: string;
  language: Language;
  greeting: string;
  motivationalQuote: string;
  sections: {
    timeAndFocus: {
      title: string;
      timeBlocks: TimeBlock[];
    };
    nutritionAndEnergy: {
      title: string;
      tips: NutritionTip[];
    };
    learningAndSelfDevelopment: {
      title: string;
      tasks: LearningTask[];
    };
    financeAndWisdom: {
      title: string;
      steps: FinancialStep[];
    };
    entertainmentAndRecharge: {
      title: string;
      activities: EntertainmentActivity[];
    };
    spiritualContent: {
      title: string;
      supplications: Supplication[];
    };
    kidsContent?: {
      title: string;
      activities: KidsActivity[];
    };
  };
}

// Question type for onboarding
export interface Question {
  id: keyof QuestionnaireAnswers;
  titleKey: string;
  descriptionKey?: string;
  options: {
    value: string;
    labelKey: string;
    icon?: string;
  }[];
  multiSelect?: boolean;
}
