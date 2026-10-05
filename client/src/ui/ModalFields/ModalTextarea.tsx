import type { TextareaHTMLAttributes } from 'react';

interface IModalTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const ModalTextarea = ({
  name,
  label,
  ...textareaProps
}: IModalTextareaProps) => {
  return (
    <div className="flex w-full flex-col justify-start gap-1.5">
      <label
        className="text-xs font-semibold text-[#7A7669] uppercase"
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        className="rounded-lg border border-[#E2E0D8] bg-[#F5F4F0] px-4 py-2.5 [font-family:Arial,_Helvetica,_sans-serif] text-sm [outline:none] focus:[border-color:#4F46E5] focus:[box-shadow:0_0_8px_rgba(79,70,229,0.7)]"
        style={{
          height: '85px',
          resize: 'vertical',
          maxHeight: '200px',
          minHeight: '40px',
        }}
        name={name}
        {...textareaProps}
      />
    </div>
  );
};

export default ModalTextarea;
