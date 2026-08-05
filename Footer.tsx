import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, EMAIL } from '@/utils/formUtils';

export function Footer() {
  const socials = [
    { label: 'f', href: 'https://facebook.com/shihagroup', bg: 'var(--primary)' },
    { label: '📷', href: 'https://instagram.com/shihahold', bg: 'var(--primary)' },
    { label: '✈️', href: 'https://t.me/shihagroup', bg: 'var(--primary)' },
    { label: '📱', href: `https://wa.me/${WHATSAPP_NUMBER}`, bg: 'var(--whatsapp)' },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-alt)] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        {/* Social icons */}
        <div className="flex gap-3">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-white transition-all hover:opacity-80 active:scale-95"
              style={{ background: s.bg }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
          <span>واتساب: {WHATSAPP_DISPLAY}</span>
          <span>بريد: {EMAIL}</span>
          <span>حمص، سوريا — تأسيس 2025</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[var(--text-secondary)]">
          © 2025 SHIHA GROUP — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
