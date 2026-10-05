import type { SelectHTMLAttributes } from 'react';

interface IModalSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: string[];
}

const ModalSelect = ({
  name,
  label,
  options,
  ...selectProps
}: IModalSelectProps) => {
  return (
    <div className="flex w-full flex-col justify-start gap-1.5">
      <label
        className="text-xs font-semibold text-[#7A7669] uppercase"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        className="appearance-auto rounded-lg border border-[#E2E0D8] bg-[#F5F4F0] px-4 py-2.5 [font-family:Arial,_Helvetica,_sans-serif] text-sm [outline:none] focus:[border-color:#4F46E5] focus:[box-shadow:0_0_8px_rgba(79,70,229,0.7)]"
        name={name}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default ModalSelect;
