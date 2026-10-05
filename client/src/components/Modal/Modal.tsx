import { useEffect, useState, type ReactNode } from 'react';

interface IModalProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  size: 'big' | 'small' | 'medium' | 'very-big';
  bodyPadding?: string;
  onCloseModal: () => void;
}

const Modal = ({
  header,
  footer,
  size,
  bodyPadding,
  children,
  onCloseModal,
}: IModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 z-50 grid min-h-screen place-items-center bg-[rgba(26,25,23,0.5)] p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCloseModal();
          setIsOpen(false);
        }
      }}
    >
      <div
        className={`max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-xl bg-[#FFFFFF] shadow-xl sm:w-[calc(100%-3rem)] ${size === 'small' ? 'sm:max-w-md' : size === 'medium' ? 'sm:max-w-lg' : size === 'big' ? 'sm:max-w-2xl' : 'sm:max-w-4xl'}`}
      >
        {header ? (
          <div className="relative flex items-start justify-between gap-4 border-b border-[#E2E0D8] px-5 py-5 text-lg font-bold text-[#4F46E5] sm:px-8 sm:py-7">
            {header}
            <div
              className="mt-1 block cursor-pointer text-3xl leading-none text-[#A1A1A1] transition-transform duration-500 hover:rotate-180 hover:text-[#1A1917]"
              onClick={() => {
                onCloseModal();
                setIsOpen(false);
              }}
            >
              &times;
            </div>
          </div>
        ) : null}
        <div
          className="grid place-items-center px-5 py-5 text-base font-medium text-[#1A1917] sm:px-8 sm:py-6 sm:text-lg"
          style={{ padding: bodyPadding }}
        >
          {children}
        </div>
        {footer ? (
          <div className="border-t border-[#E2E0D8] px-5 py-4 sm:px-7">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
