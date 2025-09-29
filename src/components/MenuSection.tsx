import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMenuData } from '@/hooks/useMenuData';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

type FilterType = 'all' | 'veg' | 'nonveg';

interface MenuItem {
  name: { en: string; mr: string };
  price: number | { full: number; half: number };
  note?: string;
}

interface MenuCategory {
  name: { en: string; mr: string };
  items: MenuItem[];
}

export const MenuSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { menuData, loading, error } = useMenuData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  // Determine if a category is vegetarian or non-vegetarian
  const getCategoryType = (categoryName: string): 'veg' | 'nonveg' => {
    const vegKeywords = ['veg', 'roti', 'paratha', 'bhaji', 'rice', 'dal', 'chatpata', 'sweets', 'drinks', 'thali'];
    const nonVegKeywords = ['non-veg', 'egg', 'chicken', 'mutton', 'fish', 'prawns', 'fry'];
    
    const lowerCaseName = categoryName.toLowerCase();
    
    if (nonVegKeywords.some(keyword => lowerCaseName.includes(keyword))) {
      return 'nonveg';
    }
    
    return 'veg';
  };

  const filteredCategories = useMemo(() => {
    if (!menuData) return [];
    
    const categories = Object.entries(menuData.menu).map(([categoryName, items]) => ({
      name: { en: categoryName, mr: categoryName },
      items: items
    }));
    
    return categories.filter(category => {
      const categoryType = getCategoryType(category.name.en);
      
      // Filter by veg/non-veg
      if (filter === 'veg' && categoryType !== 'veg') return false;
      if (filter === 'nonveg' && categoryType !== 'nonveg') return false;
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const categoryMatch = 
          category.name.en.toLowerCase().includes(searchLower) ||
          category.name.mr.toLowerCase().includes(searchLower);
        
        const itemMatch = category.items.some(item => 
          item.name.en.toLowerCase().includes(searchLower) ||
          item.name.mr.toLowerCase().includes(searchLower)
        );
        
        return categoryMatch || itemMatch;
      }
      
      return true;
    });
  }, [menuData, filter, searchTerm]);

  if (loading) return <div className="py-16 text-center">Loading menu...</div>;
  if (error) return <div className="py-16 text-center">Error: {error}</div>;

  const toggleCategory = (categoryName: string) => {
    const newOpenCategories = new Set(openCategories);
    if (openCategories.has(categoryName)) {
      newOpenCategories.delete(categoryName);
    } else {
      newOpenCategories.add(categoryName);
    }
    setOpenCategories(newOpenCategories);
  };

  const formatPrice = (price: number | { full: number; half: number }) => {
    if (typeof price === 'number') {
      return `${t('price')}${price}`;
    } else {
      return `${t('fullPlate')}: ${t('price')}${price.full} / ${t('halfPlate')}: ${t('price')}${price.half}`;
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    const categoryType = getCategoryType(categoryName);
    return categoryType === 'veg' ? '🌱' : '🍗';
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">{t('menu')}</h2>
          <p className="text-xl text-muted-foreground">Explore our delicious offerings</p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="shadow-elegant"
            >
              {t('filterAll')}
            </Button>
            <Button
              variant={filter === 'veg' ? 'default' : 'outline'}
              onClick={() => setFilter('veg')}
              className="shadow-elegant"
            >
              {t('filterVeg')}
            </Button>
            <Button
              variant={filter === 'nonveg' ? 'default' : 'outline'}
              onClick={() => setFilter('nonveg')}
              className="shadow-elegant"
            >
              {t('filterNonVeg')}
            </Button>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.name.en} className="shadow-elegant bg-gradient-card">
                <Collapsible
                  open={openCategories.has(category.name.en)}
                  onOpenChange={() => toggleCategory(category.name.en)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="w-full p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getCategoryIcon(category.name.en)}</span>
                          <h3 className="text-2xl font-bold text-foreground">
                            {category.name[language]}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {category.items.length} items
                          </span>
                          {openCategories.has(category.name.en) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="grid gap-4">
                        {category.items.map((item, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between p-4 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground text-lg">
                                {item.name[language]}
                              </h4>
                              {item.note && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.note}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary text-lg">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};