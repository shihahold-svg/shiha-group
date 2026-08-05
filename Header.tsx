import { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER } from '@/utils/formUtils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="sticky top-0 z-50 h-[60px] bg-white transition-shadow duration-300"
      style={{ boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.08)' : 'none' }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)' }}
          >
            SHG
          </div>
          <div>
            <h1 className="text-base font-semibold text-[var(--text-primary)]">SHIHA GROUP</h1>
            <p className="text-xs text-[var(--text-secondary)]">مجموعة شيحة العقارية</p>
          </div>
        </div>

        <button
          onClick={scrollToForm}
          className="rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-bold text-white transition-all hover:bg-[var(--primary-hover)] active:scale-[0.97]"
        >
          أرسل طلبك
        </button>
      </div>
    </header>
  );
}
