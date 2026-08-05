import { FormData } from '@/types/form';
import { buildReviewRows } from '@/utils/formUtils';
import { Edit3 } from 'lucide-react';

interface ReviewStepProps {
  data: FormData;
  onEdit: (step: number) => void;
}

export function ReviewStep({ data, onEdit }: ReviewStepProps) {
  const rows = buildReviewRows(data);

  return (
    <div className="flex flex-col gap-6 slide-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">معاينة الطلب</h3>
      </div>

      <div className="rounded-xl border border-dashed border-[var(--border)] bg-[#FAFAFA] p-5">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-0"
          >
            <span className="text-sm text-[var(--text-secondary)]">{row.label}</span>
            <span className="text-left text-sm font-bold text-[var(--text-primary)]">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onEdit(0)}
          className="flex items-center gap-1 text-xs font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
        >
          <Edit3 className="h-3.5 w-3.5" /> تعديل الخطوة 1
        </button>
        <button
          type="button"
          onClick={() => onEdit(1)}
          className="flex items-center gap-1 text-xs font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
        >
          <Edit3 className="h-3.5 w-3.5" /> تعديل الخطوة 2
        </button>
        <button
          type="button"
          onClick={() => onEdit(2)}
          className="flex items-center gap-1 text-xs font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
        >
          <Edit3 className="h-3.5 w-3.5" /> تعديل الخطوة 3
        </button>
      </div>
    </div>
  );
}
