import { Language } from '@/types';

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // App name and branding
    'app.name': 'متعة',
    'app.tagline': 'مساعدك الشخصي الذكي',
    'app.description': 'برنامج يومي مخصص يتكيف مع حالتك النفسية واحتياجاتك',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.dashboard': 'برنامجي',
    'nav.kids': 'الأطفال',
    'nav.settings': 'الإعدادات',

    // Landing page
    'landing.hero.title': 'برنامجك اليومي المخصص',
    'landing.hero.subtitle': 'دع الذكاء الاصطناعي يساعدك في تنظيم يومك بما يناسب حالتك النفسية ومستواك الفكري',
    'landing.cta.start': 'ابدأ الآن',
    'landing.features.personalized': 'مخصص لك',
    'landing.features.personalized.desc': 'برنامج يومي يتكيف مع حالتك',
    'landing.features.holistic': 'شامل ومتكامل',
    'landing.features.holistic.desc': 'يغطي جميع جوانب حياتك',
    'landing.features.spiritual': 'روحاني',
    'landing.features.spiritual.desc': 'أدعية وأذكار مناسبة',

    // Onboarding
    'onboarding.title': 'دعنا نتعرف عليك',
    'onboarding.subtitle': 'أجب عن بعض الأسئلة لنخصص برنامجك',
    'onboarding.progress': 'السؤال {current} من {total}',
    'onboarding.next': 'التالي',
    'onboarding.back': 'السابق',
    'onboarding.finish': 'إنشاء برنامجي',
    'onboarding.generating': 'جاري إنشاء برنامجك...',

    // Questions
    'q.mood.title': 'كيف تشعر اليوم؟',
    'q.mood.excellent': 'ممتاز',
    'q.mood.good': 'جيد',
    'q.mood.neutral': 'عادي',
    'q.mood.stressed': 'متوتر',
    'q.mood.overwhelmed': 'مرهق',

    'q.resistance.title': 'كيف تتعامل مع التغيير؟',
    'q.resistance.very-open': 'منفتح جداً',
    'q.resistance.open': 'منفتح',
    'q.resistance.cautious': 'حذر',
    'q.resistance.resistant': 'مقاوم',

    'q.thinking.title': 'ما هو أسلوب تفكيرك؟',
    'q.thinking.logical': 'منطقي',
    'q.thinking.intuitive': 'حدسي',
    'q.thinking.balanced': 'متوازن',

    'q.energy.title': 'كيف تستعيد طاقتك؟',
    'q.energy.alone': 'بمفردي',
    'q.energy.social': 'مع الآخرين',
    'q.energy.mixed': 'كلاهما',

    'q.financial.title': 'ما مستوى ضغطك المالي؟',
    'q.financial.none': 'لا يوجد',
    'q.financial.low': 'منخفض',
    'q.financial.moderate': 'متوسط',
    'q.financial.high': 'مرتفع',

    'q.income.title': 'ما مستوى دخلك؟',
    'q.income.low': 'منخفض',
    'q.income.medium': 'متوسط',
    'q.income.high': 'مرتفع',

    'q.priorities.title': 'ما هي أولوياتك الحالية؟',
    'q.priorities.work': 'العمل',
    'q.priorities.health': 'الصحة',
    'q.priorities.family': 'العائلة',
    'q.priorities.learning': 'التعلم',
    'q.priorities.finance': 'المال',
    'q.priorities.spiritual': 'الروحانية',

    'q.sleep.title': 'كيف هي جودة نومك؟',
    'q.sleep.excellent': 'ممتازة',
    'q.sleep.good': 'جيدة',
    'q.sleep.fair': 'مقبولة',
    'q.sleep.poor': 'سيئة',

    'q.exercise.title': 'كم مرة تمارس الرياضة؟',
    'q.exercise.daily': 'يومياً',
    'q.exercise.weekly': 'أسبوعياً',
    'q.exercise.occasional': 'أحياناً',
    'q.exercise.rarely': 'نادراً',

    'q.spiritual.title': 'ما أهمية الجانب الروحي لك؟',
    'q.spiritual.very-important': 'مهم جداً',
    'q.spiritual.important': 'مهم',
    'q.spiritual.somewhat': 'نوعاً ما',
    'q.spiritual.not-important': 'غير مهم',

    // Dashboard
    'dashboard.title': 'برنامجك اليومي',
    'dashboard.greeting': 'صباح الخير',
    'dashboard.refresh': 'تحديث البرنامج',
    'dashboard.loading': 'جاري تحميل برنامجك...',

    // Sections
    'section.time': 'إدارة الوقت والتركيز',
    'section.nutrition': 'التغذية والطاقة',
    'section.learning': 'التعلم والتطوير',
    'section.finance': 'الحكمة المالية',
    'section.entertainment': 'الترفيه والراحة',
    'section.spiritual': 'المحتوى الروحي',
    'section.kids': 'محتوى الأطفال',

    // Settings
    'settings.title': 'الإعدادات',
    'settings.language': 'اللغة',
    'settings.profile': 'الملف الشخصي',
    'settings.retake': 'إعادة الاستبيان',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.retry': 'إعادة المحاولة',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
  },

  fr: {
    // App name and branding
    'app.name': 'Mot3a',
    'app.tagline': 'Votre assistant personnel intelligent',
    'app.description': 'Un programme quotidien personnalisé qui s\'adapte à votre état psychologique',

    // Navigation
    'nav.home': 'Accueil',
    'nav.dashboard': 'Mon Programme',
    'nav.kids': 'Enfants',
    'nav.settings': 'Paramètres',

    // Landing page
    'landing.hero.title': 'Votre programme quotidien personnalisé',
    'landing.hero.subtitle': 'Laissez l\'IA vous aider à organiser votre journée selon votre état mental',
    'landing.cta.start': 'Commencer',
    'landing.features.personalized': 'Personnalisé',
    'landing.features.personalized.desc': 'Un programme adapté à vous',
    'landing.features.holistic': 'Holistique',
    'landing.features.holistic.desc': 'Couvre tous les aspects de vie',
    'landing.features.spiritual': 'Spirituel',
    'landing.features.spiritual.desc': 'Prières et rappels appropriés',

    // Onboarding
    'onboarding.title': 'Apprenons à vous connaître',
    'onboarding.subtitle': 'Répondez à quelques questions pour personnaliser votre programme',
    'onboarding.progress': 'Question {current} sur {total}',
    'onboarding.next': 'Suivant',
    'onboarding.back': 'Retour',
    'onboarding.finish': 'Créer mon programme',
    'onboarding.generating': 'Création de votre programme...',

    // Questions
    'q.mood.title': 'Comment vous sentez-vous aujourd\'hui?',
    'q.mood.excellent': 'Excellent',
    'q.mood.good': 'Bien',
    'q.mood.neutral': 'Neutre',
    'q.mood.stressed': 'Stressé',
    'q.mood.overwhelmed': 'Débordé',

    'q.resistance.title': 'Comment gérez-vous le changement?',
    'q.resistance.very-open': 'Très ouvert',
    'q.resistance.open': 'Ouvert',
    'q.resistance.cautious': 'Prudent',
    'q.resistance.resistant': 'Résistant',

    'q.thinking.title': 'Quel est votre style de pensée?',
    'q.thinking.logical': 'Logique',
    'q.thinking.intuitive': 'Intuitif',
    'q.thinking.balanced': 'Équilibré',

    'q.energy.title': 'Comment rechargez-vous votre énergie?',
    'q.energy.alone': 'Seul',
    'q.energy.social': 'En société',
    'q.energy.mixed': 'Les deux',

    'q.financial.title': 'Quel est votre niveau de stress financier?',
    'q.financial.none': 'Aucun',
    'q.financial.low': 'Faible',
    'q.financial.moderate': 'Modéré',
    'q.financial.high': 'Élevé',

    'q.income.title': 'Quel est votre niveau de revenu?',
    'q.income.low': 'Faible',
    'q.income.medium': 'Moyen',
    'q.income.high': 'Élevé',

    'q.priorities.title': 'Quelles sont vos priorités actuelles?',
    'q.priorities.work': 'Travail',
    'q.priorities.health': 'Santé',
    'q.priorities.family': 'Famille',
    'q.priorities.learning': 'Apprentissage',
    'q.priorities.finance': 'Finances',
    'q.priorities.spiritual': 'Spiritualité',

    'q.sleep.title': 'Comment est la qualité de votre sommeil?',
    'q.sleep.excellent': 'Excellente',
    'q.sleep.good': 'Bonne',
    'q.sleep.fair': 'Correcte',
    'q.sleep.poor': 'Mauvaise',

    'q.exercise.title': 'À quelle fréquence faites-vous de l\'exercice?',
    'q.exercise.daily': 'Quotidiennement',
    'q.exercise.weekly': 'Hebdomadairement',
    'q.exercise.occasional': 'Occasionnellement',
    'q.exercise.rarely': 'Rarement',

    'q.spiritual.title': 'Quelle importance a la spiritualité pour vous?',
    'q.spiritual.very-important': 'Très importante',
    'q.spiritual.important': 'Importante',
    'q.spiritual.somewhat': 'Quelque peu',
    'q.spiritual.not-important': 'Pas importante',

    // Dashboard
    'dashboard.title': 'Votre programme quotidien',
    'dashboard.greeting': 'Bonjour',
    'dashboard.refresh': 'Actualiser',
    'dashboard.loading': 'Chargement de votre programme...',

    // Sections
    'section.time': 'Gestion du temps et focus',
    'section.nutrition': 'Nutrition et énergie',
    'section.learning': 'Apprentissage et développement',
    'section.finance': 'Sagesse financière',
    'section.entertainment': 'Divertissement et repos',
    'section.spiritual': 'Contenu spirituel',
    'section.kids': 'Contenu pour enfants',

    // Settings
    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.profile': 'Profil',
    'settings.retake': 'Refaire le questionnaire',

    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur s\'est produite',
    'common.retry': 'Réessayer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
  },

  en: {
    // App name and branding
    'app.name': 'Mot3a',
    'app.tagline': 'Your intelligent personal assistant',
    'app.description': 'A personalized daily program that adapts to your psychological state',

    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'My Program',
    'nav.kids': 'Kids',
    'nav.settings': 'Settings',

    // Landing page
    'landing.hero.title': 'Your Personalized Daily Program',
    'landing.hero.subtitle': 'Let AI help you organize your day according to your mental state and needs',
    'landing.cta.start': 'Get Started',
    'landing.features.personalized': 'Personalized',
    'landing.features.personalized.desc': 'A program adapted to you',
    'landing.features.holistic': 'Holistic',
    'landing.features.holistic.desc': 'Covers all life aspects',
    'landing.features.spiritual': 'Spiritual',
    'landing.features.spiritual.desc': 'Appropriate prayers and reminders',

    // Onboarding
    'onboarding.title': 'Let\'s get to know you',
    'onboarding.subtitle': 'Answer a few questions to personalize your program',
    'onboarding.progress': 'Question {current} of {total}',
    'onboarding.next': 'Next',
    'onboarding.back': 'Back',
    'onboarding.finish': 'Create my program',
    'onboarding.generating': 'Creating your program...',

    // Questions
    'q.mood.title': 'How are you feeling today?',
    'q.mood.excellent': 'Excellent',
    'q.mood.good': 'Good',
    'q.mood.neutral': 'Neutral',
    'q.mood.stressed': 'Stressed',
    'q.mood.overwhelmed': 'Overwhelmed',

    'q.resistance.title': 'How do you handle change?',
    'q.resistance.very-open': 'Very open',
    'q.resistance.open': 'Open',
    'q.resistance.cautious': 'Cautious',
    'q.resistance.resistant': 'Resistant',

    'q.thinking.title': 'What is your thinking style?',
    'q.thinking.logical': 'Logical',
    'q.thinking.intuitive': 'Intuitive',
    'q.thinking.balanced': 'Balanced',

    'q.energy.title': 'How do you recharge your energy?',
    'q.energy.alone': 'Alone',
    'q.energy.social': 'With others',
    'q.energy.mixed': 'Both',

    'q.financial.title': 'What is your financial stress level?',
    'q.financial.none': 'None',
    'q.financial.low': 'Low',
    'q.financial.moderate': 'Moderate',
    'q.financial.high': 'High',

    'q.income.title': 'What is your income level?',
    'q.income.low': 'Low',
    'q.income.medium': 'Medium',
    'q.income.high': 'High',

    'q.priorities.title': 'What are your current priorities?',
    'q.priorities.work': 'Work',
    'q.priorities.health': 'Health',
    'q.priorities.family': 'Family',
    'q.priorities.learning': 'Learning',
    'q.priorities.finance': 'Finance',
    'q.priorities.spiritual': 'Spirituality',

    'q.sleep.title': 'How is your sleep quality?',
    'q.sleep.excellent': 'Excellent',
    'q.sleep.good': 'Good',
    'q.sleep.fair': 'Fair',
    'q.sleep.poor': 'Poor',

    'q.exercise.title': 'How often do you exercise?',
    'q.exercise.daily': 'Daily',
    'q.exercise.weekly': 'Weekly',
    'q.exercise.occasional': 'Occasionally',
    'q.exercise.rarely': 'Rarely',

    'q.spiritual.title': 'How important is spirituality to you?',
    'q.spiritual.very-important': 'Very important',
    'q.spiritual.important': 'Important',
    'q.spiritual.somewhat': 'Somewhat',
    'q.spiritual.not-important': 'Not important',

    // Dashboard
    'dashboard.title': 'Your Daily Program',
    'dashboard.greeting': 'Good morning',
    'dashboard.refresh': 'Refresh Program',
    'dashboard.loading': 'Loading your program...',

    // Sections
    'section.time': 'Time & Focus Management',
    'section.nutrition': 'Nutrition & Energy',
    'section.learning': 'Learning & Development',
    'section.finance': 'Financial Wisdom',
    'section.entertainment': 'Entertainment & Recharge',
    'section.spiritual': 'Spiritual Content',
    'section.kids': 'Kids Content',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.profile': 'Profile',
    'settings.retake': 'Retake Questionnaire',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Try again',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
  },
};

export const t = (key: string, language: Language, params?: Record<string, string | number>): string => {
  let text = translations[language][key] || translations.en[key] || key;
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value));
    });
  }
  
  return text;
};

export const getDirection = (language: Language): 'rtl' | 'ltr' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

export const getLanguageName = (language: Language): string => {
  const names: Record<Language, string> = {
    ar: 'العربية',
    fr: 'Français',
    en: 'English',
  };
  return names[language];
};
