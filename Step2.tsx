import { useState } from 'react';
import { FormData } from '@/types/form';
import { TextInput, Select, Toggle, Capsule } from './FormFields';
import { ChevronDown } from 'lucide-react';
import {
  isRent, isBuy, isOffer, isLand, isResidential, isCommercial,
  showFloor, showRooms, showBuildingAge, getAmenities, getPriceLabel,
  getAreaLabel, getAreaPlaceholder, getAreaUnit,
  convertCurrency, formatPrice, NO_AMENITIES,
} from '@/utils/formUtils';

interface Step2Props {
  data: FormData;
  update: (patch: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export function Step2({ data, update, errors }: Step2Props) {
  const [showExtra, setShowExtra] = useState(false);
  const p = data.property_type;

  const showTotalArea = !isLand(p) && p !== 'villa' && p !== 'arabic_house';
  const showBuildArea = p === 'villa' || p === 'arabic_house';
  const showLandDonum = isLand(p) || p === 'villa' || p === 'arabic_house';

  const floorOptions = [
    { value: 'basement', label: 'قبو' }, { value: 'ground', label: 'أرضي' },
    { value: 'first_tech', label: 'أول فني' }, { value: 'second', label: 'ثاني' },
    { value: 'second_tech', label: 'ثاني فني' }, { value: 'third', label: 'ثالث' },
    { value: 'third_tech', label: 'ثالث فني' }, { value: 'fourth', label: 'رابع' },
    { value: 'fourth_tech', label: 'رابع فني' }, { value: 'fifth', label: 'خامس' },
    { value: 'fifth_tech', label: 'خامس فني' }, { value: 'sixth', label: 'سادس' },
    { value: 'sixth_tech', label: 'سادس فني' }, { value: 'seventh', label: 'سابع' },
    { value: 'seventh_tech', label: 'سابع فني' }, { value: 'roof', label: 'روف' },
    { value: 'annex', label: 'ملحق' }, { value: 'unspecified', label: 'غير محدد' },
    { value: 'other', label: 'أخرى' },
  ];

  const roomOptions = [
    { value: 'studio', label: 'استديو' }, { value: '1_salon', label: 'غرفة وصالون' },
    { value: '2', label: '2 غرف وصالون' }, { value: '3', label: '3 غرف وصالون' },
    { value: '4', label: '4 غرف وصالون' }, { value: '5+', label: '5+ غرف' },
    { value: 'unspecified', label: 'غير محدد' },
  ];

  const bathroomOptions = [
    { value: '1', label: '1' }, { value: '2', label: '2' },
    { value: '3', label: '3' }, { value: '4+', label: '4+' },
    { value: 'shared', label: 'مشترك' }, { value: 'unspecified', label: 'غير محدد' },
  ];

  const finishingOptions = [
    { value: 'full', label: 'تشطيب كامل' }, { value: 'economy', label: 'تشطيب اقتصادي' },
    { value: 'luxury', label: 'تشطيب فاخر' }, { value: 'commercial', label: 'تشطيب تجاري' },
    { value: 'skeleton', label: 'عظم (بدون تشطيب)' }, { value: 'other', label: 'غير ذلك' },
  ];

  const directionOptions = [
    { value: 'north', label: 'شمالية' }, { value: 'south', label: 'جنوبية' },
    { value: 'east', label: 'شرقية' }, { value: 'west', label: 'غربية' },
    { value: 'corner', label: 'زاوية' }, { value: 'unspecified', label: 'غير محدد' },
  ];

  const conditionOptions = [
    { value: 'new', label: 'جديد' }, { value: 'ready', label: 'جاهز للاستخدام' },
    { value: 'used', label: 'مستعمل' }, { value: 'maintenance', label: 'يحتاج صيانة' },
    { value: 'renovation', label: 'يحتاج ترميم' }, { value: 'skeleton', label: 'على الهيكل (عظم)' },
    { value: 'under_construction', label: 'قيد الإنشاء' }, { value: 'stopped', label: 'متوقف' },
    { value: 'other', label: 'أخرى' },
  ];

  const buildingAgeOptions = [
    { value: 'new', label: 'جديد' }, { value: 'under_5', label: 'أقل من 5 سنوات' },
    { value: '5_10', label: '5–10 سنوات' }, { value: '10_20', label: '10–20 سنة' },
    { value: 'over_20', label: 'أكثر من 20' }, { value: 'under_construction', label: 'قيد الإنشاء' },
  ];

  const amenitiesList = getAmenities(p);

  const toggleAmenity = (a: string) => {
    const current = data.amenities;
    if (a === NO_AMENITIES) {
      update({ amenities: current.includes(a) ? [] : [NO_AMENITIES] });
    } else {
      const withoutNone = current.filter((x) => x !== NO_AMENITIES);
      if (withoutNone.includes(a)) {
        update({ amenities: withoutNone.filter((x) => x !== a) });
      } else {
        update({ amenities: [...withoutNone, a] });
      }
    }
  };

  const currencyDisplay = convertCurrency(data.price, data.currency);

  return (
    <div className="flex flex-col gap-6 slide-in">
      {/* Area */}
      <div>
        <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">المساحة</h3>
        {errors.total_area && errors.land_area_donum && <p className="mb-2 text-xs text-[var(--danger)]">يرجى إدخال المساحة</p>}
        {showTotalArea && (
          <TextInput
            label={getAreaLabel(p)}
            value={data.total_area}
            onChange={(v) => update({ total_area: v })}
            placeholder={getAreaPlaceholder(p)}
            type="number"
            required
            error={errors.total_area}
          />
        )}
        {showTotalArea && <span className="mt-1 block text-xs text-[var(--text-secondary)]">{getAreaUnit(p)}</span>}

        {showBuildArea && showLandDonum && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <TextInput
                label="مساحة البناء"
                value={data.build_area}
                onChange={(v) => update({ build_area: v })}
                placeholder="مساحة البناء"
                type="number"
              />
              <span className="mt-1 block text-xs text-[var(--text-secondary)]">م²</span>
            </div>
            <div>
              <TextInput
                label="مساحة الأرض"
                value={data.land_area_donum}
                onChange={(v) => update({ land_area_donum: v })}
                placeholder="مساحة الأرض"
                type="number"
              />
              <span className="mt-1 block text-xs text-[var(--text-secondary)]">دونم</span>
            </div>
          </div>
        )}

        {isLand(p) && !showBuildArea && (
          <>
            <TextInput
              label={getAreaLabel(p)}
              value={data.land_area_donum}
              onChange={(v) => update({ land_area_donum: v })}
              placeholder={getAreaPlaceholder(p)}
              type="number"
              required
              error={errors.land_area_donum}
            />
            <span className="mt-1 block text-xs text-[var(--text-secondary)]">{getAreaUnit(p)}</span>
          </>
        )}
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">السعر</h3>
        {errors.price && <p className="mb-2 text-xs text-[var(--danger)]">{errors.price}</p>}
        <div className="flex gap-3">
          <div className="flex-1">
            <TextInput
              value={data.price}
              onChange={(v) => update({ price: v })}
              placeholder="المبلغ"
              type="number"
              required
            />
          </div>
          <div className="w-[120px]">
            <Select
              value={data.currency}
              onChange={(v) => update({ currency: v as 'SYP' | 'USD' })}
              options={[{ value: 'SYP', label: 'ل.س' }, { value: 'USD', label: '$' }]}
            />
          </div>
        </div>
        <div className="mt-2">
          <Toggle
            label="قابل للتفاوض"
            checked={data.negotiable}
            onChange={(v) => update({ negotiable: v })}
          />
        </div>
        {currencyDisplay && (
          <div className="mt-2 rounded-lg bg-[var(--bg-alt)] px-3 py-2 text-xs text-[var(--text-secondary)] fade-in">
            {currencyDisplay}
          </div>
        )}
      </div>

      {/* Installment (buy only) */}
      {isBuy(data.transaction_type) && (
        <div className="fade-in">
          <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">إمكانية التقسيط</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'yes', label: 'نعم' },
              { value: 'no', label: 'لا' },
              { value: 'discuss', label: 'قابل للنقاش' },
            ].map((opt) => (
              <Capsule
                key={opt.value}
                selected={data.installment === opt.value}
                onClick={() => update({ installment: opt.value as FormData['installment'] })}
                label={opt.label}
              />
            ))}
          </div>
        </div>
      )}

      {/* Urgency */}
      <div>
        <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">مدى الاستعجال</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'immediate', label: 'فوري' },
            { value: 'month', label: 'خلال شهر' },
            { value: '3months', label: 'خلال 3 أشهر' },
            { value: 'not_urgent', label: 'غير مستعجل' },
          ].map((opt) => (
            <Capsule
              key={opt.value}
              selected={data.urgency === opt.value}
              onClick={() => update({ urgency: opt.value as FormData['urgency'] })}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      {/* Rent duration (rent only) */}
      {isRent(data.transaction_type) && (
        <div className="fade-in">
          <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">مدة الإيجار</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'monthly', label: 'شهري' },
              { value: 'yearly', label: 'سنوي' },
              { value: 'agreement', label: 'حسب الاتفاق' },
            ].map((opt) => (
              <Capsule
                key={opt.value}
                selected={data.rent_duration === opt.value}
                onClick={() => update({ rent_duration: opt.value as FormData['rent_duration'] })}
                label={opt.label}
              />
            ))}
          </div>
        </div>
      )}

      {/* Collapsible additional info */}
      <div>
        <button
          type="button"
          onClick={() => setShowExtra(!showExtra)}
          className="flex w-full items-center justify-between rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-alt)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all"
        >
          معلومات إضافية (اختياري)
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showExtra ? 'rotate-180' : ''}`} />
        </button>

        {showExtra && (
          <div className="collapsible-content mt-4 flex flex-col gap-4">
            {/* Rent furnished */}
            {isRent(data.transaction_type) && (
              <div className="fade-in">
                <h4 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">مفروش / غير مفروش</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'furnished', label: 'مفروش' },
                    { value: 'unfurnished', label: 'غير مفروش' },
                    { value: 'semi', label: 'نصف مفروش' },
                    { value: 'agreement', label: 'حسب الاتفاق' },
                  ].map((opt) => (
                    <Capsule
                      key={opt.value}
                      selected={data.furnished === opt.value}
                      onClick={() => update({ furnished: opt.value as FormData['furnished'] })}
                      label={opt.label}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Floor */}
            {showFloor(p) && (
              <div>
                <Select
                  label="الطابق"
                  value={data.floor}
                  onChange={(v) => update({ floor: v })}
                  options={floorOptions}
                />
                {data.floor === 'other' && (
                  <div className="mt-2">
                    <TextInput
                      value={data.floor_other}
                      onChange={(v) => update({ floor_other: v })}
                      placeholder="حدد الطابق"
                      maxLength={30}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Rooms */}
            {showRooms(p) && (
              <Select
                label="عدد الغرف"
                value={data.rooms}
                onChange={(v) => update({ rooms: v })}
                options={roomOptions}
              />
            )}

            {/* Bathrooms */}
            {showRooms(p) && (
              <Select
                label="عدد الحمامات"
                value={data.bathrooms}
                onChange={(v) => update({ bathrooms: v })}
                options={bathroomOptions}
              />
            )}

            {/* Finishing */}
            <div>
              <Select
                label="التشطيب"
                value={data.finishing}
                onChange={(v) => update({ finishing: v })}
                options={finishingOptions}
              />
              {data.finishing === 'other' && (
                <div className="mt-2">
                  <TextInput
                    value={data.finishing_other}
                    onChange={(v) => update({ finishing_other: v })}
                    placeholder="حدد التشطيب"
                    maxLength={50}
                  />
                </div>
              )}
            </div>

            {/* Direction */}
            <Select
              label="الواجهة"
              value={data.direction}
              onChange={(v) => update({ direction: v })}
              options={directionOptions}
            />

            {/* Amenities */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">المرافق الإضافية</h4>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((a) => (
                  <Capsule
                    key={a}
                    selected={data.amenities.includes(a)}
                    onClick={() => toggleAmenity(a)}
                    label={a}
                  />
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <Select
                label="حالة العقار"
                value={data.condition}
                onChange={(v) => update({ condition: v })}
                options={conditionOptions}
              />
              {data.condition === 'other' && (
                <div className="mt-2">
                  <TextInput
                    value={data.condition_other}
                    onChange={(v) => update({ condition_other: v })}
                    placeholder="حدد الحالة"
                    maxLength={50}
                  />
                </div>
              )}
            </div>

            {/* Building age */}
            {showBuildingAge(p) && (
              <Select
                label="عمر البناء"
                value={data.building_age}
                onChange={(v) => update({ building_age: v })}
                options={buildingAgeOptions}
              />
            )}

            {/* Mortgage (offer only) */}
            {isOffer(data.transaction_type) && (
              <div className="fade-in">
                <h4 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">الرهن أو القيد</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'yes', label: 'نعم' },
                    { value: 'no', label: 'لا' },
                    { value: 'unknown', label: 'لا أعرف' },
                  ].map((opt) => (
                    <Capsule
                      key={opt.value}
                      selected={data.mortgage === opt.value}
                      onClick={() => update({ mortgage: opt.value as FormData['mortgage'] })}
                      label={opt.label}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
