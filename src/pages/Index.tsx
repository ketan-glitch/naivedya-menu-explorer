import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MenuSection } from '@/components/MenuSection';
import { SpecialsSection } from '@/components/SpecialsSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewMenu = () => {
    setActiveSection('menu');
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <main>
        <section id="home">
          <HeroSection onViewMenu={handleViewMenu} />
        </section>
        
        <section id="menu">
          <MenuSection />
        </section>
        
        <section id="specials">
          <SpecialsSection />
        </section>
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">नैवेद्य लंच होम</h3>
          <p className="text-background/80 mb-4">Authentic Maharashtrian Cuisine</p>
          <p className="text-sm text-background/60">
            © 2024 Naivedya Lunch Home. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
