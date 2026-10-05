import type { ReactNode } from 'react';

interface ITabButtonProps {
  icon?: ReactNode;
  title: ReactNode;
  id?: string;
  activeId?: string;
  transparent?: true;
  onClickTab: () => void;
}

const TabButton = ({
  icon,
  title,
  activeId,
  id,
  transparent,
  onClickTab,
}: ITabButtonProps) => {
  return (
    <div
      className={`[transition:background-color_0.2s_ease, ________color_0.2s_ease, ________transform_0.2s_ease] flex cursor-pointer items-center justify-start gap-2.5 rounded-xl bg-[#FFFFFF] p-2.5 text-[#1A1917] hover:[transform:translateX(2px)] hover:bg-[rgba(79,_70,_229,_0.07)] hover:text-[#4F46E5] ${activeId === id && id ? 'cursor-default border border-[#4F46E5] bg-[inherit] text-[#4F46E5] hover:[transform:translateX(0px)] hover:bg-[inherit]' : ''}`}
      style={{
        backgroundColor: `${transparent ? 'transparent' : ''}`,
      }}
      onClick={onClickTab}
    >
      <div className="[&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</div>
      <div className="text-sm">{title}</div>
    </div>
  );
};

export default TabButton;
