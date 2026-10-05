import ProgressBar from "@/ui/ProgressBar/ProgressBar";
import "./progress-panel.scss";

const ProgressPanel = ({
  all,
  completed,
}: {
  all: number;
  completed: number;
}) => {
  const percent =
    typeof Math.round((completed / all) * 100) === "number" &&
    Math.round((completed / all) * 100) !== Infinity &&
    !isNaN(Math.round((completed / all) * 100))
      ? Math.round((completed / all) * 100)
      : 0;

  return (
    <div className="progress-panel">
      <div className="progress-panel__title">
        <p>Общий прогресс</p>
        <span>{percent}%</span>
      </div>
      <ProgressBar percent={percent} />
      <div className="progress-panel__info">{`${completed} из ${all} задач выполнено`}</div>
    </div>
  );
};

export default ProgressPanel;
