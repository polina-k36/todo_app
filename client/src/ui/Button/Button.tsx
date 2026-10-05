import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: 'big' | 'small' | 'navigate' | 'modal-btn' | 'max';
  variant:
    'accent' | 'transparent' | 'dashed' | 'danger' | 'transparent-accent';
  color?: string;
}

const Button = ({
  children,
  size,
  variant,
  color,
  ...btnProps
}: IButtonProps) => {
  const sizeClasses = {
    big: 'text-base py-3.5 px-7 rounded-xl',
    small: 'text-sm py-2 px-4',
    navigate: 'p-2',
    'modal-btn': 'text-sm py-2.5 px-4 rounded-xl',
    max: 'py-2.5 text-sm font-semibold rounded-lg w-full',
  };

  const variantClasses = {
    accent:
      'bg-[#4F46E5] text-[#FFFFFF] [box-shadow:0_0_12px_rgba(79,70,229,0.4)] hover:bg-[#655df7] hover:[box-shadow:0_0_15px_rgba(79,70,229,0.7)]',
    transparent:
      'bg-transparent text-[#1A1917] border border-[#E2E0D8] hover:bg-[#FFFFFF]',
    dashed:
      'bg-transparent text-[#7A7669] border-2 border-dashed border-[#E2E0D8] hover:bg-[color-mix(in_srgb,#4F46E5_10%,transparent)] hover:border-[#4F46E5] hover:text-[#4F46E5]',
    danger:
      'bg-transparent text-[#1A1917] border border-[#E2E0D8] hover:border-[#DC2626] hover:text-[#DC2626]',
    'transparent-accent':
      'bg-[color-mix(in_srgb,#4F46E5_10%,transparent)] text-[#4F46E5] hover:bg-[color-mix(in_srgb,#4F46E5_20%,transparent)]',
  };

  return (
    <button
      className={`flex cursor-pointer items-center justify-center rounded-lg border-0 font-semibold transition-all duration-500 ${sizeClasses[size]} ${variantClasses[variant]}`}
      {...btnProps}
      style={color ? { color, borderColor: color } : {}}
    >
      {children}
    </button>
  );
};

export default Button;
