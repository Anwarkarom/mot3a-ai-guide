import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { LanguageSelector } from './LanguageSelector';
import { Home, LayoutDashboard, Baby, Settings, Sparkles } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { language } = useApp();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, labelKey: 'nav.home' },
    { path: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
    { path: '/kids', icon: Baby, labelKey: 'nav.kids' },
    { path: '/settings', icon: Settings, labelKey: 'nav.settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-lg transition-shadow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              {t('app.name', language)}
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(item.labelKey, language)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Selector */}
          <div className="hidden md:block">
            <LanguageSelector variant="minimal" showLabel={false} />
          </div>

          {/* Mobile Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 z-50">
            <div className="flex items-center justify-around py-2 px-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex flex-col items-center gap-1 px-3 py-2 rounded-xl
                      transition-all duration-200
                      ${isActive(item.path)
                        ? 'text-primary'
                        : 'text-muted-foreground'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive(item.path) ? 'scale-110' : ''} transition-transform`} />
                    <span className="text-xs font-medium">{t(item.labelKey, language)}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
