import './progress-bar.scss';

const ProgressBar = ({percent, color}: {percent: number, color?: string}) => {
    return (
        <div className="progress-bar">
            <div className="progress-bar__value" style={{
                width: `${percent}%`, 
                backgroundColor: `${color ?? '#4F46E5'}`
            }}/>
        </div>
    );
};

export default ProgressBar;