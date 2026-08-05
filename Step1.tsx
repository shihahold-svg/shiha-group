import { FormData } from '@/types/form';
import { BigButton, TextInput, Select, Capsule } from './FormFields';
import { AREAS } from '@/utils/formUtils';

interface Step1Props {
  data: FormData;
  update: (patch: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export function Step1({ data, update, errors }: Step1Props) {
  const transactionOptions = [
    { value: 'request_buy', label: 'أبحث عن عقار للبيع', icon: '🏠' },
    { value: 'offer_sell', label: 'لدي عقار للبيع', icon: '🏡' },
    { value: 'request_rent', label: 'أبحث عن عقار للإيجار', icon: '🔑' },
    { value: 'offer_rent', label: 'لدي عقار للإيجار', icon: '🏢' },
  ];

  const propertyOptions = [
    { value: 'apartment', label: 'شقة' },
    { value: 'arabic_house', label: 'بيت عربي' },
    { value: 'villa', label: 'فيلا' },
    { value: 'basement', label: 'قبو' },
    { value: 'ground_floor', label: 'طابق أرضي' },
    { value: 'building', label: 'بناء / كتلة بناء' },
    { value: 'land', label: 'أرض' },
    { value: 'shop', label: 'محل تجاري' },
    { value: 'office', label: 'مكتب / عيادة' },
    { value: 'warehouse', label: 'مستودع' },
    { value: 'factory', label: 'معمل / ورشة' },
    { value: 'farm', label: 'مزرعة' },
    { value: 'other', label: 'أخرى' },
  ];

  const areaRequired = data.area === 'غيرها';

  return (
    <div className="flex flex-col gap-6 slide-in">
      {/* Transaction type */}
      <div>
        <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">ما الذي تريده؟</h3>
        {errors.transaction_type && <p className="mb-2 text-xs text-[var(--danger)]">{errors.transaction_type}</p>}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {transactionOptions.map((opt) => (
            <BigButton
              key={opt.value}
              selected={data.transaction_type === opt.value}
              onClick={() => update({ transaction_type: opt.value as FormData['transaction_type'] })}
              icon={<span className="text-xl">{opt.icon}</span>}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      {/* Property type */}
      <div>
        <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">نوع العقار</h3>
        {errors.property_type && <p className="mb-2 text-xs text-[var(--danger)]">{errors.property_type}</p>}
        <Select
          value={data.property_type}
          onChange={(v) => update({ property_type: v as FormData['property_type'] })}
          options={propertyOptions}
          placeholder="اختر نوع العقار..."
          required
        />
        {data.property_type === 'other' && (
          <div className="mt-3">
            <TextInput
              value={data.property_type_other}
              onChange={(v) => update({ property_type_other: v })}
              placeholder="حدد نوع العقار"
              maxLength={50}
            />
          </div>
        )}
      </div>

      {/* Area */}
      <div>
        <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">المنطقة</h3>
        {errors.area && <p className="mb-2 text-xs text-[var(--danger)]">{errors.area}</p>}
        <div className="flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <Capsule
              key={a}
              selected={data.area === a}
              onClick={() => update({ area: a })}
              label={a}
            />
          ))}
        </div>
        {data.area && (
          <div className="mt-3 fade-in">
            <TextInput
              value={data.area_detail}
              onChange={(v) => update({ area_detail: v })}
              placeholder="الحي الدقيق أو أقرب معلم"
              required={areaRequired}
              error={areaRequired && !data.area_detail.trim() ? 'يرجى تحديد المنطقة' : ''}
              hint="اكتب اسم الحي أو أقرب معلم معروف"
              maxLength={100}
            />
          </div>
        )}
      </div>
    </div>
  );
}
