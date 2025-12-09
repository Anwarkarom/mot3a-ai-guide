import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { QuestionnaireAnswers, Language } from '@/types';
import { onboardingQuestions } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { QuestionCard } from '@/components/QuestionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const Onboarding: React.FC = () => {
  const { language, setUserProfile, setDailyProgram, setHasCompletedOnboarding, setIsLoading, isLoading } = useApp();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireAnswers>>({});
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);

  const totalSteps = onboardingQuestions.length;
  const currentQuestion = onboardingQuestions[currentStep];

  const handleAnswer = (value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStartQuestions = () => {
    setShowLanguageSelection(false);
  };

  const handleFinish = async () => {
    setIsLoading(true);

    // Create user profile
    const profile = {
      language,
      answers: answers as QuestionnaireAnswers,
    };

    setUserProfile(profile);

    try {
      // Call the API to generate the program
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-program`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          userProfile: profile,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate program');
      }

      const program = await response.json();
      setDailyProgram(program);
      setHasCompletedOnboarding(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error generating program:', error);
      // For now, create a mock program if API fails
      const mockProgram = createMockProgram(language, answers as QuestionnaireAnswers);
      setDailyProgram(mockProgram);
      setHasCompletedOnboarding(true);
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const currentValue = answers[currentQuestion?.id] || (currentQuestion?.multiSelect ? [] : '');
  const canProceed = currentQuestion?.multiSelect 
    ? (currentValue as string[]).length > 0 
    : currentValue !== '';

  if (isLoading) {
    return (
      <LoadingSpinner 
        variant="overlay" 
        message={t('onboarding.generating', language)} 
      />
    );
  }

  if (showLanguageSelection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary shadow-lg mb-6 animate-float">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('onboarding.title', language)}
            </h1>
            <p className="text-muted-foreground text-lg">
              {language === 'ar' ? 'اختر لغتك المفضلة' : language === 'fr' ? 'Choisissez votre langue' : 'Choose your preferred language'}
            </p>
          </div>

          <LanguageSelector variant="cards" />

          <div className="mt-12 text-center">
            <Button
              variant="hero"
              size="xl"
              onClick={handleStartQuestions}
              className="group"
            >
              <span>{t('onboarding.next', language)}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with progress */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <ProgressBar current={currentStep + 1} total={totalSteps} />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            value={currentValue}
            onChange={handleAnswer}
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border/50 py-4 mb-16 md:mb-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('onboarding.back', language)}</span>
            </Button>

            {currentStep === totalSteps - 1 ? (
              <Button
                variant="gold"
                size="lg"
                onClick={handleFinish}
                disabled={!canProceed}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('onboarding.finish', language)}</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                onClick={handleNext}
                disabled={!canProceed}
                className="gap-2"
              >
                <span>{t('onboarding.next', language)}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock program generator for fallback
function createMockProgram(language: Language, answers: QuestionnaireAnswers) {
  const today = new Date().toISOString().split('T')[0];
  
  const greetings = {
    ar: 'صباح الخير! إليك برنامجك المخصص لهذا اليوم',
    fr: 'Bonjour! Voici votre programme personnalisé pour aujourd\'hui',
    en: 'Good morning! Here\'s your personalized program for today',
  };

  const quotes = {
    ar: 'كل يوم هو فرصة جديدة للنمو والتحسن',
    fr: 'Chaque jour est une nouvelle opportunité de croître',
    en: 'Every day is a new opportunity to grow and improve',
  };

  return {
    date: today,
    language,
    greeting: greetings[language as keyof typeof greetings] || greetings.en,
    motivationalQuote: quotes[language as keyof typeof quotes] || quotes.en,
    sections: {
      timeAndFocus: {
        title: language === 'ar' ? 'إدارة الوقت والتركيز' : language === 'fr' ? 'Gestion du temps' : 'Time & Focus',
        timeBlocks: [
          {
            startTime: '06:00',
            endTime: '07:00',
            description: language === 'ar' ? 'وقت الصباح الهادئ' : language === 'fr' ? 'Temps calme du matin' : 'Quiet morning time',
            focusGoal: language === 'ar' ? 'تأمل وتخطيط' : language === 'fr' ? 'Méditation et planification' : 'Meditation and planning',
            priority: 'high' as const,
          },
          {
            startTime: '09:00',
            endTime: '12:00',
            description: language === 'ar' ? 'وقت العمل المركز' : language === 'fr' ? 'Temps de travail concentré' : 'Focused work time',
            focusGoal: language === 'ar' ? 'تركيز عميق' : language === 'fr' ? 'Concentration profonde' : 'Deep focus',
            priority: 'high' as const,
          },
        ],
      },
      nutritionAndEnergy: {
        title: language === 'ar' ? 'التغذية والطاقة' : language === 'fr' ? 'Nutrition et énergie' : 'Nutrition & Energy',
        tips: [
          {
            title: language === 'ar' ? 'ابدأ بالماء' : language === 'fr' ? 'Commencez par l\'eau' : 'Start with water',
            description: language === 'ar' ? 'اشرب كوباً من الماء عند الاستيقاظ' : language === 'fr' ? 'Buvez un verre d\'eau au réveil' : 'Drink a glass of water when you wake up',
          },
        ],
      },
      learningAndSelfDevelopment: {
        title: language === 'ar' ? 'التعلم والتطوير' : language === 'fr' ? 'Apprentissage' : 'Learning',
        tasks: [
          {
            topic: language === 'ar' ? 'قراءة مقال' : language === 'fr' ? 'Lire un article' : 'Read an article',
            difficulty: 'easy' as const,
            duration: '20 min',
            resourceType: 'article' as const,
            description: language === 'ar' ? 'اقرأ مقالاً في مجال اهتمامك' : language === 'fr' ? 'Lisez un article dans votre domaine' : 'Read an article in your field',
          },
        ],
      },
      financeAndWisdom: {
        title: language === 'ar' ? 'الحكمة المالية' : language === 'fr' ? 'Sagesse financière' : 'Financial Wisdom',
        steps: [
          {
            title: language === 'ar' ? 'راجع ميزانيتك' : language === 'fr' ? 'Révisez votre budget' : 'Review your budget',
            description: language === 'ar' ? 'خصص 10 دقائق لمراجعة مصاريفك' : language === 'fr' ? 'Consacrez 10 minutes à vos dépenses' : 'Spend 10 minutes reviewing your expenses',
            completed: false,
          },
        ],
      },
      entertainmentAndRecharge: {
        title: language === 'ar' ? 'الترفيه والراحة' : language === 'fr' ? 'Divertissement' : 'Entertainment',
        activities: [
          {
            title: language === 'ar' ? 'مشي قصير' : language === 'fr' ? 'Courte promenade' : 'Short walk',
            description: language === 'ar' ? 'امشِ لمدة 15 دقيقة في الهواء الطلق' : language === 'fr' ? 'Marchez 15 minutes en plein air' : 'Walk for 15 minutes outdoors',
            type: 'solo' as const,
            duration: '15 min',
          },
        ],
      },
      spiritualContent: {
        title: language === 'ar' ? 'المحتوى الروحي' : language === 'fr' ? 'Contenu spirituel' : 'Spiritual Content',
        supplications: [
          {
            arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
            transliteration: 'Allahumma inni as\'aluka ilman nafi\'an wa rizqan tayyiban wa amalan mutaqabbalan',
            meaning: language === 'ar' 
              ? 'دعاء طلب العلم النافع والرزق الطيب'
              : language === 'fr'
              ? 'Ô Allah, je Te demande une science bénéfique, une subsistance pure et des œuvres agréées'
              : 'O Allah, I ask You for beneficial knowledge, pure sustenance, and accepted deeds',
            context: language === 'ar' ? 'دعاء الصباح' : language === 'fr' ? 'Invocation du matin' : 'Morning supplication',
          },
        ],
      },
    },
  };
}

export default Onboarding;
