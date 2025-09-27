import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Menu } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const { language, setLanguage, t } = useLanguage();

  const navigationItems = [
    { id: 'home', label: t('home') },
    { id: 'menu', label: t('menu') },
    { id: 'specials', label: t('specials') },
    { id: 'contact', label: t('contact') }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-elegant">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">न</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('restaurantName')}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Authentic Maharashtrian Cuisine</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary relative ${
                  activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  language === 'en' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-secondary-foreground hover:text-primary'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  language === 'mr' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-secondary-foreground hover:text-primary'
                }`}
              >
                मर
              </button>
            </div>

            {/* Call Button */}
            <Button size="sm" className="hidden sm:flex items-center space-x-2 shadow-warm">
              <Phone className="w-4 h-4" />
              <span>{t('callToOrder')}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden mt-4 flex flex-wrap gap-4">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${
                activeSection === item.id ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};