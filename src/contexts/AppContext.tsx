import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, UserProfile, DailyProgram, QuestionnaireAnswers } from '@/types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  dailyProgram: DailyProgram | null;
  setDailyProgram: (program: DailyProgram | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultAnswers: QuestionnaireAnswers = {
  mood: 'neutral',
  resistanceToChange: 'open',
  thinkingStyle: 'balanced',
  energyRecharge: 'mixed',
  financialStress: 'low',
  incomeLevel: 'medium',
  priorities: ['health', 'work'],
  sleepQuality: 'good',
  exerciseFrequency: 'weekly',
  spiritualImportance: 'important',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to Arabic
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mot3a-language');
    return (saved as Language) || 'ar';
  });

  // Initialize user profile from localStorage
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('mot3a-profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Initialize daily program from localStorage (with date check)
  const [dailyProgram, setDailyProgramState] = useState<DailyProgram | null>(() => {
    const saved = localStorage.getItem('mot3a-program');
    if (saved) {
      try {
        const program = JSON.parse(saved);
        // Check if program is for today
        const today = new Date().toISOString().split('T')[0];
        if (program.date === today) {
          return program;
        }
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const [hasCompletedOnboarding, setHasCompletedOnboardingState] = useState<boolean>(() => {
    return localStorage.getItem('mot3a-onboarding-complete') === 'true';
  });

  // Persist language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mot3a-language', lang);
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  // Persist profile changes
  const setUserProfile = (profile: UserProfile | null) => {
    setUserProfileState(profile);
    if (profile) {
      localStorage.setItem('mot3a-profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('mot3a-profile');
    }
  };

  // Persist program changes
  const setDailyProgram = (program: DailyProgram | null) => {
    setDailyProgramState(program);
    if (program) {
      localStorage.setItem('mot3a-program', JSON.stringify(program));
    } else {
      localStorage.removeItem('mot3a-program');
    }
  };

  // Persist onboarding status
  const setHasCompletedOnboarding = (completed: boolean) => {
    setHasCompletedOnboardingState(completed);
    localStorage.setItem('mot3a-onboarding-complete', String(completed));
  };

  // Set initial document direction
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        userProfile,
        setUserProfile,
        dailyProgram,
        setDailyProgram,
        isLoading,
        setIsLoading,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
