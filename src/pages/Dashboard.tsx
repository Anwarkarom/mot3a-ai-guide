import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import {
  ProgramSection,
  TimeBlockItem,
  TipCard,
  LearningTaskItem,
  FinancialStepItem,
  ActivityItem,
  SupplicationItem,
} from '@/components/ProgramSection';
import { RefreshCw, Sparkles, Calendar } from 'lucide-react';
import { DailyProgram } from '@/types';

const Dashboard: React.FC = () => {
  const { language, dailyProgram, setDailyProgram, userProfile, isLoading, setIsLoading } = useApp();
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Redirect to onboarding if no program
  React.useEffect(() => {
    if (!dailyProgram && !isLoading) {
      navigate('/onboarding');
    }
  }, [dailyProgram, isLoading, navigate]);

  const handleRefresh = async () => {
    if (!userProfile) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-program`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          userProfile,
          language,
        }),
      });

      if (!response.ok) throw new Error('Failed to refresh');
      
      const program = await response.json();
      setDailyProgram(program);
      setCompletedSteps(new Set());
    } catch (error) {
      console.error('Error refreshing program:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <LoadingSpinner variant="overlay" message={t('dashboard.loading', language)} />
      </>
    );
  }

  if (!dailyProgram) {
    return null;
  }

  const { sections } = dailyProgram;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navigation />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(dailyProgram.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {dailyProgram.greeting}
              </h1>
            </div>
            <Button
              variant="neumorphic"
              onClick={handleRefresh}
              className="gap-2 self-start md:self-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t('dashboard.refresh', language)}</span>
            </Button>
          </div>

          {/* Motivational Quote */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-lg text-foreground italic">"{dailyProgram.motivationalQuote}"</p>
            </div>
          </div>
        </div>

        {/* Program Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Time & Focus */}
          <ProgramSection title={sections.timeAndFocus.title} icon="time">
            {sections.timeAndFocus.timeBlocks.map((block, index) => (
              <TimeBlockItem key={index} {...block} />
            ))}
          </ProgramSection>

          {/* Nutrition */}
          <ProgramSection title={sections.nutritionAndEnergy.title} icon="nutrition">
            {sections.nutritionAndEnergy.tips.map((tip, index) => (
              <TipCard key={index} {...tip} />
            ))}
          </ProgramSection>

          {/* Learning */}
          <ProgramSection title={sections.learningAndSelfDevelopment.title} icon="learning">
            {sections.learningAndSelfDevelopment.tasks.map((task, index) => (
              <LearningTaskItem key={index} {...task} />
            ))}
          </ProgramSection>

          {/* Finance */}
          <ProgramSection title={sections.financeAndWisdom.title} icon="finance">
            {sections.financeAndWisdom.steps.map((step, index) => (
              <FinancialStepItem
                key={index}
                {...step}
                completed={completedSteps.has(index)}
                onToggle={() => toggleStep(index)}
              />
            ))}
          </ProgramSection>

          {/* Entertainment */}
          <ProgramSection title={sections.entertainmentAndRecharge.title} icon="entertainment">
            {sections.entertainmentAndRecharge.activities.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </ProgramSection>

          {/* Spiritual Content - Full width */}
          <div className="md:col-span-2">
            <ProgramSection title={sections.spiritualContent.title} icon="spiritual" variant="gold">
              <div className="grid md:grid-cols-2 gap-4">
                {sections.spiritualContent.supplications.map((supplication, index) => (
                  <SupplicationItem key={index} {...supplication} />
                ))}
              </div>
            </ProgramSection>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
