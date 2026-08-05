import { FormData } from '@/types/form';

export const API_URL = 'https://script.google.com/macros/s/AKfycbxLOOUS4TWrq_drvGb0mG2At9Fm1U4kJ5LMCiRsuNByPkFKEMdMAfukynRLQJOSPR3R/exec';
export const SECRET_TOKEN = 'ShG#2026@SecureHomsToken';
export const EXCHANGE_RATE = 15000;
export const WHATSAPP_NUMBER = '963936666472';
export const WHATSAPP_DISPLAY = '0936666472';
export const EMAIL = 'shihahold@gmail.com';

export const AREAS = ['الوعر', 'الزهراء', 'الخالدية', 'الحمراء', 'باب دريب', 'القصور', 'الإنشاءات', 'كرم الشامي', 'عكرمة', 'غيرها'];

export const isOffer = (t: string) => t === 'offer_sell' || t === 'offer_rent';
export const isRent = (t: string) => t === 'request_rent' || t === 'offer_rent';
export const isBuy = (t: string) => t === 'request_buy' || t === 'offer_sell';

export const isResidential = (p: string) =>
  ['apartment', 'arabic_house', 'villa', 'basement', 'ground_floor'].includes(p);

export const isLand = (p: string) => p === 'land' || p === 'farm';
export const isCommercial = (p: string) =>
  ['shop', 'office', 'warehouse', 'factory'].includes(p);

export const showFloor = (p: string) =>
  ['apartment', 'shop', 'office', 'basement', 'ground_floor'].includes(p);

export const showRooms = (p: string) => isResidential(p);
export const showBuildingAge = (p: string) => !isLand(p);

export const NO_AMENITIES = 'لا توجد مرافق إضافية';

export function getAmenities(p: string): string[] {
  if (isCommercial(p)) {
    return ['موقف سيارات', 'خزان ماء', 'تدفئة', 'مكيفات', 'كهرباء ثلاثية الطور', 'أرضية صناعية', 'طاقة شمسية', NO_AMENITIES];
  }
  if (isLand(p)) {
    return ['كهرباء متوفرة', 'ماء متوفر', 'طريق معبد', 'جدار استنادي', 'بئر ماء', 'طاقة شمسية', NO_AMENITIES];
  }
  return ['مصعد', 'حديقة خاصة', 'موقف سيارات', 'خزان ماء خاص', 'غرفة خادمة', 'تدفئة مركزية', 'مكيفات', 'طاقة شمسية', 'شمسية/تراس', NO_AMENITIES];
}

export function translateTransactionType(v: string) {
  const m: Record<string, string> = {
    request_buy: 'أبحث عن عقار للبيع',
    offer_sell: 'لدي عقار للبيع',
    request_rent: 'أبحث عن عقار للإيجار',
    offer_rent: 'لدي عقار للإيجار',
  };
  return m[v] || v;
}

export function translatePropertyType(v: string) {
  const m: Record<string, string> = {
    apartment: 'شقة', arabic_house: 'بيت عربي', villa: 'فيلا',
    basement: 'قبو', ground_floor: 'طابق أرضي', building: 'بناء / كتلة بناء',
    land: 'أرض', shop: 'محل تجاري', office: 'مكتب / عيادة',
    warehouse: 'مستودع', factory: 'معمل / ورشة', farm: 'مزرعة', other: 'أخرى',
  };
  return m[v] || v;
}

export function translateUrgency(v: string) {
  const m: Record<string, string> = {
    immediate: 'فوري', month: 'خلال شهر', '3months': 'خلال 3 أشهر', not_urgent: 'غير مستعجل',
  };
  return m[v] || v;
}

export function translateCurrency(v: string) {
  return v === 'SYP' ? 'ل.س' : '$';
}

export function getPriceLabel(t: string) {
  if (t === 'request_buy') return 'الميزانية المتوقعة (*)';
  if (t === 'offer_sell') return 'السعر المطلوب (*)';
  if (t === 'request_rent') return 'الميزانية الشهرية (*)';
  if (t === 'offer_rent') return 'الإيجار الشهري المطلوب (*)';
  return 'السعر (*)';
}

export function getAreaLabel(p: string): string {
  if (isLand(p)) return 'المساحة (*)';
  if (p === 'villa' || p === 'arabic_house') return '';
  return 'المساحة الإجمالية (*)';
}

export function getAreaPlaceholder(p: string): string {
  if (isLand(p)) return 'المساحة';
  return 'المساحة الإجمالية';
}

export function getAreaUnit(p: string): string {
  if (isLand(p)) return 'دونم';
  return 'م²';
}

export function formatPrice(n: string | number): string {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  if (!num || isNaN(num)) return '';
  return new Intl.NumberFormat('en-US').format(num);
}

export function convertCurrency(price: string, currency: string): string {
  const num = parseFloat(price);
  if (!num || isNaN(num)) return '';
  if (currency === 'SYP') {
    const usd = (num / EXCHANGE_RATE).toFixed(0);
    return `المعادل: ${formatPrice(usd)} $ (تقريبي)`;
  } else {
    const syp = (num * EXCHANGE_RATE).toFixed(0);
    return `المعادل: ${formatPrice(syp)} ل.س (تقريبي)`;
  }
}

export const AUTO_SAVE_KEY = 'shiha_form_data';
export const RATE_LIMIT_KEY = 'shiha_last_submit';
export const AUTO_SAVE_TTL = 24 * 60 * 60 * 1000;

export function saveFormData(data: FormData, step: number) {
  localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify({ data, step, ts: Date.now() }));
}

export function loadFormData(): { data: FormData; step: number } | null {
  try {
    const raw = localStorage.getItem(AUTO_SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > AUTO_SAVE_TTL) {
      localStorage.removeItem(AUTO_SAVE_KEY);
      return null;
    }
    return { data: parsed.data, step: parsed.step };
  } catch {
    return null;
  }
}

export function clearFormData() {
  localStorage.removeItem(AUTO_SAVE_KEY);
}

export function checkRateLimit(): boolean {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return true;
  return Date.now() - parseInt(last) >= 60000;
}

export function setRateLimit() {
  localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
}

export function buildReviewRows(data: FormData): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const add = (label: string, value: string | undefined) => {
    if (value && value.trim()) rows.push({ label, value });
  };

  add('نوع التصرف', translateTransactionType(data.transaction_type));
  add('نوع العقار', data.property_type === 'other' ? data.property_type_other : translatePropertyType(data.property_type));
  add('المنطقة', data.area);
  add('تفاصيل المنطقة', data.area_detail);

  if (isLand(data.property_type)) {
    add('المساحة', data.land_area_donum ? `${data.land_area_donum} دونم` : '');
  } else if (data.property_type === 'villa' || data.property_type === 'arabic_house') {
    add('مساحة البناء', data.build_area ? `${data.build_area} م²` : '');
    add('مساحة الأرض', data.land_area_donum ? `${data.land_area_donum} دونم` : '');
  } else {
    add('المساحة', data.total_area ? `${data.total_area} م²` : '');
  }

  const priceVal = data.price ? `${formatPrice(data.price)} ${translateCurrency(data.currency)}` : '';
  add('السعر', priceVal);
  add('قابل للتفاوض', data.negotiable ? 'نعم' : 'لا');

  if (isBuy(data.transaction_type)) {
    const instMap: Record<string, string> = { yes: 'نعم', no: 'لا', discuss: 'قابل للنقاش' };
    add('التقسيط', data.installment ? instMap[data.installment] : '');
  }

  add('الاستعجال', translateUrgency(data.urgency));

  if (isRent(data.transaction_type)) {
    const rdMap: Record<string, string> = { monthly: 'شهري', yearly: 'سنوي', agreement: 'حسب الاتفاق' };
    add('مدة الإيجار', data.rent_duration ? rdMap[data.rent_duration] : '');
    if (data.furnished) {
      const fMap: Record<string, string> = { furnished: 'مفروش', unfurnished: 'غير مفروش', semi: 'نصف مفروش', agreement: 'حسب الاتفاق' };
      add('مفروش', fMap[data.furnished] || '');
    }
  }

  if (data.floor) add('الطابق', data.floor === 'other' ? data.floor_other : data.floor);
  if (data.rooms) add('عدد الغرف', data.rooms);
  if (data.bathrooms) add('عدد الحمامات', data.bathrooms);
  if (data.finishing) add('التشطيب', data.finishing === 'other' ? data.finishing_other : data.finishing);
  if (data.direction) add('الواجهة', data.direction);
  if (data.amenities.length > 0) add('المرافق', data.amenities.join(' | '));
  if (data.condition) add('حالة العقار', data.condition === 'other' ? data.condition_other : data.condition);
  if (data.building_age && !isLand(data.property_type)) add('عمر البناء', data.building_age);
  if (isOffer(data.transaction_type) && data.mortgage) {
    const mMap: Record<string, string> = { yes: 'نعم', no: 'لا', unknown: 'لا أعرف' };
    add('الرهن', mMap[data.mortgage] || '');
  }

  add('الاسم', data.full_name);
  add('الهاتف', data.phone);

  if (isOffer(data.transaction_type)) {
    const psMap: Record<string, string> = { owner: 'مالك مباشر', broker: 'وسيط عقاري', agent: 'وكيل عن المالك', other: 'أخرى' };
    add('مصدر العقار', data.property_source === 'other' ? data.property_source_other : (data.property_source ? psMap[data.property_source] : ''));
    add('نوع الملكية', data.ownership_doc === 'other' ? data.ownership_doc_other : data.ownership_doc);
  }

  add('ملاحظات', data.notes);

  return rows;
}
