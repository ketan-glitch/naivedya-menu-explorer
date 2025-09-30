import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMenuData } from '@/hooks/useMenuData';
import { Phone } from 'lucide-react';

export const SpecialsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { menuData, loading, error } = useMenuData();

  if (loading) return <div className="py-16 text-center">Loading specials...</div>;
  if (error) return <div className="py-16 text-center">Error: {error}</div>;

  // Get today's special items or featured items
  const featuredItems = menuData?.todaysSpecialConfig?.showTodaysSpecial 
    ? menuData.todaysSpecialConfig.items 
    : [];

  // Get Thali categories  
  const thaliCategories = menuData ? Object.entries(menuData.menu)
    .filter(([categoryName]) => categoryName.toLowerCase().includes('thali'))
    .map(([categoryName, items]) => ({
      name: { en: categoryName, mr: categoryName },
      items: items
    })) : [];

  const formatPrice = (price: number | { full: number; half: number }) => {
    if (typeof price === 'number') {
      return `${t('price')}${price}`;
    } else {
      return `${t('fullPlate')}: ${t('price')}${price.full} / ${t('halfPlate')}: ${t('price')}${price.half}`;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">{t('specials')}</h2>
          <p className="text-xl text-muted-foreground">Our signature dishes and complete meal options</p>
        </div>

        {/* Featured Specials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredItems.map((item, index) => (
            <Card key={index} className="shadow-elegant hover:shadow-warm transition-shadow bg-gradient-card group">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {item.image}
                </div>
                <CardTitle className="text-xl text-foreground">
                  {item.name[language]}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4 text-sm">
                  {item.description[language]}
                </p>
                <p className="font-bold text-primary text-lg mb-4">
                  {formatPrice(item.price)}
                </p>
                <Button size="sm" className="w-full shadow-warm">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('orderNow')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Thali Menu */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">Complete Thali Menu</h3>
          <div className="grid gap-6">
            {thaliCategories.map((category) => (
              <Card key={category.name.en} className="shadow-elegant bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <span className="text-3xl">
                      {category.name.en.toLowerCase().includes('non-veg') ? '🍗' : '🌱'}
                    </span>
                    <span className="text-foreground">{category.name[language]}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {category.items.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-background rounded-lg shadow-sm border"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-lg">
                            {item.name[language]}
                          </h4>
                          {category.name.en === 'Veg Thali' && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {language === 'en' 
                                ? "Includes rice, roti, dal, bhaji, papad, pickle & sweet"
                                : "भात, पोळी, डाळ, भाजी, पापड, लोणचं आणि गोड समाविष्ट"
                              }
                            </p>
                          )}
                          {category.name.en === 'Non-Veg Thali' && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {language === 'en' 
                                ? "Includes rice, roti, dal, bhaji, main course, papad & pickle"
                                : "भात, पोळी, डाळ, भाजी, मुख्य पदार्थ, पापड आणि लोणचं समाविष्ट"
                              }
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-lg">
                            {formatPrice(item.price)}
                          </p>
                          <Button size="sm" variant="outline" className="mt-2">
                            {t('orderNow')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};