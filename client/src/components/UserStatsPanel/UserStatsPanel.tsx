import InfoCard from '@/ui/InfoCard/InfoCard';

interface IStats {
  id: number;
  name: string;
  count: number;
  color: string;
}

interface IUserStatsPanelProps {
  stats: IStats[];
}

const UserStatsPanel = ({ stats }: IUserStatsPanelProps) => {
  return (
    <div className="mt-6 w-full">
      <p className="text-xs font-semibold text-[#7A7669] uppercase">
        статистика
      </p>
      <div className="mt-2.5 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 [&_div]:w-full">
        {stats.map((stat) => (
          <InfoCard
            key={stat.id}
            title={stat.name}
            value={stat.count}
            colorValue={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default UserStatsPanel;
