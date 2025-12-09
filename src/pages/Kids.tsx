import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Navigation } from '@/components/Navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Baby, BookOpen, Palette, Dumbbell, Gamepad2, Sparkles } from 'lucide-react';

const Kids: React.FC = () => {
  const { language, dailyProgram } = useApp();

  const activityIcons = {
    educational: BookOpen,
    creative: Palette,
    physical: Dumbbell,
    entertainment: Gamepad2,
  };

  const activityColors = {
    educational: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    creative: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    physical: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    entertainment: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  };

  // Sample kids activities if not in program
  const kidsActivities = dailyProgram?.sections.kidsContent?.activities || [
    {
      title: language === 'ar' ? 'قراءة قصة' : language === 'fr' ? 'Lecture d\'une histoire' : 'Story Reading',
      description: language === 'ar' 
        ? 'اقرأ قصة قصيرة ملونة مع طفلك'
        : language === 'fr'
        ? 'Lisez une courte histoire colorée avec votre enfant'
        : 'Read a short colorful story with your child',
      ageRange: '3-6',
      type: 'educational' as const,
      duration: '15 min',
    },
    {
      title: language === 'ar' ? 'الرسم والتلوين' : language === 'fr' ? 'Dessin et coloriage' : 'Drawing & Coloring',
      description: language === 'ar'
        ? 'ارسم صورة من الطبيعة أو حيوان مفضل'
        : language === 'fr'
        ? 'Dessinez une image de la nature ou un animal préféré'
        : 'Draw a picture of nature or a favorite animal',
      ageRange: '4-8',
      type: 'creative' as const,
      duration: '20 min',
    },
    {
      title: language === 'ar' ? 'تمارين حركية' : language === 'fr' ? 'Exercices de mouvement' : 'Movement Exercises',
      description: language === 'ar'
        ? 'تمارين بسيطة وممتعة للأطفال'
        : language === 'fr'
        ? 'Exercices simples et amusants pour les enfants'
        : 'Simple and fun exercises for children',
      ageRange: '3-10',
      type: 'physical' as const,
      duration: '10 min',
    },
    {
      title: language === 'ar' ? 'لعبة ذكاء' : language === 'fr' ? 'Jeu d\'intelligence' : 'Brain Game',
      description: language === 'ar'
        ? 'ألغاز بسيطة تنمي التفكير'
        : language === 'fr'
        ? 'Puzzles simples qui développent la réflexion'
        : 'Simple puzzles that develop thinking',
      ageRange: '5-10',
      type: 'entertainment' as const,
      duration: '15 min',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navigation />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 mb-4">
            <Baby className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {t('section.kids', language)}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === 'ar' 
              ? 'أنشطة ممتعة ومفيدة لأطفالك'
              : language === 'fr'
              ? 'Activités amusantes et bénéfiques pour vos enfants'
              : 'Fun and beneficial activities for your children'
            }
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {kidsActivities.map((activity, index) => {
            const Icon = activityIcons[activity.type] || Sparkles;
            return (
              <Card 
                key={index} 
                variant="neumorphic" 
                className="overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${activityColors[activity.type]}
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                      {activity.ageRange} {language === 'ar' ? 'سنوات' : language === 'fr' ? 'ans' : 'years'}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-3">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-accent">
                    <span>⏱️</span>
                    <span>{activity.duration}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card variant="gold" className="p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {language === 'ar' ? 'نصيحة اليوم' : language === 'fr' ? 'Conseil du jour' : 'Tip of the day'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'ar'
                    ? 'شارك أطفالك في الأنشطة واجعلها وقتاً ممتعاً للتواصل العائلي'
                    : language === 'fr'
                    ? 'Participez aux activités avec vos enfants et faites-en un moment agréable de connexion familiale'
                    : 'Participate in activities with your children and make it an enjoyable family bonding time'
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Kids;
