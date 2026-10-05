import type { TaskPriority } from '@/types/task.types';
import { getRUNameByPriority } from '@/utils/transform-name-priority';

const PriorityCard = ({ priority }: { priority: TaskPriority }) => {
  const { name, color } = getRUNameByPriority(priority) as {
    name: string;
    color: string;
  };
  const colorBackground = `color-mix(in srgb, ${color} 10%, transparent)`;
  return (
    <div
      className="w-fit gap-2.5 rounded-lg px-3 py-1.5 text-sm font-semibold"
      style={{
        background: colorBackground,
        color,
      }}
    >
      &bull; {name}
    </div>
  );
};

export default PriorityCard;
