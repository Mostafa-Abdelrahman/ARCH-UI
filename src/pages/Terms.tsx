import { useContent } from '../contexts/ContentContext';

export function Terms() {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">الشروط والأحكام</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              شروط وأحكام استخدام خدمات {companyName}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-lg rtl:prose-right">
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">١. التعريفات</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              في هذه الشروط والأحكام:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li><strong>"الشركة"</strong> تعني {companyName}</li>
              <li><strong>"العميل"</strong> يعني أي شخص أو كيان يطلب خدماتنا</li>
              <li><strong>"الخدمات"</strong> تشمل جميع الخدمات المعمارية والتصميمية التي نقدمها</li>
              <li><strong>"المشروع"</strong> يعني العمل المحدد المتفق عليه بين الطرفين</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٢. نطاق الخدمات</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              نقدم الخدمات التالية:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li>التصميم المعماري والإنشائي</li>
              <li>التصميم الداخلي والديكور</li>
              <li>الإشراف على التنفيذ</li>
              <li>الاستشارات الهندسية والمعمارية</li>
              <li>إعداد الرسومات التنفيذية والمخططات</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٣. التزامات العميل</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              يلتزم العميل بما يلي:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li>تقديم معلومات صحيحة ودقيقة عن المشروع</li>
              <li>توفير جميع المستندات والتصاريح المطلوبة</li>
              <li>دفع الرسوم المتفق عليها في المواعيد المحددة</li>
              <li>التعاون مع فريق العمل وتقديم الملاحظات في الوقت المناسب</li>
              <li>احترام حقوق الملكية الفكرية للتصاميم</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٤. التزامات الشركة</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              نلتزم بتقديم:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li>خدمات عالية الجودة وفقاً للمعايير المهنية</li>
              <li>التصاميم في المواعيد المتفق عليها</li>
              <li>السرية التامة لمعلومات العميل والمشروع</li>
              <li>المراجعات والتعديلات وفقاً للاتفاق المبرم</li>
              <li>الدعم الفني خلال فترة المشروع</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٥. الرسوم والدفع</h2>
            <div className="space-y-4 text-right">
              <p className="leading-relaxed text-muted-foreground">
                تحدد الرسوم بناءً على نطاق وتعقيد المشروع وتشمل:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>رسوم التصميم الأولي</li>
                <li>رسوم المراجعات والتعديلات (حسب الاتفاق)</li>
                <li>رسوم الإشراف (إن وجدت)</li>
              </ul>
              <p className="leading-relaxed text-muted-foreground">
                <strong>شروط الدفع:</strong> يتم الدفع على دفعات وفقاً للجدول الزمني المتفق عليه. 
                تأخير الدفع قد يؤثر على جدولة المشروع.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٦. حقوق الملكية الفكرية</h2>
            <div className="space-y-4 text-right">
              <p className="leading-relaxed text-muted-foreground">
                جميع التصاميم والمخططات والمواد الإبداعية محمية بحقوق الطبع والنشر وتبقى ملكاً للشركة حتى سداد كامل الرسوم المستحقة.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                بعد السداد الكامل، ينتقل حق الاستخدام للعميل للمشروع المحدد فقط، مع احتفاظ الشركة بحق عرض المشروع في محفظة أعمالها.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٧. التعديلات والمراجعات</h2>
            <div className="space-y-4 text-right">
              <p className="leading-relaxed text-muted-foreground">
                يحق للعميل طلب مراجعات على التصميم وفقاً للشروط التالية:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>عدد محدود من المراجعات المجانية (حسب الاتفاق)</li>
                <li>المراجعات الإضافية تتطلب رسوماً إضافية</li>
                <li>يجب تقديم طلبات التعديل كتابياً</li>
                <li>التغييرات الجوهرية قد تتطلب اتفاقية إضافية</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٨. إلغاء المشروع</h2>
            <div className="space-y-4 text-right">
              <p className="leading-relaxed text-muted-foreground">
                في حالة إلغاء المشروع:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>يحق للشركة الاحتفاظ بالرسوم المدفوعة مقابل العمل المنجز</li>
                <li>يتم تسليم جميع المواد المكتملة للعميل</li>
                <li>العميل مسؤول عن دفع تكاليف الإلغاء المعقولة</li>
                <li>يجب إشعار الطرف الآخر كتابياً قبل ٧ أيام من الإلغاء</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">٩. المسؤولية وحدود الضمان</h2>
            <div className="space-y-4 text-right">
              <p className="leading-relaxed text-muted-foreground">
                مسؤوليتنا تقتصر على:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>جودة التصميم وفقاً للمعايير المهنية</li>
                <li>الالتزام بالمواعيد المتفق عليها</li>
                <li>السرية والخصوصية</li>
              </ul>
              <p className="leading-relaxed text-muted-foreground">
                <strong>لا نتحمل المسؤولية عن:</strong> التأخير بسبب ظروف خارجة عن إرادتنا، أخطاء المقاولين في التنفيذ، 
                التغييرات في اللوائح والقوانين بعد بدء المشروع.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">١٠. تسوية المنازعات</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              في حالة نشوء أي نزاع، يتم حله بالطرق التالية:
            </p>
            <ul className="list-disc list-inside text-right mt-4 space-y-2 text-muted-foreground">
              <li>التفاوض المباشر بين الطرفين</li>
              <li>الوساطة عبر جهة محايدة</li>
              <li>التحكيم وفقاً للقوانين المعمول بها</li>
              <li>المحاكم المختصة كملاذ أخير</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">١١. القانون الحاكم</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              تخضع هذه الشروط والأحكام للقوانين المعمول بها في المملكة العربية السعودية، 
              وتفسر وفقاً لها.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-right">١٢. التعديل على الشروط</h2>
            <p className="text-right leading-relaxed text-muted-foreground">
              نحتفظ بحق تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار العملاء بأي تغييرات 
              جوهرية قبل تطبيقها.
            </p>
          </section>

          <div className="bg-muted/50 p-6 rounded-lg text-right mt-12">
            <h3 className="text-lg font-semibold mb-4">للاستفسارات والتواصل</h3>
            <p className="text-muted-foreground mb-2">
              البريد الإلكتروني: {content.contactInfo.find(info => info.type === 'email')?.value || 'info@company.com'}
            </p>
            <p className="text-muted-foreground">
              الهاتف: {content.contactInfo.find(info => info.type === 'phone')?.value || '+966 XX XXX XXXX'}
            </p>
          </div>

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