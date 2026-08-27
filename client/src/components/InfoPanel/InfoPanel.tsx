import InfoCard from "@/ui/InfoCard/InfoCard";
import './info-panel.scss';

interface IInfoPanelProps {
    all: number;
    done: number;
    overdue: number;
}

const InfoPanel = ({all, done, overdue}: IInfoPanelProps) => {    
    return (
        <div className="info-panel">
            <InfoCard title='всего задач' value={all} colorValue='#1A1917'/>
            <InfoCard title='выполнено' value={done} colorValue='#1A1917' 
                      subValue={( typeof Math.round(done/all*100) === 'number' && Math.round(done/all*100) !== Infinity && !isNaN(Math.round(done/all*100))) ? `${Math.round(done/all*100)}%` : ''}/>
            <InfoCard title='просрочено' value={overdue} colorValue='#DC2626'/>            
        </div>
    );
};

export default InfoPanel;