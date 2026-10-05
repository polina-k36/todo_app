import type { TaskStatus } from '@/types/task.types';

const Checkbox = ({
  status,
  onToggleStatusTask,
}: {
  status: TaskStatus;
  onToggleStatusTask: (checked: boolean) => void;
}) => {
  return (
    <label className="flex cursor-default items-center gap-2">
      <input
        className="peer hidden"
        checked={status === 'DONE'}
        type="checkbox"
        onClick={(e) => {
          onToggleStatusTask(e.currentTarget.checked);
        }}
      />
      <span className="flex h-5 w-5 items-center justify-center rounded-md border border-[#E2E0D8] pb-px text-sm text-[#FFFFFF] peer-checked:border-[#059669] peer-checked:bg-[#059669]">
        ✔
      </span>
    </label>
  );
};

export default Checkbox;
