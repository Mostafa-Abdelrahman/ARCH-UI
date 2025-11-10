import { useContent } from '../contexts/ContentContext';

export function Privacy() {
  const content = useContent();
  const { navLogo } = content;
  const logo = Array.isArray(navLogo) ? navLogo.find(logo => logo.type === 'LOGO') : (navLogo?.type === 'LOGO' ? navLogo : null);
  const companyName = content.footerContent?.companyName || 'Khater Arachitect';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            {logo && (
              <img
                src={logo.logoUrl}
                alt={companyName}
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
            )}
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">سياسة الخصوصية</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نحن في {companyName} ملتزمون بحماية خصوصيتك وبياناتك الشخصية
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-lg rtl:prose-right">
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">١. جمع المعلومات</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              نقوم بجمع المعلومات التي تقدمها لنا طوعياً عند التواصل معنا أو طلب خدماتنا، وتشمل:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li>الاسم ومعلومات الاتصال (البريد الإلكتروني، رقم الهاتف)</li>
              <li>تفاصيل المشروع والمتطلبات الخاصة</li>
              <li>أي معلومات أخرى تختار مشاركتها معنا</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٢. استخدام المعلومات</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              نستخدم المعلومات التي نجمعها للأغراض التالية:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li>تقديم الخدمات المعمارية والتصميمية المطلوبة</li>
              <li>التواصل معك بخصوص مشاريعك واستفساراتك</li>
              <li>تحسين جودة خدماتنا</li>
              <li>إرسال التحديثات والمعلومات المتعلقة بخدماتنا (بموافقتك)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٣. حماية المعلومات</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              نتخذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير. 
              نستخدم تقنيات التشفير والحماية المتقدمة لضمان سرية بياناتك.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٤. مشاركة المعلومات</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              لا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أطراف ثالثة دون موافقتك الصريحة، 
              باستثناء الحالات التالية:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li>عندما يكون ذلك ضرورياً لتقديم الخدمة المطلوبة</li>
              <li>عند الحاجة للامتثال للقوانين واللوائح المعمول بها</li>
              <li>لحماية حقوقنا أو سلامة الآخرين</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٥. ملفات تعريف الارتباط</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين تجربتك على موقعنا الإلكتروني وتذكر تفضيلاتك. 
              يمكنك التحكم في هذه الملفات من خلال إعدادات متصفحك.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٦. حقوقك</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              لديك الحق في:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li>الوصول إلى معلوماتك الشخصية التي نحتفظ بها</li>
              <li>طلب تصحيح أو تحديث معلوماتك</li>
              <li>طلب حذف معلوماتك (في ظروف معينة)</li>
              <li>الاعتراض على معالجة معلوماتك</li>
              <li>سحب موافقتك في أي وقت</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٧. التحديثات</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية 
              عبر البريد الإلكتروني أو من خلال إشعار على موقعنا الإلكتروني.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٨. اتصل بنا</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو كيفية تعاملنا مع معلوماتك الشخصية، 
              يرجى التواصل معنا عبر:
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg text-right">
              <p className="text-muted-foreground">
                البريد الإلكتروني: {content.contactInfo.find(info => info.type === 'email')?.value || 'info@company.com'}
              </p>
              <p className="text-muted-foreground mt-2">
                الهاتف: {content.contactInfo.find(info => info.type === 'phone')?.value || '+966 XX XXX XXXX'}
              </p>
            </div>
          </section>

          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              آخر تحديث: نوفمبر ٢٠٢٥
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}