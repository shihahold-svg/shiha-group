import { FormData } from '@/types/form';
import { TextInput, TextArea, Select } from './FormFields';
import { isOffer } from '@/utils/formUtils';

interface Step3Props {
  data: FormData;
  update: (patch: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export function Step3({ data, update, errors }: Step3Props) {
  const ownershipDocOptions = [
    { value: 'green_tabu', label: 'طابو أخضر' },
    { value: 'court', label: 'حكم محكمة' },
    { value: 'shares', label: 'أسهم' },
    { value: 'notary', label: 'كاتب عدل' },
    { value: 'sale_contract', label: 'عقد بيع' },
    { value: 'housing_assoc', label: 'جمعية سكنية' },
    { value: 'agricultural', label: 'أرض زراعية' },
    { value: 'waqf', label: 'وقف' },
    { value: 'other', label: 'أخرى' },
  ];

  const propertySourceOptions = [
    { value: 'owner', label: 'مالك مباشر' },
    { value: 'broker', label: 'وسيط عقاري' },
    { value: 'agent', label: 'وكيل عن المالك' },
    { value: 'other', label: 'أخرى' },
  ];

  return (
    <div className="flex flex-col gap-6 slide-in">
      <div>
        <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">بياناتك</h3>
        <div className="flex flex-col gap-4">
          <div>
            <TextInput
              label="الاسم الكامل (*)"
              value={data.full_name}
              onChange={(v) => update({ full_name: v })}
              placeholder="الاسم الثلاثي"
              required
              error={errors.full_name}
              maxLength={50}
              id="full_name"
            />
          </div>
          <div>
            <TextInput
              label="رقم الهاتف (*)"
              value={data.phone}
              onChange={(v) => update({ phone: v })}
              placeholder="09xxxxxxxx"
              type="tel"
              required
              error={errors.phone}
              maxLength={10}
              id="phone"
              hint="مثال: 0936666472"
            />
          </div>
        </div>
      </div>

      {isOffer(data.transaction_type) && (
        <div className="fade-in">
          <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">معلومات الملكية</h3>
          <div className="flex flex-col gap-4">
            <div>
              <Select
                label="مصدر العقار (*)"
                value={data.property_source}
                onChange={(v) => update({ property_source: v as FormData['property_source'] })}
                options={propertySourceOptions}
                required
              />
              {errors.property_source && <p className="mt-1 text-xs text-[var(--danger)]">{errors.property_source}</p>}
              {data.property_source === 'other' && (
                <div className="mt-2">
                  <TextInput
                    value={data.property_source_other}
                    onChange={(v) => update({ property_source_other: v })}
                    placeholder="حدد المصدر"
                    maxLength={50}
                  />
                </div>
              )}
            </div>
            <div>
              <Select
                label="نوع الملكية / الوثيقة (*)"
                value={data.ownership_doc}
                onChange={(v) => update({ ownership_doc: v })}
                options={ownershipDocOptions}
                required
              />
              {errors.ownership_doc && <p className="mt-1 text-xs text-[var(--danger)]">{errors.ownership_doc}</p>}
              {data.ownership_doc === 'other' && (
                <div className="mt-2">
                  <TextInput
                    value={data.ownership_doc_other}
                    onChange={(v) => update({ ownership_doc_other: v })}
                    placeholder="حدد نوع الملكية"
                    maxLength={50}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <TextArea
        label="ملاحظات إضافية"
        value={data.notes}
        onChange={(v) => update({ notes: v })}
        placeholder="أي تفاصيل إضافية تريد ذكرها..."
        rows={4}
        maxLength={500}
      />

      <p className="text-center text-xs text-[var(--text-secondary)]">
        🔒 نحترم خصوصيتك. بياناتك لا تُعرض للعموم ولا تُشارك مع أي طرف ثالث.
      </p>
    </div>
  );
}
