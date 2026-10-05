import type { InputHTMLAttributes } from 'react';

interface IModalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const ModalInput = ({ name, label, ...inputProps }: IModalInputProps) => {
  return (
    <div
      className="flex w-full flex-col justify-start gap-1.5"
      style={{
        width: `${name == 'color' ? '28px' : '100%'}`,
      }}
    >
      {label ? (
        <label
          className="text-xs font-semibold text-[#7A7669] uppercase"
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <input
        className="rounded-lg border border-[#E2E0D8] bg-[#F5F4F0] px-4 py-2.5 [font-family:Arial,_Helvetica,_sans-serif] text-sm [outline:none] focus:[border-color:#4F46E5] focus:[box-shadow:0_0_8px_rgba(79,70,229,0.7)]"
        name={name}
        {...inputProps}
      />
    </div>
  );
};

export default ModalInput;
