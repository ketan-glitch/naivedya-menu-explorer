import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Eye } from 'lucide-react';
import heroImage from '@/assets/restaurant-hero.jpg';

interface HeroSectionProps {
  onViewMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewMenu }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            {t('welcome')}
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t('restaurantName')}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg shadow-warm bg-gradient-hero hover:opacity-90 transition-opacity"
            >
              <Phone className="w-5 h-5 mr-2" />
              {t('orderNow')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={onViewMenu}
            >
              <Eye className="w-5 h-5 mr-2" />
              {t('viewMenu')}
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-restaurant-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Fresh & Authentic</h3>
              <p className="text-muted-foreground">Made with fresh ingredients and traditional recipes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-restaurant-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Home-style Cooking</h3>
              <p className="text-muted-foreground">Taste of home in every bite</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-restaurant-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quick Delivery</h3>
              <p className="text-muted-foreground">Fast and reliable food delivery service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};