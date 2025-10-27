import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  User,
  CheckCircle,
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube
} from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useContent } from '../contexts/ContentContext';
import { api } from '../lib/api';

export function Contact() {
  const { contactInfo, socialLinks } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.post('/contact/message', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Icon mapping
  const iconMap: { [key: string]: React.ReactNode } = {
    'MapPin': <MapPin className="w-5 h-5" />,
    'Phone': <Phone className="w-5 h-5" />,
    'Mail': <Mail className="w-5 h-5" />,
  };

  const socialIconMap: { [key: string]: React.ComponentType<any> } = {
    'Facebook': Facebook,
    'Twitter': Twitter,
    'Instagram': Instagram,
    'Linkedin': Linkedin,
    'Youtube': Youtube,
  };

  // Use API contact info or fallback
  const contactInfoData = contactInfo.length > 0 ? 
    contactInfo.filter(info => info.isActive).sort((a, b) => a.order - b.order).map(info => ({
      icon: iconMap[info.icon || 'MapPin'] || <MapPin className="w-5 h-5" />,
      title: info.label,
      content: info.value,
      type: info.type
    })) : [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'العنوان',
      content: 'مصر'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'الهاتف',
      content: '0120552025'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'البريد الإلكتروني',
      content: 'info@abdullah-studio.com'
    }
  ];

  // Use API social links or fallback
  const socialLinksData = socialLinks.length > 0 ? socialLinks : [
    { id: '1', name: 'فيسبوك', icon: 'Facebook', href: '#' },
    { id: '2', name: 'تويتر', icon: 'Twitter', href: '#' },
    { id: '3', name: 'إنستغرام', icon: 'Instagram', href: '#' },
    { id: '4', name: 'لينكد إن', icon: 'Linkedin', href: '#' },
    { id: '5', name: 'يوتيوب', icon: 'Youtube', href: '#' }
  ];

  return (
    <section id="contact" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-gold-contrast">
            ابدأ مشروعك معنا
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            تواصل معنا اليوم للحصول على استشارة مجانية وتحويل رؤيتك إلى واقع
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                أرسل لنا رسالة
              </CardTitle>
              <p className="text-muted-foreground">
                سنتواصل معك خلال ٢٤ ساعة
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl mb-2 text-primary">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-muted-foreground">
                    شكراً لتواصلك معنا. سنقوم بالرد عليك قريباً.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        الاسم الكامل *
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="أدخل اسمك الكامل"
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        رقم الهاتف *
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="٠٥٠-١٢٣-٤٥٦٧"
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      البريد الإلكتروني *
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      تفاصيل المشروع *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="أخبرنا عن مشروعك، المساحة، والمتطلبات..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gold-button gap-2 text-base py-3"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfoData.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-1">{info.title}</h4>
                      <p className="text-foreground">{info.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="professional-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl mb-4 text-primary">تابعنا </h3>
                <div className="flex gap-3 justify-center md:justify-center">
                  {socialLinksData.map((social: any, index: number) => {
                    const IconComponent = socialIconMap[social.icon] || Facebook;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className="w-9 h-9 bg-muted hover:bg-primary/20 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Free Consultation CTA */}
            <Card className="professional-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl mb-3 text-primary">استشارة مجانية</h3>
                <p className="text-muted-foreground mb-6">
                  احجز موعد للحصول على استشارة مجانية مع فريق الخبراء
                </p>
                <Button className="gold-button gap-2 w-full">
                  <Phone className="w-4 h-4" />
                  <span>احجز الآن</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}