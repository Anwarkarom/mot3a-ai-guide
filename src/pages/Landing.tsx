import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { 
  Sparkles, 
  Brain, 
  Heart, 
  Moon,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const Landing: React.FC = () => {
  const { language, hasCompletedOnboarding } = useApp();
  const navigate = useNavigate();

  const handleStart = () => {
    if (hasCompletedOnboarding) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  const features = [
    {
      icon: Brain,
      titleKey: 'landing.features.personalized',
      descKey: 'landing.features.personalized.desc',
    },
    {
      icon: Heart,
      titleKey: 'landing.features.holistic',
      descKey: 'landing.features.holistic.desc',
    },
    {
      icon: Moon,
      titleKey: 'landing.features.spiritual',
      descKey: 'landing.features.spiritual.desc',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Language selector */}
          <div className="flex justify-center mb-12">
            <LanguageSelector variant="cards" />
          </div>

          {/* Main hero content */}
          <div className="text-center max-w-3xl mx-auto relative z-10">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary shadow-lg shadow-primary/30 mb-8 animate-float">
              <Sparkles className="w-12 h-12 text-primary-foreground" />
            </div>

            {/* App name */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
              {t('app.name', language)}
            </h1>
            
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              {t('app.tagline', language)}
            </p>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('app.description', language)}
            </p>

            {/* CTA Button */}
            <Button
              variant="hero"
              size="xl"
              onClick={handleStart}
              className="group"
            >
              <span>{t('landing.cta.start', language)}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.titleKey}
                  className="neumorphic p-8 rounded-3xl text-center group hover:scale-[1.02] transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t(feature.titleKey, language)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(feature.descKey, language)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="neumorphic p-8 md:p-12 rounded-3xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    {language === 'ar' ? 'كيف يعمل؟' : language === 'fr' ? 'Comment ça marche?' : 'How it works?'}
                  </h2>
                  <ul className="space-y-4">
                    {[
                      language === 'ar' ? 'أجب عن 10 أسئلة بسيطة' : language === 'fr' ? 'Répondez à 10 questions simples' : 'Answer 10 simple questions',
                      language === 'ar' ? 'يحلل الذكاء الاصطناعي حالتك' : language === 'fr' ? 'L\'IA analyse votre état' : 'AI analyzes your state',
                      language === 'ar' ? 'احصل على برنامج يومي مخصص' : language === 'fr' ? 'Obtenez un programme personnalisé' : 'Get a personalized daily program',
                    ].map((step, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-3xl bg-accent/20 flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-accent animate-pulse-soft" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Button
            variant="gold"
            size="xl"
            onClick={handleStart}
            className="group"
          >
            <Sparkles className="w-5 h-5" />
            <span>{t('landing.cta.start', language)}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
