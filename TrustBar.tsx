export function TrustBar() {
  const items = [
    { icon: '🔒', title: 'خصوصية البيانات', desc: 'لا تُعرض للعموم أبداً' },
    { icon: '⚡', title: 'متابعة شخصية', desc: 'نتواصل معك مباشرة' },
    { icon: '🤝', title: 'فهم احتياجك', desc: 'نبحث عن الأنسب لك' },
  ];

  return (
    <section className="bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-white p-5 text-center"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
          >
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
            <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
