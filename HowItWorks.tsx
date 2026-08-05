export function HowItWorks() {
  const steps = ['أرسل طلبك', 'نتواصل معك', 'نُتمم الصفقة'];

  return (
    <section className="bg-[var(--bg-alt)] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-8 text-xl font-bold text-[var(--text-primary)]">كيف نعمل؟</h2>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-2 sm:flex-row">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
                  {i + 1}
                </div>
                <span className="text-sm text-[var(--text-secondary)]">{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden h-0.5 w-12 bg-[var(--border)] sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
