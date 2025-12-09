import { Question } from '@/types';

export const onboardingQuestions: Question[] = [
  {
    id: 'mood',
    titleKey: 'q.mood.title',
    options: [
      { value: 'excellent', labelKey: 'q.mood.excellent', icon: '😊' },
      { value: 'good', labelKey: 'q.mood.good', icon: '🙂' },
      { value: 'neutral', labelKey: 'q.mood.neutral', icon: '😐' },
      { value: 'stressed', labelKey: 'q.mood.stressed', icon: '😰' },
      { value: 'overwhelmed', labelKey: 'q.mood.overwhelmed', icon: '😓' },
    ],
  },
  {
    id: 'resistanceToChange',
    titleKey: 'q.resistance.title',
    options: [
      { value: 'very-open', labelKey: 'q.resistance.very-open', icon: '🌟' },
      { value: 'open', labelKey: 'q.resistance.open', icon: '✨' },
      { value: 'cautious', labelKey: 'q.resistance.cautious', icon: '🤔' },
      { value: 'resistant', labelKey: 'q.resistance.resistant', icon: '🛡️' },
    ],
  },
  {
    id: 'thinkingStyle',
    titleKey: 'q.thinking.title',
    options: [
      { value: 'logical', labelKey: 'q.thinking.logical', icon: '🧠' },
      { value: 'intuitive', labelKey: 'q.thinking.intuitive', icon: '💫' },
      { value: 'balanced', labelKey: 'q.thinking.balanced', icon: '⚖️' },
    ],
  },
  {
    id: 'energyRecharge',
    titleKey: 'q.energy.title',
    options: [
      { value: 'alone', labelKey: 'q.energy.alone', icon: '🧘' },
      { value: 'social', labelKey: 'q.energy.social', icon: '👥' },
      { value: 'mixed', labelKey: 'q.energy.mixed', icon: '🔄' },
    ],
  },
  {
    id: 'financialStress',
    titleKey: 'q.financial.title',
    options: [
      { value: 'none', labelKey: 'q.financial.none', icon: '😌' },
      { value: 'low', labelKey: 'q.financial.low', icon: '🙂' },
      { value: 'moderate', labelKey: 'q.financial.moderate', icon: '😕' },
      { value: 'high', labelKey: 'q.financial.high', icon: '😟' },
    ],
  },
  {
    id: 'incomeLevel',
    titleKey: 'q.income.title',
    options: [
      { value: 'low', labelKey: 'q.income.low', icon: '💰' },
      { value: 'medium', labelKey: 'q.income.medium', icon: '💵' },
      { value: 'high', labelKey: 'q.income.high', icon: '💎' },
    ],
  },
  {
    id: 'priorities',
    titleKey: 'q.priorities.title',
    multiSelect: true,
    options: [
      { value: 'work', labelKey: 'q.priorities.work', icon: '💼' },
      { value: 'health', labelKey: 'q.priorities.health', icon: '❤️' },
      { value: 'family', labelKey: 'q.priorities.family', icon: '👨‍👩‍👧‍👦' },
      { value: 'learning', labelKey: 'q.priorities.learning', icon: '📚' },
      { value: 'finance', labelKey: 'q.priorities.finance', icon: '💹' },
      { value: 'spiritual', labelKey: 'q.priorities.spiritual', icon: '🕌' },
    ],
  },
  {
    id: 'sleepQuality',
    titleKey: 'q.sleep.title',
    options: [
      { value: 'excellent', labelKey: 'q.sleep.excellent', icon: '😴' },
      { value: 'good', labelKey: 'q.sleep.good', icon: '🛏️' },
      { value: 'fair', labelKey: 'q.sleep.fair', icon: '😪' },
      { value: 'poor', labelKey: 'q.sleep.poor', icon: '🥱' },
    ],
  },
  {
    id: 'exerciseFrequency',
    titleKey: 'q.exercise.title',
    options: [
      { value: 'daily', labelKey: 'q.exercise.daily', icon: '🏃' },
      { value: 'weekly', labelKey: 'q.exercise.weekly', icon: '🚶' },
      { value: 'occasional', labelKey: 'q.exercise.occasional', icon: '🧘' },
      { value: 'rarely', labelKey: 'q.exercise.rarely', icon: '🛋️' },
    ],
  },
  {
    id: 'spiritualImportance',
    titleKey: 'q.spiritual.title',
    options: [
      { value: 'very-important', labelKey: 'q.spiritual.very-important', icon: '🕋' },
      { value: 'important', labelKey: 'q.spiritual.important', icon: '📿' },
      { value: 'somewhat', labelKey: 'q.spiritual.somewhat', icon: '🌙' },
      { value: 'not-important', labelKey: 'q.spiritual.not-important', icon: '🌍' },
    ],
  },
];
