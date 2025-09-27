import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, MessageCircle, MapPin, Clock, Utensils, Truck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();

  const contactInfo = {
    phone1: "+91 98765 43210",
    phone2: "+91 87654 32109",
    whatsapp: "+91 98765 43210",
    address: {
      en: "Shop No. 15, Ground Floor, Shivaji Nagar, Pune - 411005, Maharashtra",
      mr: "दुकान क्र. १५, तळमजला, शिवाजीनगर, पुणे - ४११००५, महाराष्ट्र"
    },
    hours: {
      en: "Open Daily: 11:00 AM - 10:00 PM",
      mr: "दररोज उघडे: सकाळी ११:०० - रात्री १०:००"
    }
  };

  const orderingOptions = [
    {
      title: { en: "Call to Order", mr: "फोन करून ऑर्डर करा" },
      description: { en: "Call us directly for quick orders", mr: "त्वरीत ऑर्डरसाठी आम्हाला कॉल करा" },
      icon: Phone,
      action: () => window.open(`tel:${contactInfo.phone1}`),
      color: "bg-restaurant-green"
    },
    {
      title: { en: "WhatsApp Order", mr: "व्हाट्सअॅप ऑर्डर" },
      description: { en: "Order via WhatsApp for convenience", mr: "सोयीसाठी व्हाट्सअॅपद्वारे ऑर्डर करा" },
      icon: MessageCircle,
      action: () => window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`),
      color: "bg-restaurant-saffron"
    },
    {
      title: { en: "Swiggy Delivery", mr: "स्विगी डिलिव्हरी" },
      description: { en: "Order online via Swiggy", mr: "स्विगीद्वारे ऑनलाइन ऑर्डर करा" },
      icon: Utensils,
      action: () => window.open("https://www.swiggy.com"),
      color: "bg-restaurant-terracotta"
    },
    {
      title: { en: "Zomato Delivery", mr: "झोमॅटो डिलिव्हरी" },
      description: { en: "Order online via Zomato", mr: "झोमॅटोद्वारे ऑनलाइन ऑर्डर करा" },
      icon: Truck,
      action: () => window.open("https://www.zomato.com"),
      color: "bg-restaurant-gold"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">{t('contactTitle')}</h2>
          <p className="text-xl text-muted-foreground">Get in touch with us or place your order</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Ordering Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {orderingOptions.map((option, index) => (
              <Card key={index} className="shadow-elegant hover:shadow-warm transition-all cursor-pointer group bg-gradient-card">
                <CardContent className="p-6 text-center" onClick={option.action}>
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {option.title[language]}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {option.description[language]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Details */}
            <Card className="shadow-elegant bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Phone Numbers</h3>
                    <p className="text-muted-foreground">{contactInfo.phone1}</p>
                    <p className="text-muted-foreground">{contactInfo.phone2}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground">{contactInfo.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('address')}</h3>
                    <p className="text-muted-foreground">{contactInfo.address[language]}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Operating Hours</h3>
                    <p className="text-muted-foreground">{contactInfo.hours[language]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Order */}
            <Card className="shadow-elegant bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Quick Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-6">
                  {language === 'en' 
                    ? "Ready to order? Choose your preferred method below:"
                    : "ऑर्डर करण्यास तयार आहात? खाली तुमची पसंतीची पद्धत निवडा:"
                  }
                </p>

                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start shadow-warm bg-gradient-hero hover:opacity-90"
                    onClick={() => window.open(`tel:${contactInfo.phone1}`)}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    {language === 'en' ? "Call Now" : "आता कॉल करा"}
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`)}
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    {language === 'en' ? "WhatsApp Order" : "व्हाट्सअॅप ऑर्डर"}
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="secondary"
                      onClick={() => window.open("https://www.swiggy.com")}
                    >
                      <Utensils className="w-4 h-4 mr-2" />
                      Swiggy
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => window.open("https://www.zomato.com")}
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Zomato
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-restaurant-cream rounded-lg">
                  <p className="text-sm text-foreground font-medium">
                    {language === 'en' 
                      ? "🎯 Free delivery on orders above ₹300"
                      : "🎯 ₹३०० पेक्षा जास्त ऑर्डरवर मोफत डिलिव्हरी"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};