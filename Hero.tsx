export function Hero() {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="px-4 pb-8 pt-12 sm:px-6" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #F8F9FA)' }}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        {/* Logo */}
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl text-lg font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}
        >
          SHG
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-bold leading-tight text-[var(--text-primary)] sm:text-[26px]">
          خدمة عقارية تبدأ من حمص وتتوسع في سوريا
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[var(--text-secondary)]">
          SHIHA GROUP — وساطة عقارية موثوقة
        </p>

        {/* Badge */}
        <div
          className="rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--accent)' }}
        >
          أرسل طلبك في دقيقة واحدة فقط
        </div>

        {/* CTA */}
        <button
          onClick={scrollToForm}
          className="mt-2 rounded-xl bg-[var(--primary)] px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[var(--primary-hover)] active:scale-[0.97]"
        >
          ابدأ الآن
        </button>
      </div>
    </section>
  );
}
