import { useState, useEffect } from 'react';

// Define types for the new menu structure
export interface MenuItem {
  id: string;
  name: {
    en: string;
    mr: string;
  };
  description: {
    en: string;
    mr: string;
  };
  price: number | { full: number; half: number };
  image: string;
  isAvailable: boolean;
  spiceLevel: {
    en: string;
    mr: string;
  };
  vegOrNonVeg: 'veg' | 'non-veg';
  tags: string[];
  note?: {
    en: string;
    mr: string;
  };
}

export interface MenuData {
  restaurantName: string;
  lastUpdated: string;
  todaysSpecialConfig: {
    showTodaysSpecial: boolean;
    items: MenuItem[];
  };
  menu: {
    [category: string]: MenuItem[];
  };
}

export interface LegacyMenuCategory {
  name: {
    en: string;
    mr: string;
  };
  items: {
    name: {
      en: string;
      mr: string;
    };
    price: number | { full: number; half: number };
    note?: string;
  }[];
}

export interface LegacyMenuData {
  categories: LegacyMenuCategory[];
}

// Hook to fetch menu data with fallback
export const useMenuData = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from Firebase/Firestore
  const fetchFromFirebase = async (): Promise<MenuData | null> => {
    try {
      // TODO: Replace with actual Firebase/Firestore implementation
      // For now, we'll simulate a Firebase call that fails
      // This is where you would integrate with Supabase instead
      console.log('Attempting to fetch from Firebase...');
      
      // Simulating Firebase call that might fail
      // In real implementation, you would use Supabase:
      // const { data, error } = await supabase
      //   .from('menu_data')
      //   .select('*')
      //   .single();
      
      return null; // Firebase not available
    } catch (error) {
      console.warn('Firebase fetch failed:', error);
      return null;
    }
  };

  // Function to load fallback JSON data
  const loadFallbackData = async (): Promise<MenuData> => {
    try {
      const response = await fetch('/src/data/menu-new.json');
      if (!response.ok) {
        throw new Error('Failed to load fallback menu data');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to load fallback data:', error);
      throw error;
    }
  };

  // Function to convert legacy menu format to new format
  const convertLegacyToNewFormat = (legacyData: LegacyMenuData): MenuData => {
    const newMenuData: MenuData = {
      restaurantName: "Naivedya",
      lastUpdated: new Date().toISOString(),
      todaysSpecialConfig: {
        showTodaysSpecial: false,
        items: []
      },
      menu: {}
    };

    legacyData.categories.forEach((category, categoryIndex) => {
      const categoryKey = category.name.en;
      newMenuData.menu[categoryKey] = category.items.map((item, itemIndex) => ({
        id: `item${categoryIndex}_${itemIndex}`,
        name: item.name,
        description: {
          en: `${item.name.en} prepared in traditional style.`,
          mr: `पारंपरिक पद्धतीने बनवलेले ${item.name.mr}.`
        },
        price: item.price,
        image: `https://placeholder.com/food/${item.name.en.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        isAvailable: true,
        spiceLevel: {
          en: "mild",
          mr: "हलके"
        },
        vegOrNonVeg: categoryKey.toLowerCase().includes('non-veg') || 
                     categoryKey.toLowerCase().includes('egg') || 
                     categoryKey.toLowerCase().includes('chicken') ||
                     categoryKey.toLowerCase().includes('mutton') ||
                     categoryKey.toLowerCase().includes('fish') ||
                     categoryKey.toLowerCase().includes('prawns') ? 'non-veg' : 'veg',
        tags: [categoryKey.toLowerCase()],
        ...(item.note && {
          note: {
            en: item.note,
            mr: item.note
          }
        })
      }));
    });

    return newMenuData;
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, try to fetch from Firebase/Firestore
        let data = await fetchFromFirebase();

        if (!data) {
          console.log('Firebase data not available, using fallback JSON data');
          
          try {
            // Try to load new format JSON
            data = await loadFallbackData();
          } catch (fallbackError) {
            // If new format fails, try legacy format
            console.log('New format not available, trying legacy format...');
            try {
              const legacyResponse = await fetch('/src/data/menu.json');
              if (legacyResponse.ok) {
                const legacyData: LegacyMenuData = await legacyResponse.json();
                data = convertLegacyToNewFormat(legacyData);
              } else {
                throw new Error('No menu data available');
              }
            } catch (legacyError) {
              throw new Error('Failed to load any menu data format');
            }
          }
        }

        setMenuData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Function to refresh data (useful for manual refresh)
  const refreshData = async () => {
    const fetchMenuData = async () => {
      setLoading(true);
      setError(null);

      try {
        let data = await fetchFromFirebase();
        if (!data) {
          data = await loadFallbackData();
        }
        setMenuData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    await fetchMenuData();
  };

  return {
    menuData,
    loading,
    error,
    refreshData
  };
};