import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Navigation } from '@/components/Navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Settings as SettingsIcon, 
  Globe, 
  User, 
  RotateCcw,
  Sparkles,
  Heart
} from 'lucide-react';

const Settings: React.FC = () => {
  const { language, userProfile, setHasCompletedOnboarding, setDailyProgram, setUserProfile } = useApp();
  const navigate = useNavigate();

  const handleRetakeQuestionnaire = () => {
    setHasCompletedOnboarding(false);
    setDailyProgram(null);
    setUserProfile(null);
    navigate('/onboarding');
  };

  const getAnswerLabel = (key: string, value: string | string[] | undefined) => {
    if (!value) return '-';
    if (Array.isArray(value)) {
      return value.map(v => t(`q.${key}.${v}`, language)).join(', ');
    }
    return t(`q.${key}.${value}`, language);
  };

  const profileItems = userProfile ? [
    { label: 'q.mood.title', value: getAnswerLabel('mood', userProfile.answers.mood) },
    { label: 'q.resistance.title', value: getAnswerLabel('resistance', userProfile.answers.resistanceToChange) },
    { label: 'q.thinking.title', value: getAnswerLabel('thinking', userProfile.answers.thinkingStyle) },
    { label: 'q.energy.title', value: getAnswerLabel('energy', userProfile.answers.energyRecharge) },
    { label: 'q.financial.title', value: getAnswerLabel('financial', userProfile.answers.financialStress) },
    { label: 'q.priorities.title', value: getAnswerLabel('priorities', userProfile.answers.priorities) },
  ] : [];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navigation />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <SettingsIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {t('settings.title', language)}
          </h1>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <Card variant="neumorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                {t('settings.language', language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LanguageSelector variant="default" showLabel={false} />
            </CardContent>
          </Card>

          {/* Profile Summary */}
          {userProfile && (
            <Card variant="neumorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  {t('settings.profile', language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-start py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm text-muted-foreground">
                        {t(item.label, language)}
                      </span>
                      <span className="text-sm font-medium text-foreground text-right max-w-[50%]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Retake Questionnaire */}
          <Card variant="neumorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                {t('settings.retake', language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'ar'
                  ? 'أعد الاستبيان للحصول على برنامج جديد يناسب حالتك الحالية'
                  : language === 'fr'
                  ? 'Refaites le questionnaire pour obtenir un nouveau programme adapté à votre état actuel'
                  : 'Retake the questionnaire to get a new program suited to your current state'
                }
              </p>
              <Button
                variant="outline"
                onClick={handleRetakeQuestionnaire}
                className="w-full gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {t('settings.retake', language)}
              </Button>
            </CardContent>
          </Card>

          {/* About */}
          <Card variant="gold">
            <CardContent className="pt-6">
              <div className="text-center">
                <Sparkles className="w-10 h-10 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">
                  {t('app.name', language)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('app.tagline', language)}
                </p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  {language === 'ar' ? 'صُنع بـ' : language === 'fr' ? 'Fait avec' : 'Made with'}
                  <Heart className="w-3 h-3 text-destructive inline" />
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
