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
        onChange={(e) => {
          onToggleStatusTask(e.currentTarget.checked);
        }}
      />

      <span className="flex h-5 w-5 pb-1 items-center justify-center rounded-md border border-[#E2E0D8] peer-checked:border-[#059669] peer-checked:bg-[#059669]">
        {status === 'DONE' && <span className="h-2.5 w-1.5 rotate-45 border-b-2 border-r-2 border-white" />}
      </span>
    </label>
    
  );
};

export default Checkbox;
