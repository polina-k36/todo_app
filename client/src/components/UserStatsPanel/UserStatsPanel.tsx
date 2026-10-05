import InfoCard from "@/ui/InfoCard/InfoCard";
import "./user-stats-panel.scss";

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
    <div className="user-stats-panel">
      <p className="form-group__label">статистика</p>
      <div className="user-stats-panel__grid">
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
