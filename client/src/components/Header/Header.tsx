import type { ReactNode } from 'react';

interface IHeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <header className="flex min-h-16 w-full items-center justify-between gap-3 border-b border-[#E2E0D8] px-4 py-4 sm:px-6 lg:px-8">
      {children}
    </header>
  );
};

export default Header;
