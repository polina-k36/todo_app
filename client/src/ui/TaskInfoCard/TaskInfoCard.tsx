import type { ReactNode } from 'react';

interface ITaskInfoCardProps {
  title: string;
  children: ReactNode;
}

const TaskInfoCard = ({ title, children }: ITaskInfoCardProps) => {
  return (
    <div className="min-h-20 w-full rounded-xl border border-[#E2E0D8] bg-[#F5F4F0] p-3.5">
      <div className="text-xs text-[#7A7669] uppercase">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default TaskInfoCard;
