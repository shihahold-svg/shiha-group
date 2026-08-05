export function SeoSection() {
  const tags = [
    'الوعر', 'الزهراء', 'الخالدية', 'الحمراء', 'باب دريب', 'القصور',
    'الإنشاءات', 'كرم الشامي', 'عكرمة',
    'شقق للبيع', 'أراضي', 'فيلات', 'محلات تجارية', 'مستودعات', 'مزارع',
  ];

  return (
    <section className="bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-lg font-bold text-[var(--text-secondary)]">نغطي في حمص</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-alt)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
