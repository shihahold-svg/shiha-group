import { useState, useEffect, useCallback } from 'react';
import { FormData, defaultFormData } from '@/types/form';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { ReviewStep } from './ReviewStep';
import { SuccessScreen } from './SuccessScreen';
import {
  API_URL, SECRET_TOKEN,
  saveFormData, loadFormData, clearFormData,
  checkRateLimit, setRateLimit,
  isOffer, isLand,
} from '@/utils/formUtils';
import { ChevronRight, ChevronLeft, Send, Loader2, AlertCircle } from 'lucide-react';

const STEP_NAMES = ['نوع العملية', 'التفاصيل', 'التواصل', 'المعاينة'];

export function FormContainer() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [shgId, setShgId] = useState('');
  const [done, setDone] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    const saved = loadFormData();
    if (saved && saved.data.transaction_type) {
      setData(saved.data);
      setStep(saved.step);
    }
  }, []);

  const update = useCallback((patch: Partial<FormData>) => {
    setData((prev) => {
      const next = { ...prev, ...patch };
      saveFormData(next, step);
      return next;
    });
  }, [step]);

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!data.transaction_type) errs.transaction_type = 'يرجى اختيار نوع التصرف';
      if (!data.property_type) errs.property_type = 'يرجى اختيار نوع العقار';
      if (!data.area) errs.area = 'يرجى اختيار المنطقة';
      if (data.area === 'غيرها' && !data.area_detail.trim()) {
        errs.area_detail = 'يرجى تحديد المنطقة';
      }
    }
    if (s === 1) {
      if (isLand(data.property_type)) {
        if (!data.land_area_donum) errs.land_area_donum = 'يرجى إدخال المساحة';
      } else if (data.property_type === 'villa' || data.property_type === 'arabic_house') {
        if (!data.build_area && !data.land_area_donum) errs.total_area = 'يرجى إدخال المساحة';
      } else {
        if (!data.total_area) errs.total_area = 'يرجى إدخال المساحة';
      }
      if (!data.price) errs.price = 'يرجى إدخال السعر';
    }
    if (s === 2) {
      if (!data.full_name.trim()) errs.full_name = 'يرجى إدخال الاسم الكامل';
      const phoneClean = data.phone.replace(/\s/g, '');
      if (!phoneClean) {
        errs.phone = 'يرجى إدخال رقم سوري صحيح (مثال: 0936666472)';
      } else if (!/^09[3-9]\d{7}$/.test(phoneClean)) {
        errs.phone = 'يرجى إدخال رقم سوري صحيح (مثال: 0936666472)';
      }
      if (isOffer(data.transaction_type)) {
        if (!data.property_source) errs.property_source = 'يرجى تحديد مصدر العقار';
        if (!data.ownership_doc) errs.ownership_doc = 'يرجى تحديد نوع الملكية';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const scrollToForm = () => {
    const el = document.getElementById('form-section');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 3));
    scrollToForm();
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollToForm();
  };

  const goToStep = (s: number) => {
    setStep(s);
    scrollToForm();
  };

  const submit = async () => {
    // Honeypot check — silent reject
    if (honeypot) {
      setDone(true);
      setShgId('SHG-000000');
      clearFormData();
      return;
    }

    setSubmitError('');
    if (!checkRateLimit()) {
      setSubmitError('يرجى الانتظار دقيقة قبل إرسال طلب جديد');
      return;
    }

    setSubmitting(true);

    const payload = {
      ...data,
      secret: SECRET_TOKEN,
      price: parseFloat(data.price) || 0,
      amenities: data.amenities.join('، '),
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setShgId(json.shgId);
        setDone(true);
        clearFormData();
        setRateLimit();
      } else {
        setSubmitError('حدث خطأ أثناء الإرسال. يرجى التحقق من اتصالك والمحاولة مرة أخرى.');
      }
    } catch {
      setSubmitError('حدث خطأ أثناء الإرسال. يرجى التحقق من اتصالك والمحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setData(defaultFormData);
    setStep(0);
    setDone(false);
    setShgId('');
    setErrors({});
    setSubmitError('');
    setHoneypot('');
  };

  if (done) {
    return <SuccessScreen shgId={shgId} onNewRequest={resetForm} />;
  }

  return (
    <div id="form-section" className="mx-auto w-full max-w-[560px] rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_20px_var(--shadow)] sm:p-6" style={{ padding: '24px' }}>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="honeypot"
        aria-hidden="true"
      />

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {STEP_NAMES.map((name, i) => (
            <div key={i} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    i < step
                      ? 'border-[var(--success)] bg-[var(--success)]'
                      : i === step
                      ? 'border-[var(--primary)] bg-[var(--primary)]'
                      : 'border-[var(--border)] bg-white'
                  }`}
                >
                  {i < step && (
                    <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              {i < STEP_NAMES.length - 1 && (
                <div className={`mx-1 h-0.5 flex-1 rounded transition-all duration-300 sm:mx-2 ${i < step ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
          الخطوة {step + 1} من 4 {step === 3 ? '(المعاينة)' : ''}
        </p>
      </div>

      {/* Submit error */}
      {submitError && (
        <div className="mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-[var(--danger)]" style={{ background: 'rgba(220,38,38,0.1)' }} role="alert" aria-live="polite">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          {submitError}
        </div>
      )}

      {/* Step content */}
      <div>
        {step === 0 && <Step1 data={data} update={update} errors={errors} />}
        {step === 1 && <Step2 data={data} update={update} errors={errors} />}
        {step === 2 && <Step3 data={data} update={update} errors={errors} />}
        {step === 3 && <ReviewStep data={data} onEdit={goToStep} />}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={`flex items-center gap-1 rounded-xl px-5 py-3 text-sm font-semibold transition-all active:scale-[0.97] ${
            step === 0
              ? 'cursor-not-allowed text-[var(--border)]'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-alt)]'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
          السابق
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="flex h-[52px] items-center gap-1 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[var(--primary-hover)] active:scale-[0.97]"
          >
            التالي
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[var(--primary-hover)] active:scale-[0.97] disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                تأكيد وإرسال
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
