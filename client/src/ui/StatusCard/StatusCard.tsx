import type { TaskStatus } from '@/types/task.types';
import { getRUNameByStatus } from '@/utils/transform-name-status';

const StatusCard = ({ status }: { status: TaskStatus }) => {
  const { name, color } = getRUNameByStatus(status) as {
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
      {name}
    </div>
  );
};

export default StatusCard;
