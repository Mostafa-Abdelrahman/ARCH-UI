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
                <a 
                href={`https://wa.me/${contactInfo.find(info => info.type === 'phone')?.value?.replace(/\D/g, '') || '+966XXXXXXXXX'}?text=${encodeURIComponent('مرحباً، أود حجز استشارة مجانية.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full"
                >
                <Button className="gold-button gap-2 w-full">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                  <span>احجز الآن</span>
                </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}